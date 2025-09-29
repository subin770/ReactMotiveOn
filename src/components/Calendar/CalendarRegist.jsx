import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Toast from "../common/Toast";   // ✅ 공통 토스트 컴포넌트
import { registCalendar } from "../motiveOn/api";  // ✅ API 모듈 import

const CalendarRegist = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // 에러 상태
  const [errors, setErrors] = useState({});
  // 토스트 상태
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // 유효성 검사
  const validate = () => {
    const newErrors = {};
    const start = startDate && startTime ? `${startDate} ${startTime}:00` : "";
    const end = endDate && endTime ? `${endDate} ${endTime}:00` : "";

    if (!title) newErrors.title = "제목은 필수입니다.";
    if (!category) newErrors.category = "분류를 선택하세요.";
    if (!start || !end) {
      newErrors.date = "시작일과 종료일을 모두 선택하세요.";
    } else if (new Date(start) >= new Date(end)) {
      newErrors.date = "종료일은 시작일보다 나중이어야 합니다.";
    }
    if (!content) newErrors.content = "내용을 입력하세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const newEvent = {
      title,
      start: `${startDate} ${startTime}:00`,
      end: `${endDate} ${endTime}:00`,
      catecode: category,
      content,
      color: "#4caf50",
    };

    try {
      const res = await registCalendar(newEvent);
      if (res.status === 200 && res.data === "success") {
        setToastMessage("일정이 저장되었습니다.");
        setToastType("success");

        setTimeout(() => {
          navigate("/calendarPage");
        }, 2000);
      } else {
        setToastMessage("저장 실패");
        setToastType("error");
      }
    } catch (err) {
      console.error("등록 오류:", err);
      setToastMessage("서버 오류 발생");
      setToastType("error");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ✅ 본문 (스크롤 가능) */}
      <div style={{ flex: 1, padding: "12px", overflowY: "auto", paddingBottom: "70px" }}>
        {/* 제목 */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "13px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "60px", fontSize: "14px", fontWeight: "bold" }}>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors({ ...errors, title: "" });
              }}
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
          {errors.title && (
            <span style={{ color: "red", fontSize: "12px", marginTop: "3px", marginLeft: "65px" }}>
              {errors.title}
            </span>
          )}
        </div>

        {/* 일시 */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
          <div style={{ display: "flex" }}>
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
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
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
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
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
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
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
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
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
          {errors.date && (
            <span style={{ color: "red", fontSize: "12px", marginTop: "3px", marginLeft: "65px" }}>
              {errors.date}
            </span>
          )}
        </div>

        {/* 분류 */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: "13px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "60px", fontSize: "14px", fontWeight: "bold" }}>분류</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category) setErrors({ ...errors, category: "" });
              }}
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
              <option value="C">회사</option>
              <option value="D">부서</option>
              <option value="P">개인</option>
            </select>
          </div>
          {errors.category && (
            <span style={{ color: "red", fontSize: "12px", marginTop: "3px", marginLeft: "65px" }}>
              {errors.category}
            </span>
          )}
        </div>

        {/* 내용 */}
        <div style={{ display: "flex", flexDirection: "column" }}>
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
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors({ ...errors, content: "" });
              }}
              placeholder="내용을 입력하세요."
              style={{
                flex: 1,
                height: "377px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "#f5f5f5",
                fontSize: "13px",
                resize: "none",
              }}
            />
          </div>
          {errors.content && (
            <span style={{ color: "red", fontSize: "12px", marginTop: "3px", marginLeft: "65px" }}>
              {errors.content}
            </span>
          )}
        </div>
      </div>

      {/* ✅ 하단 버튼 (항상 화면 하단에 고정) */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 16px",
          backgroundColor: "#fff",
          borderTop: "1px solid #eee",
          zIndex: 1000,
        }}
      >
        <Button label="저장" variant="primary" onClick={handleSave} />
      </div>

      {/* ✅ 토스트 */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={1000}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default CalendarRegist;
