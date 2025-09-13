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

  return (
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        padding: "12px",
        position: "relative", // 버튼을 리스트 내부에 고정하기 위한 relative
      }}
    >
      {/* 상단 현재 날짜 */}
      <div
        style={{
          fontWeight: "600",
          fontSize: "14px",
          marginBottom: "12px",
        }}
      >
        {formatDate(selectedDate)}
      </div>

      {/* 구분선 */}
      <div
        style={{
          borderBottom: "0.5px solid #eee",
          marginBottom: "8px",
        }}
      />

      {/* 일정이 없을 때 */}
      {events.length === 0 ? (
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
          {events.map((event, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* 아이콘(색 박스) */}
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "2px",
                  backgroundColor: event.color || "#4caf50",
                  marginRight: "8px",
                }}
              />

              {/* 일정 내용 */}
              <div>
                <div style={{ fontSize: "14px", fontWeight: "500" }}>
                  {event.title}
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {event.date}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

       {/* 우측 하단 플로팅 버튼 */}
         <button
      onClick={() => navigate("/calendar/CalendarRegist")}   // ← 이동
      style={{
        position: "fixed",
        bottom: "20px",
        right: "15px",
        width: "40px",
        height: "40px",
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
