import React from "react";

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <aside
      style={{
        position: "fixed",
        top: "55px",
        left: 0,
        width: "260px",
        height: "100%",
        background: "#fff",
        borderRight: "1px solid #eee",
        padding: "16px",
        zIndex: 1000,
        boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* 프로필 섹션 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img
          src="https://via.placeholder.com/48" // 나중에 이미지 연결
          alt="프로필"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            marginRight: "12px",
          }}
        />
        <div style={{ fontSize: "14px", color: "#333" }}>
          <div>성명 : 이민진</div>
          <div>사번 : 2430015</div>
          <div>직위 : 사원</div>
          <div>부서 : 경영지원팀</div>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            출근시간 : 2025-09-04 01:49
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <nav>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "15px" }}>바로가기</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <a href="/calendar" style={{ textDecoration: "none", color: "#333" }}>일정</a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a href="/work" style={{ textDecoration: "none", color: "#333" }}>업무</a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a href="/approval" style={{ textDecoration: "none", color: "#333" }}>전자결재</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
