// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import ConfirmModal from "../common/ConfirmModal";
// import { useCalendarStore } from "../../store/calendarStore";

// const CalendarDelete = () => {
//   const { id } = useParams();
//   const deleteEvent = useCalendarStore((state) => state.deleteEvent);
//   const navigate = useNavigate();

//   const handleDelete = () => {
//     deleteEvent(Number(id));
//     navigate("/calendar");
//   };

//   return (
//     <ConfirmModal
//       isOpen={true}
//       onClose={() => navigate(-1)}
//       title="일정을 삭제하시겠습니까?"
//       confirmText="확인"
//       cancelText="취소"
//       onConfirm={handleDelete}
//     />
//   );
// };

// export default CalendarDelete;


// src/components/calendar/CalendarDelete.jsx
import React from "react";
import BottomSheetModal from "../common/BottomSheetModal";
import { useNavigate } from "react-router-dom";

const CalendarDelete = ({ eventId = 1, onDelete }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (onDelete) onDelete(eventId); // 상위에서 전달된 삭제 로직 실행
    alert(`${eventId}번 일정이 삭제되었습니다.`);
    navigate("/calendarPage"); // 삭제 후 메인으로 이동
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <BottomSheetModal
      isOpen={true} // 항상 열려있도록 (테스트용)
      title="일정 삭제"
      message="정말 삭제하시겠습니까?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

export default CalendarDelete;

