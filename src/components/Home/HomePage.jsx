// src/components/Home/HomePage.jsx
import React, { useState, useEffect } from "react";   // ✅ useEffect 추가
import StatusCard from "../common/StatusCard";
import { Link } from "react-router-dom";
import { 
  getCalendarList, 
  getApprovalHome, 
  getApprovalApproveList 
} from "../motiveOn/api";   // ✅ 일정 + 전자결재 API 불러오기

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("내 차례"); // 기본: 내 차례
  const [todayEvents, setTodayEvents] = useState([]);

  // ===== 전자결재 상태 =====
  const [apprLoading, setApprLoading] = useState(false);
  const [apprItems, setApprItems] = useState([]); // 현재 탭 목록
  const [apprCounts, setApprCounts] = useState({
    urgent: 0,      // 긴급
    mine: 0,        // 내 차례(대기/내 업무)
    rejected: 0,    // 반려
    approved: 0,    // 승인
  });

  // 오늘 날짜 (YYYY.MM.DD)
  const today = new Date();
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}.${m}.${d}`;
  };
  const todayStr = formatDate(today);

  // ✅ 시간 포맷 (밀리초 → YYYY.MM.DD HH:mm)
  const formatDateTime = (val) => {
    if (!val) return "";
    const d = new Date(val);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${y}.${m}.${da} ${h}:${min}`;
  };

  // ✅ catecode 색상 매핑
  const getCategoryColor = (catecode) => {
    switch (catecode) {
      case "C":
        return "#f76258"; // 회사
      case "D":
        return "#71b2e7"; // 부서
      case "P":
        return "#94c296"; // 개인
      default:
        return "#9bc59c"; // 기본
    }
  };

  useEffect(() => {
    getCalendarList()
      .then((res) => {
        const list = res.data.calendarList || [];

        // 오늘 날짜 일정 필터링
        const events = list.filter((event) => {
          const sdate = formatDate(new Date(event.sdate));
          const edate = formatDate(new Date(event.edate));
          return todayStr >= sdate && todayStr <= edate;
        });

        setTodayEvents(events);
      })
      .catch((err) => console.error("홈 일정 불러오기 실패:", err));
  }, []);

  // 요일
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekdayStr = weekdays[today.getDay()];

  /* ================= 전자결재 연동 ================= */

  // 홈 요약(있을 때만 사용)
  useEffect(() => {
    (async () => {
      try {
        const res = await getApprovalHome(); // { urgentCount, returnedCount, holdCount, waitingCount, ... }
        const d = res?.data || {};
        const counts = {
          urgent:   d.urgentCount ?? d.emergencyCount ?? 0,
          mine:     d.mineCount ?? d.todoCount ?? d.waitingCount ?? 0,
          rejected: d.returnedCount ?? d.rejectedCount ?? 0,
          approved: d.approvedCount ?? d.doneCount ?? d.completeCount ?? 0,
        };
        setApprCounts((prev) => ({ ...prev, ...counts }));
      } catch (e) {
        console.warn("전자결재 요약 불러오기 실패(무시):", e?.message || e);
      }
    })();
  }, []);

  // 탭 → approveList 파라미터 매핑
  const TAB_ORDER = ["긴급", "내 차례", "반려", "승인"];
  const TAB_TO_PARAMS = (tab) => {
    if (tab === "긴급")      return { tab: "mine", urgent: 1, page: 1, size: 20 };
    if (tab === "내 차례")   return { tab: "mine", urgent: 0, page: 1, size: 20 };
    if (tab === "반려")     return { tab: "rejected", page: 1, size: 20 };
    if (tab === "승인")     return { tab: "approved", page: 1, size: 20 };
    return { tab: "mine", page: 1, size: 20 };
  };
  const TAB_TO_KEY = (tab) => (
    tab === "긴급" ? "urgent" :
    tab === "내 차례" ? "mine" :
    tab === "반려" ? "rejected" : "approved"
  );

  // 항목 렌더링용 안전 필드
  const getItemTitle = (it) => it?.title ?? it?.docTitle ?? it?.subject ?? "(제목없음)";
  const getItemDate  = (it) => it?.createdAt ?? it?.regdate ?? it?.writeDate ?? it?.updatedAt;
  const getItemId    = (it) => it?.signNo ?? it?.adno ?? it?.id ?? it?.docNo;

  // 탭 변경 시 목록 로드
  useEffect(() => {
    let alive = true;
    (async () => {
      setApprLoading(true);
      try {
        const res = await getApprovalApproveList(TAB_TO_PARAMS(activeTab));
        const list =
          Array.isArray(res?.data?.content) ? res.data.content :
          Array.isArray(res?.data?.list)    ? res.data.list :
          Array.isArray(res?.data)          ? res.data : [];
        if (alive) {
          setApprItems(Array.isArray(list) ? list : []);
          const key = TAB_TO_KEY(activeTab);
          setApprCounts((prev) => ({ ...prev, [key]: list.length || prev[key] || 0 }));
        }
      } catch (e) {
        console.error("전자결재 목록 불러오기 실패:", e);
        if (alive) setApprItems([]);
      } finally {
        if (alive) setApprLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [activeTab]);

  const getTabCount = (tab) => {
    const key = TAB_TO_KEY(tab);
    if (tab === activeTab) return apprItems.length || apprCounts[key] || 0;
    return apprCounts[key] || 0;
  };

  // 결재페이지로 이동할 때 한글 탭 + 내부 키를 함께 넘김
  const approvalLinkProps = { 
    to: "/approval", 
    state: { tab: activeTab, tabKey: TAB_TO_PARAMS(activeTab).tab } 
  };

  /* ================= 렌더 ================= */

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",
        background: "#f5f5f5", // 전체 배경 회색
        fontFamily: "sans-serif",
        fontSize: "14px",
        color: "#344055",
        minHeight: "100vh",
      }}
    >
      {/* 일정 */}
      <section
        style={{
          padding: "16px",
          background: "#fff",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontWeight: "bold",
            padding: "0 12px",
          }}
        >
          <span>일정</span>
          <Link to="/calendarPage" style={{ fontSize: "12px", color: "#bbb" }}>
            바로가기
          </Link>
        </div>

        <div
          style={{
            background: "#f9f9f9",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          <div
            style={{ fontWeight: "600", marginBottom: "8px", fontSize: "13px" }}
          >
            {today.getDate()}일 ({weekdayStr})
          </div>

          {todayEvents.length === 0 ? (
            <p style={{ fontSize: "13px", color: "#888" }}>
              해당 날짜에 일정이 없습니다.
            </p>
          ) : (
            todayEvents.map((event, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                {/* 🔹 catecode 색상바 */}
                <div
                  style={{
                    width: "12px",
                    height: "20px",
                    backgroundColor: getCategoryColor(event.catecode),
                    borderRadius: "3px",
                  }}
                ></div>
                <div>
                  <div style={{ fontWeight: "500", fontSize: "13px" }}>
                    {event.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#8d8c8c" }}>
                    {formatDateTime(event.sdate)} ~ {formatDateTime(event.edate)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 업무 */}
      <section
        style={{
          padding: "16px",
          background: "#fff",
          marginBottom: "8px",
        }}
      >
        {/* 상단 타이틀 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontWeight: "bold",
            color: "#344055",
            padding: "0 8px",
          }}
        >
          <span>업무</span>
          <Link to="/work" style={{ fontSize: "12px", color: "#bbb" }}>
            바로가기
          </Link>
        </div>

        {/* 금주 마감 업무 + 카드 */}
        <div
          style={{
            background: "#f7f7f7",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          {/* 제목 줄 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#344055",
            }}
          >
            <span>금주 마감 업무</span>
          </div>

          {/* 카드 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            <StatusCard label="대기" count={0} color="#d4f0d2" />
            <StatusCard label="진행" count={0} color="#f9d6c7" />
            <StatusCard label="협업요청" count={0} color="#f7d8f0" />
            <StatusCard label="대리요청" count={0} color="#d9d9d9" />
            <StatusCard label="완료" count={0} color="#fff7b1" />
            <StatusCard label="전체" count={0} color="#e7ebf0" />
          </div>
        </div>
      </section>

      {/* 전자결재 (⚙ 기안문서함 API 연동: 긴급/내 차례/반려/승인) */}
      <section
        style={{
          padding: "16px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          minHeight: "400px",
        }}
      >
        {/* 상단 타이틀 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontWeight: "bold",
            color: "#344055",
            padding: "0 12px",
          }}
        >
          <span>전자결재</span>
          {/* ✅ 현재 탭 상태를 그대로 결재페이지에 전달 (한글 탭 + 내부 tabKey) */}
          <Link
            to="/approval"
            state={{ tab: activeTab, tabKey: TAB_TO_PARAMS(activeTab).tab }}
            style={{ fontSize: "12px", color: "#bbb" }}
          >
            바로가기
          </Link>
        </div>

        {/* 탭 + 리스트 */}
        <div
          style={{
            background: "#f9f9f9",
            borderRadius: "6px",
            minHeight: "280px",
          }}
        >
          {/* 탭 */}
          <div
            style={{
              display: "flex",
              borderBottom: "0.9px solid #ddd",
            }}
          >
            {TAB_ORDER.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px 0",
                  fontSize: "13px",
                  cursor: "pointer",
                  color: activeTab === tab ? "#2c557d" : "#555",
                  fontWeight: activeTab === tab ? "600" : "400",
                  borderBottom:
                    activeTab === tab
                      ? "3px solid #2c557d"
                      : "3px solid transparent",
                }}
              >
                {tab} ({getTabCount(tab)})
              </div>
            ))}
          </div>

          {/* 리스트 */}
          <div
            style={{
              height: "220px",
              overflowY: "auto",
              padding: "12px",
              background: "#f9f9f9",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
            {apprLoading ? (
              <div style={{ fontSize: "13px", color: "#777", padding: "6px 2px" }}>
                불러오는 중…
              </div>
            ) : apprItems.length === 0 ? (
              <div style={{ fontSize: "13px", color: "#777", padding: "6px 2px" }}>
                문서가 없습니다.
              </div>
            ) : (
              apprItems.map((item, idx) => {
                const id = getItemId(item);
                return (
                  <li
                    key={id ?? `${activeTab}-${idx}`}
                    style={{
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: "1.9",
                      listStyleType: "disc",
                      paddingLeft: "15px",
                      margin: "6px 0",
                    }}
                  >
                    {/* ✅ 제목 클릭 → 상세 페이지 이동 */}
                    <div style={{ fontWeight: 500 }}>
                      {id ? (
                        <Link
                          to={`/approval/detail/${encodeURIComponent(id)}`}
                          state={{ from: "home", tab: activeTab }}
                          style={{ color: "#2c557d", textDecoration: "none" }}
                          title="상세 페이지로 이동"
                        >
                          {getItemTitle(item)}
                        </Link>
                      ) : (
                        <span title="ID 없음으로 이동 불가">{getItemTitle(item)}</span>
                      )}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {formatDateTime(getItemDate(item))}
                      {item?.writerName ? ` · ${item.writerName}` : ""}
                    </div>
                  </li>
                );
              })
            )}
          </div>

          {/* 더보기 */}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 12px" }}>
            <Link 
              to="/Approval" 
              state={{ tab: activeTab, tabKey: TAB_TO_PARAMS(activeTab).tab }} 
              style={{ fontSize: "12px", color: "#2c557d", textDecoration: "none" }}
            >
              더보기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;