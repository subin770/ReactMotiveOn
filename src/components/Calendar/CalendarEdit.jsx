// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Header from "../common/Header";
// import InputField from "../common/InputField";
// import DatePicker from "../common/DatePicker";
// import SelectBox from "../common/SelectBox";
// import Button from "../common/Button";
// import { useCalendarStore } from "../../store/calendarStore";

// const CalendarEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const event = useCalendarStore((state) =>
//     state.events.find((e) => e.id === Number(id))
//   );
//   const updateEvent = useCalendarStore((state) => state.updateEvent);

//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [content, setContent] = useState("");

//   // 기존 값 불러오기
//   useEffect(() => {
//     if (event) {
//       setTitle(event.title);
//       const [d, t] = event.date.split(" ");
//       setDate(d);
//       setTime(t || "");
//       setContent(event.content || "");
//     }
//   }, [event]);

//   const handleUpdate = () => {
//     if (!title) {
//       alert("제목을 입력하세요");
//       return;
//     }
//     updateEvent(Number(id), {
//       title,
//       date: `${date} ${time}`,
//       content,
//     });
//     navigate(`/calendar/${id}`); // 수정 후 상세로 이동
//   };

//   if (!event) return <div>일정을 찾을 수 없습니다.</div>;

//   return (
//     <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       <Header title="일정 수정" />

//       <div style={{ padding: "16px", flex: 1 }}>
//         <InputField
//           label="제목"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <div style={{ margin: "12px 0" }}>
//           <label>일시</label>
//           <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
//             <DatePicker value={date} onChange={(val) => setDate(val)} />
//             <DatePicker
//               type="time"
//               value={time}
//               onChange={(val) => setTime(val)}
//             />
//           </div>
//         </div>

//         <SelectBox label="분류" options={["업무", "개인", "기타"]} />

//         <InputField
//           label="내용"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           multiline
//           style={{ marginTop: "12px" }}
//         />
//       </div>

//       <div style={{ padding: "16px", display: "flex", gap: "8px" }}>
//         <Button label="취소" variant="secondary" onClick={() => navigate(-1)} />
//         <Button label="수정" onClick={handleUpdate} />
//       </div>
//     </div>
//   );
// };

// export default CalendarEdit;
