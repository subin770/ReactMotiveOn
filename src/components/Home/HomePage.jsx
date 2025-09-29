// src/components/Home/HomePage.jsx
import React, { useState, useEffect } from "react";   
import { Link, useNavigate } from "react-router-dom";
import StatusCard from "../common/StatusCard";
import { 
  getCalendarList, 
  getApprovalHome, 
  getApprovalApproveList,
  getMyWorkList, 
  getRequestedWork
} from "../motiveOn/api";   // ✅ 일정 + 전자결재 + 업무 API 불러오기
import StatusBadge from "../common/StatusBadge";

const HomePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("내 차례"); 
  const [todayEvents, setTodayEvents] = useState([]);

  /* ================= 업무 관련 상태 ================= */
  const [myWorkStats, setMyWorkStats] = useState([]);
  const [requestedWorkStats, setRequestedWorkStats] = useState([]);
  const [weeklyDeadline, setWeeklyDeadline] = useState([]);

  // 상태별 카운트 집계
  const makeStatusCounts = (list) => {
    const map = { WAIT: 0, PROGRESS: 0, COLLAB: 0, DELEGATE: 0, DONE: 0 };
    list.forEach(item => {
      if (map[item.wstatus] !== undefined) {
        map[item.wstatus]++;
      }
    });
    return [
      { label: "대기", count: map.WAIT, color: "#d8f5d0" },
      { label: "진행", count: map.PROGRESS, color: "#c5ddf1" },
      { label: "협업요청", count: map.COLLAB, color: "#f3dccb" },
      { label: "대리요청", count: map.DELEGATE, color: "#e2e2e2" },
      { label: "완료", count: map.DONE, color: "#fff9c4" },
      { label: "전체", count: list.length, color: "#ecceef" },
    ];
  };

  // 이번 주 범위 구하기
  const getWeekRange = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setDate(today.getDate() + (6 - today.getDay()));
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  // 금주 여부 판별
  const isWithinThisWeek = (dateStr) => {
    if (!dateStr) return false;
    const { start, end } = getWeekRange();
    const date = new Date(dateStr);
    return date >= start && date <= end;
  };

  /* ================= 전자결재 상태 ================= */
  const [apprLoading, setApprLoading] = useState(false);
  const [apprItems, setApprItems] = useState([]); 
  const [apprCounts, setApprCounts] = useState({
    urgent: 0, mine: 0, rejected: 0, approved: 0,
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

  // catecode 색상
  const getCategoryColor = (catecode) => {
    switch (catecode) {
      case "C": return "#f76258"; 
      case "D": return "#71b2e7"; 
      case "P": return "#94c296"; 
      default: return "#9bc59c"; 
    }
  };

  /* ================= useEffect ================= */
  // 일정
  useEffect(() => {
    getCalendarList()
      .then((res) => {
        const list = res.data.calendarList || [];
        const events = list.filter((event) => {
          const sdate = formatDate(new Date(event.sdate));
          const edate = formatDate(new Date(event.edate));
          return todayStr >= sdate && todayStr <= edate;
        });
        setTodayEvents(events);
      })
      .catch((err) => console.error("홈 일정 불러오기 실패:", err));
  }, []);

  // 전자결재 요약
  useEffect(() => {
    (async () => {
      try {
        const res = await getApprovalHome();
        const d = res?.data || {};
        const counts = {
          urgent:   d.urgentCount ?? d.emergencyCount ?? 0,
          mine:     d.mineCount ?? d.todoCount ?? d.waitingCount ?? 0,
          rejected: d.returnedCount ?? d.rejectedCount ?? 0,
          approved: d.approvedCount ?? d.doneCount ?? d.completeCount ?? 0,
        };
        setApprCounts((prev) => ({ ...prev, ...counts }));
      } catch (e) {
        console.warn("전자결재 요약 불러오기 실패:", e?.message || e);
      }
    })();
  }, []);

  // 전자결재 탭
  const TAB_ORDER = ["긴급", "내 차례", "반려", "승인"];
  const TAB_TO_PARAMS = (tab) => {
    if (tab === "긴급") return { tab: "mine", urgent: 1, page: 1, size: 20 };
    if (tab === "내 차례") return { tab: "mine", urgent: 0, page: 1, size: 20 };
    if (tab === "반려") return { tab: "rejected", page: 1, size: 20 };
    if (tab === "승인") return { tab: "approved", page: 1, size: 20 };
    return { tab: "mine", page: 1, size: 20 };
  };
  const TAB_TO_KEY = (tab) => (
    tab === "긴급" ? "urgent" :
    tab === "내 차례" ? "mine" :
    tab === "반려" ? "rejected" : "approved"
  );

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

  // ✅ 내업무 불러오기
  useEffect(() => {
    Promise.all([getMyWorkList(), getRequestedWork()])
      .then(([myRes, reqRes]) => {
        const myList = myRes.data.list || [];
        const reqList = reqRes.data.list || [];

        setMyWorkStats(makeStatusCounts(myList));
        setRequestedWorkStats(makeStatusCounts(reqList));

        const deadlineList = myList.filter(w => isWithinThisWeek(w.wend));
        setWeeklyDeadline(deadlineList);
      })
      .catch(err => console.error("업무 데이터 불러오기 실패:", err));
  }, []);

  // 요일
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekdayStr = weekdays[today.getDay()];

  const getTabCount = (tab) => {
    const key = TAB_TO_KEY(tab);
    if (tab === activeTab) return apprItems.length || apprCounts[key] || 0;
    return apprCounts[key] || 0;
  };

  /* ================= 렌더 ================= */
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",
        background: "#f5f5f5",
        fontFamily: "sans-serif",
        fontSize: "14px",
        color: "#344055",
        minHeight: "100vh",
      }}
    >
      {/* 일정 */}
      <section style={{ padding: "16px", background: "#fff", marginBottom: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "bold", padding: "0 12px" }}>
          <span>일정</span>
          <Link to="/calendarPage" style={{ fontSize: "12px", color: "#bbb" }}>바로가기</Link>
        </div>
        <div style={{ background: "#f9f9f9", borderRadius: "6px", padding: "16px" }}>
          <div style={{ fontWeight: "600", marginBottom: "8px", fontSize: "13px" }}>
            {today.getDate()}일 ({weekdayStr})
          </div>
          {todayEvents.length === 0 ? (
            <p style={{ fontSize: "13px", color: "#888" }}>해당 날짜에 일정이 없습니다.</p>
          ) : (
            todayEvents.map((event, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{ width: "12px", height: "20px", backgroundColor: getCategoryColor(event.catecode), borderRadius: "3px" }}></div>
                <div>
                  <div style={{ fontWeight: "500", fontSize: "13px" }}>{event.title}</div>
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
      <section style={{ height:"250px", padding: "16px", background: "#fff", marginBottom: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: "bold", color: "#344055", padding: "0 8px" }}>
          <span>금주 마감 업무</span>
          <Link to="/work" style={{ fontSize: "12px", color: "#bbb" }}>바로가기</Link>
        </div>

        {/* 금주 마감 업무 */}
        <Section showMore onMoreClick={() => navigate("/work/myworklist")}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {myWorkStats.map((s, i) => <StatusCard key={i} {...s} />)}
          </div>
        </Section>
      </section>

      {/* 전자결재 */}
      <section style={{ padding: "16px", background: "#fff", display: "flex", flexDirection: "column", minHeight: "400px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: "bold", color: "#344055", padding: "0 12px" }}>
          <span>전자결재</span>
          <Link to="/approval" state={{ tab: activeTab, tabKey: TAB_TO_PARAMS(activeTab).tab }} style={{ fontSize: "12px", color: "#bbb" }}>
            바로가기
          </Link>
        </div>

        {/* 탭 */}
        <div style={{ background: "#f9f9f9", borderRadius: "6px", minHeight: "280px" }}>
          <div style={{ display: "flex", borderBottom: "0.9px solid #ddd" }}>
            {TAB_ORDER.map((tab) => (
              <div key={tab} onClick={() => setActiveTab(tab)} 
                style={{
                  flex: 1, textAlign: "center", padding: "10px 0",
                  fontSize: "13px", cursor: "pointer",
                  color: activeTab === tab ? "#2c557d" : "#555",
                  fontWeight: activeTab === tab ? "600" : "400",
                  borderBottom: activeTab === tab ? "3px solid #2c557d" : "3px solid transparent",
                }}>
                {tab} ({getTabCount(tab)})
              </div>
            ))}
          </div>

          {/* 리스트 */}
          <div style={{ height: "220px", overflowY: "auto", padding: "12px", background: "#f9f9f9", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
            {apprLoading ? (
              <div style={{ fontSize: "13px", color: "#777", padding: "6px 2px" }}>불러오는 중…</div>
            ) : apprItems.length === 0 ? (
              <div style={{ fontSize: "13px", color: "#777", padding: "6px 2px" }}>문서가 없습니다.</div>
            ) : (
              apprItems.map((item, idx) => {
                const id = item?.signNo ?? item?.adno ?? item?.id ?? item?.docNo;
                const title = item?.title ?? item?.docTitle ?? item?.subject ?? "(제목없음)";
                const date = item?.createdAt ?? item?.regdate ?? item?.writeDate ?? item?.updatedAt;
                return (
                  <li key={id ?? `${activeTab}-${idx}`} style={{ fontSize: "14px", color: "#444", lineHeight: "1.9", listStyleType: "disc", paddingLeft: "15px", margin: "6px 0" }}>
                    <div style={{ fontWeight: 500 }}>
                      {id ? (
                        <Link to={`/approval/detail/${encodeURIComponent(id)}`} state={{ from: "home", tab: activeTab }} style={{ color: "#2c557d", textDecoration: "none" }}>
                          {title}
                        </Link>
                      ) : (
                        <span>{title}</span>
                      )}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>{formatDateTime(date)}{item?.writerName ? ` · ${item.writerName}` : ""}</div>
                  </li>
                );
              })
            )}
          </div>

          {/* 더보기
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 12px" }}>
            <Link to="/Approval" state={{ tab: activeTab, tabKey: TAB_TO_PARAMS(activeTab).tab }} style={{ fontSize: "12px", color: "#2c557d", textDecoration: "none" }}>
              더보기
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

/* ================= Section 공통 컴포넌트 ================= */
const Section = ({ title, children, showMore, fullHeight, onMoreClick }) => (
  <div style={{
    background: "#fff",
    borderRadius: "7px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    height: fullHeight ? "300px" : "auto",
    backgroundColor: "#f5f5f5",
  }}>
   
    {children}
  </div>
);
