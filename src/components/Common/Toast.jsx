// src/components/common/Toast.jsx
import React, { useEffect } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const backgroundColor =
    type === "success"
      ? "#52586B"   // 초록
      : type === "error"
      ? "#f44336"   // 빨강
      : type === "info"
      ? "#2196f3"   // 파랑
      : "#52586B";  // 기본

  return (
    <div
      style={{
        position: "fixed",
        bottom: "70px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor,
        color: "#ffffff",
        padding: "11px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        zIndex: 9999,
        minWidth: "240px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.25)",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;