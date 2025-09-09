import React from "react";

const Header = ({ onMenuClick, onNoticeClick, onLogout }) => {
  return (
    <header
      style={{
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #eee",
        position: "fixed", 
        top: 0,
        left: 0,
        right: 0,
        background: "#fff",
        zIndex: 1100, // 사이드바보다 위
      }}
    >
      {/* 메뉴 버튼 */}
      <button
        onClick={onMenuClick}
        style={{ background: "none", border: "none", fontSize: "20px" }}
      >
        ☰
      </button>

      {/* 중앙 로고 */}
      <img src="/components/img/motiveon-logo" alt="MotiveOn" style={{ height: "24px" }} />

      {/* 알림 + 로그아웃 */}
      <div>
        <button
          onClick={onNoticeClick}
          style={{ marginRight: "8px", background: "none", border: "none" }}
        >
          
        </button>
        <button onClick={onLogout} style={{ background: "none", border: "none" }}>
          
        </button>
      </div>
    </header>
  );
};

export default Header;
