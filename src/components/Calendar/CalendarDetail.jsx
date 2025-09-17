import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../common/Button"; //  공통 버튼 불러오기
import dayjs from "dayjs"; // ✅ dayjs 추가

const CalendarDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // CalendarEventList 에서 navigate 시 넘겨받은 state
  const event = location.state?.event || {};

  const handleModify = () => {
    navigate("/calendar/CalendarEdit", { state: { event } });
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      //  실제 API 연동 자리
      alert("삭제 완료!");
      navigate(-1);
    }
  };

  // ✅ 날짜 + 시간 포맷 (dayjs 사용, HH:mm까지)
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    return dayjs(dateStr).format("YYYY.MM.DD HH:mm");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        maxWidth: "390px",
        margin: "0 auto",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 상단 헤더 */}
      <div
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid #eee",
          backgroundColor: "hsl(0, 0%, 100%)",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        ></button>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>
          일정 상세
        </h3>
        <div style={{ width: "280px" }} /> {/* 오른쪽 여백 */}
      </div>

      {/* 본문 */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          paddingLeft: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "20px", // ✅ 항목 간 간격
        }}
      >
        <div style={{ fontSize: "14px", display: "flex" }}>
          <strong style={{ width: "60px" }}>제목 :</strong>
          <span>{event.title || "제목 없음"}</span>
        </div>

        <div style={{ fontSize: "14px", display: "flex" }}>
          <strong style={{ width: "60px" }}>분류 :</strong>
          <span>
            {event.catecode === "C"
              ? "회사 일정"
              : event.catecode === "D"
              ? "부서 일정"
              : event.catecode === "P"
              ? "개인 일정"
              : "기타"}
          </span>
        </div>

        <div style={{ fontSize: "14px", display: "flex" }}>
          <strong style={{ width: "60px" }}>일시 :</strong>
          <span>
            {formatDateTime(event.sdate)} ~ {formatDateTime(event.edate)}
          </span>
        </div>

        <div style={{ fontSize: "14px", display: "flex" }}>
          <strong style={{ width: "60px" }}>내용 :</strong>
          <span>{event.content || "내용 없음"}</span>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          padding: "16px",
          borderTop: "1px solid #eee",
        }}
      >
        <div style={{ width: "50px" }}>
          <Button label="수정" variant="primary" onClick={handleModify} />
        </div>
        <div style={{ width: "50px" }}>
          <Button label="삭제" variant="danger" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default CalendarDetail;
