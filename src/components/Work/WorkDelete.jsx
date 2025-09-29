// src/components/work/WorkDetail.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWork } from "../motiveOn/api"; // ✅ 업무 삭제 API import
import Toast from "../common/Toast";

const WorkDetail = ({ work, onClose }) => {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

 const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");


  // ✅ 삭제 처리 함수
 const handleDelete = async () => {
    try {
      const res = await deleteWork(work.wcode);

      if (
        res.status === 200 &&
        (res.data === "success" || res.data.message === "success")
      ) {
        setToastType("success");
        setToastMessage("업무가 삭제되었습니다.");
        setDeleteOpen(false);
        onClose(); // 상세 모달 닫기
        setTimeout(() => navigate("/work/reqlist"), 1200); // ✅ 1.2초 뒤 이동
      } else {
        setToastType("error");
        setToastMessage("삭제 실패");
      }
    } catch (err) {
      console.error("삭제 오류:", err);
      setToastType("error");
      setToastMessage("서버 오류 발생");
    }
  };

  return (
    <>
      {/* 업무 상세 모달 */}
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
            업무 상세
          </h3>
          <div
            style={{
              fontSize: "14px",
              color: "#52586B",
              lineHeight: "1.8",
            }}
          >
            <div>제목 : {work?.wtitle}</div>
            <div>요청자 : {work?.requesterName}</div>
            <div>담당자 : {work?.managerName}</div>
            <div>
              기한 :{" "}
              {work?.wdate && work?.wend
                ? `${new Date(work.wdate).toLocaleDateString()} ~ ${new Date(
                    work.wend
                  ).toLocaleDateString()}`
                : work?.wend
                ? new Date(work.wend).toLocaleDateString()
                : "미정"}
            </div>
            <div>상태 : {work?.wstatus}</div>
            <div>내용 : {work?.wcontent}</div>
          </div>

          <hr style={{ margin: "16px 0", border: "0.5px solid #ddd" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate(`/work/detailedit/${work.wcode}`, { state: { work } })}
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
 {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={1200}
          onClose={() => setToastMessage("")}
        />
      )}


    </>
  );
};

export default WorkDetail;
