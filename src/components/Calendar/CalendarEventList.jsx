// src/components/calendar/CalendarEventList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "../calendar/icons";
import ConfirmModal from "../common/ConfirmModal";
import { deleteCalendar } from "../motiveOn/api"; // ✅ 삭제 API import

const CalendarEventList = ({ events, selectedDate }) => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

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

  // 필터링된 이벤트
  const filteredEvents = events.filter(
    (event) => isSameDay(selectedDate, event.sdate, event.edate)
  );

  // ✅ 삭제 확정 핸들러 (API 연동)
  const handleDeleteConfirm = async () => {
  try {
    const res = await deleteCalendar(selectedEvent.ccode);
    if (res.status === 200 && res.data === "success") {
      alert("삭제되었습니다.");
      setDeleteConfirmOpen(false);
      setSelectedEvent(null);
    } else {
      alert("삭제 실패");
    }
  } catch (err) {
    console.error("삭제 오류:", err);
    alert("서버 오류 발생");
  }
};


  return (
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        padding: "12px",
        position: "relative",
      }}
    >
      {/* 상단 현재 날짜 */}
      <div
        style={{
          fontWeight: "550",
          fontSize: "14px",
          marginBottom: "12px",
          marginLeft: "-12px",
          paddingLeft: "23px",
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
                cursor: "pointer",
              }}
              onClick={() => setSelectedEvent(event)} // ✅ 상세 모달 열기
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

      {/* ✅ 상세 모달 */}
      <ConfirmModal isOpen={!!selectedEvent} onCancel={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <div style={{ textAlign: "left" }}>
            <h3 style={{ marginBottom: "16px", fontSize: "16px" }}>일정 상세</h3>
            <hr style={{ marginBottom: "16px" }} />

            <div style={{ fontSize: "14px", marginBottom: "10px" }}>
              <strong>제목 :</strong> {selectedEvent.title}
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px" }}>
              <strong>분류 :</strong>{" "}
              {selectedEvent.catecode === "C"
                ? "회사 일정"
                : selectedEvent.catecode === "D"
                ? "부서 일정"
                : selectedEvent.catecode === "P"
                ? "개인 일정"
                : "미지정"}
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px" }}>
              <strong>일시 :</strong> {selectedEvent.sdate} ~ {selectedEvent.edate}
            </div>
            <div style={{ fontSize: "14px", marginBottom: "10px" }}>
              <strong>내용 :</strong> {selectedEvent.content || "내용 없음"}
            </div>

            {/* 버튼 */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  navigate("/calendar/CalendarEdit", {
                    state: { event: selectedEvent },
                  });
                }}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#52586B",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                수정
              </button>
              <button
                onClick={() => setDeleteConfirmOpen(true)} // ✅ 삭제 확인 모달 열기
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#ef5350",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </ConfirmModal>

      {/* ✅ 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        title="일정 삭제"
        message="정말 삭제하시겠습니까?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};

export default CalendarEventList;