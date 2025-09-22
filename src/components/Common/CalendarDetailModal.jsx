// src/components/common/CalendarDetailModal.jsx
import React from "react";

const CalendarDetailModal = ({ isOpen, event, onModify, onDelete, onClose }) => {
  if (!isOpen) return null;

  // ✅ 날짜 포맷 함수 추가
const formatDateTime = (val) => {
  if (!val) return "";

  // 문자열이면 수동으로 파싱
  if (typeof val === "string") {
    // "2025-09-22 01:00:00" → [2025,09,22,01,00,00]
    const parts = val.split(/[- :]/); 
    if (parts.length >= 5) {
      const [y, m, d, hh, mm, ss] = parts;
      const dateObj = new Date(
        Number(y),
        Number(m) - 1,
        Number(d),
        Number(hh),
        Number(mm),
        Number(ss || 0)
      );
      return `${y}.${m.padStart(2, "0")}.${d.padStart(2, "0")} ${hh.padStart(
        2,
        "0"
      )}:${mm.padStart(2, "0")}`;
    }
  }

  // 숫자(timestamp)면 그대로 Date로 처리
  const d = new Date(val);
  if (isNaN(d.getTime())) return val;

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}.${m}.${da} ${h}:${min}`;
};


  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "400px",
          maxWidth: "90%",
          padding: "20px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#181818" }}>
          일정 상세
        </h3>
        <hr style={{ margin: "12px 0", border: "0.5px solid #ebebeb" }} />

        {/* 상세내용 */}
        <div style={{ fontSize: "14.7px", color: "#333", lineHeight: "2.0" }}>
          <div style={{ marginBottom: "8px" }}>
            <strong style={{ display: "inline-block", width: "50px" }}>
              제목 :
            </strong>
            <span>{event?.title || ""}</span>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong style={{ display: "inline-block", width: "50px" }}>
              분류 :
            </strong>
            <span>{event?.category || ""}</span>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong style={{ display: "inline-block", width: "50px" }}>
              일시 :
            </strong>
            <span>
              {event?.sdate && event?.edate
                ? `${formatDateTime(event.sdate)} ~ ${formatDateTime(
                    event.edate
                  )}`
                : event?.date || ""}
            </span>
          </div>
          <div>
            <strong style={{ display: "inline-block", width: "50px" }}>
              내용 :
            </strong>
            <span>{event?.content || ""}</span>
          </div>
        </div>

        <hr style={{ margin: "16px 0", border: "0.5px solid #ebebeb" }} />

        {/* 버튼 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "7px",
          }}
        >
          <button
            onClick={onModify}
            style={{
              background: "#545761",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            수정
          </button>
          <button
            onClick={onDelete}
            style={{
              background: "#D9534F",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarDetailModal;
