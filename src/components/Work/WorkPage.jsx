import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusCard from "../common/StatusCard.jsx";
import { getMyWorkList, getRequestedWork } from "../motiveOn/api";
import StatusBadge from "../common/StatusBadge";

export default function WorkPage() {
  const navigate = useNavigate();

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
    start.setDate(today.getDate() - today.getDay()); // 주 시작(일요일)
    start.setHours(0, 0, 0, 0);

    const end = new Date(today);
    end.setDate(today.getDate() + (6 - today.getDay())); // 주 끝(토요일)
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  // 날짜 비교 함수
  const isWithinThisWeek = (dateStr) => {
    if (!dateStr) return false;
    const { start, end } = getWeekRange();
    const date = new Date(dateStr);
    return date >= start && date <= end;
  };

  // 날짜 포맷 함수
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return ""; // 잘못된 값이면 공백 리턴
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    Promise.all([getMyWorkList(), getRequestedWork()])
      .then(([myRes, reqRes]) => {
        const myList = myRes.data.list || [];
        const reqList = reqRes.data.list || [];

        // 상태 통계
        setMyWorkStats(makeStatusCounts(myList));
        setRequestedWorkStats(makeStatusCounts(reqList));

        // 금주 마감 업무 (내 업무만 필터링)
        const deadlineList = myList.filter(w => isWithinThisWeek(w.wend));
        setWeeklyDeadline(deadlineList);
      })
      .catch(err => console.error("업무 데이터 불러오기 실패:", err));
  }, []);

  const statusMap = {
    WAIT: "대기",
    ING: "진행중",
    DONE: "완료",
  };

  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* 내 업무 */}
      <Section title="내 업무" showMore onMoreClick={() => navigate("/work/myworklist")}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {myWorkStats.map((s, i) => <StatusCard key={i} {...s} />)}
        </div>
      </Section>

      {/* 요청한 업무 */}
      <Section title="요청한 업무" showMore onMoreClick={() => navigate("/work/reqlist")}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {requestedWorkStats.map((s, i) => <StatusCard key={i} {...s} />)}
        </div>
      </Section>

      {/* 금주 마감 업무 */}
      <Section title="금주 마감 업무 (내 업무)" fullHeight>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
          {weeklyDeadline.length === 0 ? (
            <p style={{ fontSize: "13px", color: "#888" }}>마감 예정 업무가 없습니다.</p>
          ) : (
            weeklyDeadline.map((work, idx) => (
              <div
                key={work.wcode || idx}
                onClick={() => navigate(`/work/detail/${work.wcode}`, { state: { from: "home" } })} // 상세보기로 이동
                style={{
                  background: "#fff",
                  position: "relative",
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  cursor: "pointer", // 클릭 가능 표시
                }}
              >
                <div>
                  {/* 상태 배지 우측 상단 */}
                  <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                    <StatusBadge label={statusMap[work.wstatus] || "대기"} />
                  </div>

                  <div style={{ fontWeight: "bold", marginBottom: "6px" }}>{work.wtitle}</div>
                  <div style={{ fontSize: "13px", color: "#555" }}>
                    {work.deptName} {work.managerName}
                  </div>
                  {/* 시작일 ~ 종료일 출력 */}
                  <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>
                    {formatDate(work.wdate)} ~ {formatDate(work.wend)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}

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
    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginBottom: "12px" }}>
      <span>{title}</span>
      {showMore && (
        <span style={{ color: "#777", fontSize: "12px", cursor: "pointer" }} onClick={onMoreClick}>
          더보기
        </span>
      )}
    </div>
    {children}
  </div>
);