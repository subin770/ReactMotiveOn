// src/components/calendar/CalendarDetail.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCalendar } from "../motiveOn/api";
import Toast from "../common/Toast";

const CalendarDetail = ({ event, onClose }) => {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Toast 상태
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // 삭제 처리 함수
  const handleDelete = async () => {
    try {
      const res = await deleteCalendar(event.ccode);

      if (res.status === 200 && res.data === "success") {
        setToastMessage("일정이 삭제되었습니다.");
        setToastType("success");
        setDeleteOpen(false);

        window.dispatchEvent(new Event("calendar:refresh"));
        onClose();
      } else {
        setToastMessage("삭제 실패");
        setToastType("error");
      }
    } catch (err) {
      console.error("삭제 오류:", err);
      setToastMessage("서버 오류 발생");
      setToastType("error");
    }
  };

  return (
    <>
      {/* 일정 상세 모달 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            width: "340px",
            padding: "20px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#52586B",
              marginBottom: "12px",
            }}
          >
            일정 상세
          </h3>
          <div
            style={{
              fontSize: "14px",
              color: "#52586B",
              lineHeight: "1.8",
            }}
          >
            <div>제목 : {event?.title}</div>
            <div>분류 : {event?.category}</div>
            <div>일시 : {event?.date}</div>
            <div>내용 : {event?.content}</div>
          </div>

          <hr style={{ margin: "16px 0", border: "0.5px solid #ddd" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {/* 수정 버튼 → Toast 안내 */}
            <button
              type="button"
              onClick={() => {
                setToastMessage("수정 기능은 준비 중입니다.");
                setToastType("info");
              }}
              style={{
                background: "#999",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              수정
            </button>

            {/* 삭제 버튼 → 삭제 확인 모달 열기 */}
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              style={{
                background: "#ca302e",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {deleteOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
          onClick={() => setDeleteOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              width: "300px",
              padding: "24px 20px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#52586B",
                marginBottom: "24px",
              }}
            >
              정말 삭제하시겠습니까?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                style={{
                  background: "#999",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={3000}   // 3초 동안 표시
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};

export default CalendarDetail;
