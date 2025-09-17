// src/components/calendar/CalendarEventList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "../calendar/icons";

const CalendarEventList = ({ events, selectedDate }) => {
  const navigate = useNavigate();

  // 날짜 포맷 (ex: 14일 (일))
  const formatDate = (date) => {
    const day = date.getDate();
    const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${day}일 (${weekday})`;
  };

  // 선택된 날짜가 이벤트 기간 안에 포함되는지 확인
  function isSameDay(selectedDate, start, end) {
    if (!start || !end) return false;
    const sel = new Date(selectedDate).setHours(0, 0, 0, 0);
    const s = new Date(start).setHours(0, 0, 0, 0);
    const e = new Date(end).setHours(0, 0, 0, 0);
    return sel >= s && sel <= e;
  }

  // 필터링된 이벤트 (선택된 날짜에 해당하는 것만)
  const filteredEvents = events.filter(
    (event) => isSameDay(selectedDate, event.sdate, event.edate)
  );

  return (
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        padding: "12px",
        position: "relative", // 버튼을 리스트 내부에 고정
      }}
    >
      {/* 상단 현재 날짜 */}
      <div
        style={{
          fontWeight: "550",
          fontSize: "14px",
          marginBottom: "12px",
          marginLeft: "-12px",
          paddingLeft: "23px", // 달력 헤더와 정렬 맞춤
        }}
      >
        {formatDate(selectedDate)}
      </div>

      {/* 구분선 */}
      <div
        style={{
          borderBottom: "0.5px solid #eee",
          margin: "0 -12px 8px -12px",
          width: "calc(100% + 24px)",
        }}
      />

      {/* 일정이 없을 때 */}
      {filteredEvents.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#888",
            marginTop: "85px",
            fontSize: "14px",
          }}
        >
          해당 날짜에 일정이 없습니다.
        </p>
      ) : (
        // 일정이 있을 때
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filteredEvents.map((event, idx) => (
            <li
              key={idx}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                padding: "8px 0", 
                borderBottom: "1px solid #eee", 
                cursor: "pointer" }}
              onClick={() => navigate("/calendar/detail", { state: { event } })}  // 상세 페이지로 이동
            >

              {/* 아이콘(색 박스) */}
              <div
                style={{
                  width: "4px",
                  height: "19px",
                  borderRadius: "2px",
                  backgroundColor: event.color || "#4caf50",
                  marginRight: "12px",
                }}
              />

              {/* 일정 내용 */}
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  {event.title}
                </div>
                <div style={{ fontSize: "12px", color: "#7a7a7a" }}>
                  {event.sdate} ~ {event.edate}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 우측 하단 플로팅 버튼 */}
      <button
        onClick={() => navigate("/calendar/CalendarRegist")}
        style={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#52586B",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconPlus />
      </button>
    </div>
  );
};

export default CalendarEventList;
