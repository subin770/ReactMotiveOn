import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarEventList from "./CalendarEventList";

const CalendarWrapper = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

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
  {/* 달력 영역 (2/3) */}
  <div style={{ flex: 2.5, minHeight: 0 }}>
    <CalendarHeader setSelectedDate={setSelectedDate} />
  </div>

  {/* 이벤트 리스트 영역 (1/3) */}
  <div style={{ flex: 1, minHeight: 0 }}>
    <CalendarEventList events={events} selectedDate={selectedDate} />

  </div>
</div>

  );
};

export default CalendarWrapper;
