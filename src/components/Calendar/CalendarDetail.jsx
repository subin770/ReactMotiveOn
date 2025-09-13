// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Header from "../common/Header";
// import BottomSheetModal from "../common/BottomSheetModal";
// import { useCalendarStore } from "../../store/calendarStore";

// const CalendarDetail = () => {
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const event = useCalendarStore((state) =>
//     state.events.find((e) => e.id === Number(id))
//   );

//   if (!event) return <div>일정을 찾을 수 없습니다.</div>;

//   return (
//     <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       <Header title="상세보기" />

//       <div style={{ padding: "16px", flex: 1 }}>
//         <div style={{ padding: "12px", border: "1px solid #eee" }}>
//           <b>{event.title}</b>
//           <div>{event.date}</div>
//           <p>{event.content}</p>
//         </div>
//       </div>

//       <div style={{ padding: "16px" }}>
//         <button
//           style={{ width: "100%", padding: "12px" }}
//           onClick={() => setIsSheetOpen(true)}
//         >
//           옵션 열기
//         </button>
//       </div>

//       <BottomSheetModal
//         isOpen={isSheetOpen}
//         onClose={() => setIsSheetOpen(false)}
//       >
//         <button
//           style={{ width: "100%", padding: "12px" }}
//           onClick={() => navigate(`/calendar/edit/${event.id}`)}
//         >
//           수정
//         </button>
//         <button
//           style={{ width: "100%", padding: "12px", color: "red" }}
//           onClick={() => navigate(`/calendar/delete/${event.id}`)}
//         >
//           삭제
//         </button>
//       </BottomSheetModal>
//     </div>
//   );
// };

// export default CalendarDetail;
