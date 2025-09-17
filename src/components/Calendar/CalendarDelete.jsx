// src/components/calendar/CalendarDelete.jsx
import React from "react";
import ConfirmModal from "../common/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { deleteCalendar } from "../motiveOn/api"; // ✅ 삭제 API (예시)

const CalendarDelete = ({ isOpen, onClose, event }) => {
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    try {
      // ✅ 실제 API 연동
      const res = await deleteCalendar(event.ccode);

      if (res.status === 200 && res.data === "success") {
        alert("삭제되었습니다.");
        onClose(); // 모달 닫기
        navigate("/calendarPage"); // 일정 목록 페이지로 이동
      } else {
        alert("삭제 실패");
      }
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("서버 오류 발생");
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      title="일정 삭제"
      message="정말 이 일정을 삭제하시겠습니까?"
      onConfirm={handleConfirmDelete}
      onCancel={onClose}
    />
  );
};

export default CalendarDelete;
