import React from "react";

function PasswordError({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
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
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "320px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            marginBottom: "20px",
            whiteSpace: "pre-line", // \n 줄바꿈 적용
          }}
        >
          {"올바른 메일 주소가 아닙니다.\n확인 후 다시 시도해 주세요."}
        </p>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            background: "#3A8DFE",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default PasswordError;