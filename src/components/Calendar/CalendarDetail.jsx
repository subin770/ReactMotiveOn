// src/components/calendar/CalendarDetail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CalendarDetailModal from "../common/CalendarDetailModal"; // ✅ 새 이름으로 변경

const CalendarDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  if (!event) return null;

  const getCategoryLabel = (catecode) => {
    switch (catecode) {
      case "C":
        return "회사 일정";
      case "D":
        return "부서 일정";
      case "P":
        return "개인 일정";
      default:
        return "기타";
    }
  };

  // //  YYYY.MM.DD HH:mm 형식으로 변환하는 함수
  // const formatDateTime = (datetime) => {
  //   if (!datetime) return "";
  //   const d = new Date(datetime);
  //   const yyyy = d.getFullYear();
  //   const mm = String(d.getMonth() + 1).padStart(2, "0");
  //   const dd = String(d.getDate()).padStart(2, "0");
  //   const hh = String(d.getHours()).padStart(2, "0");
  //   const mi = String(d.getMinutes()).padStart(2, "0");
  //   return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
  // };


  // ✅ 시간 포맷 (밀리초 → YYYY.MM.DD HH:mm)
const formatDateTime = (val) => {
  console.log("formatDateTime");s
  if (!val) return "";

  // "2025-09-22 17:00:00" → "2025-09-22T17:00:00"
  const safeVal =
    typeof val === "string" && val.includes(" ")
      ? val.replace(" ", "T")
      : val;

  const d = new Date(safeVal);

  if (isNaN(d.getTime())) {
    console.log(d.getTime());
    return val; // 파싱 실패하면 원본 문자열 그대로 출력
  }

  console.log(d);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}.${m}.${da} ${h}:${min}`;
};



 return (
  <CalendarDetailModal
    isOpen={true}
    event={{
      title: event.title,
      category: getCategoryLabel(event.catecode),
date: `${formatDateTime(event.sdate || event.start)} ~ ${formatDateTime(event.edate || event.end)}`,

      content: event.content,
    }}
    onModify={() =>
      navigate("/calendar/CalendarRegist", { state: { event } })
    }
    onDelete={() => {
      alert("삭제 기능 연동 예정");
      navigate(-1);
    }}
    onClose={() => navigate(-1)}
  />
);

};



export default CalendarDetail;
