import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarEventList from "./CalendarEventList";
import { getCalendarList } from "../motiveOn/api";

const CalendarWrapper = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // 날짜 포맷 (YYYY.MM.DD)
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  useEffect(() => {
    getCalendarList()
      .then((res) => {
        const rawEvents = res.data.calendarList || [];

        // 🔹 DB 원본 이벤트 → 가공
        const mappedEvents = rawEvents.map((event) => {
          // catecode 색상 매핑
          let color = "#9bc59c";
          if (event.catecode === "C") color = "#f76258"; // 회사
          else if (event.catecode === "D") color = "#71b2e7"; // 부서
          else if (event.catecode === "P") color = "#94c296"; // 개인

          return {
            ...event,
            sdate: formatDate(event.sdate),
            edate: formatDate(event.edate),
            color,
          };
        });

        setEvents(mappedEvents);
      })
      .catch((err) => console.error("일정 불러오기 실패:", err));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "844px",
        maxWidth: "390px",
        margin: "0 auto",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* 달력 영역 */}
      <div style={{ flex: 2.5, minHeight: 0 }}>
        <CalendarHeader setSelectedDate={setSelectedDate} />
      </div>

      {/* 이벤트 리스트 영역 */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <CalendarEventList events={events} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default CalendarWrapper;
