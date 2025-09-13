import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCalendarStore } from "../../store/calendarStore";
import Button from "../common/Button";

const CalendarRegist = () => {
  const addEvent = useCalendarStore((state) => state.addEvent);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title) {
      alert("제목을 입력하세요");
      return;
    }
    addEvent({
      title,
      start: `${startDate} ${startTime}`,
      end: `${endDate} ${endTime}`,
      category,
      content,
    });
    navigate("/calendar");
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 본문 */}
<div style={{ padding: "8.7px", height: "700px", overflowY: "auto" }}>
        {/* 제목 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "13px" }}>
          <label
            style={{
              width: "60px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="(필수) 제목을 입력하세요."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              fontSize: "14px",
            }}
            required
          />
        </div>

        {/* 일시 */}
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <label
            style={{
              width: "60px",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            일시
          </label>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  fontSize: "14px",
                }}
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  width: "120px",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  fontSize: "14px",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  fontSize: "14px",
                }}
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{
                  width: "120px",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  backgroundColor: "#f5f5f5",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
        </div>

        {/* 분류 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "13px" }}>
          <label
            style={{
              width: "60px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            분류
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              fontSize: "14px",
            }}
          >
            <option value="">분류를 선택하세요</option>
            <option value="work">회사</option>
            <option value="dept">부서</option>
            <option value="personal">개인</option>
          </select>
        </div>

        {/* 내용 */}
        <div style={{ display: "flex" }}>
          <label
            style={{
              width: "60px",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "6px",
            }}
          >
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            style={{
              flex: 1,
              height: "459px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              fontSize: "13px",
              resize: "none",
            }}
          />
        </div>
      </div>

      <hr style={{ margin: "9px 0", border: "0.2px solid #eee" }} />

      {/* 저장 버튼 */}
      <div style={{ padding: "2px 16px 5px" }}>
        <Button
          label="저장"
          variant="primary"
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default CalendarRegist;
