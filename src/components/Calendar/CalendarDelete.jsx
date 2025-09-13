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
