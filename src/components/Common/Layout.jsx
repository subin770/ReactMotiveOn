import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userMock = {
    name: "이민진",
    empNo: "24330015",
    position: "사원",
    dept: "경영지원팀",
    checkIn: "2025-09-04 01:49",
    profileImg: "/profile.png",
  };

  return (
    <div style={{ width: "100%", height: "788px" }}>
      {/* 헤더 */}
      <Header
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* 사이드바: fixed로 겹쳐서 뜸 */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={userMock}
        onNavigate={navigate}
      />

      {/* 본문 */}
    <main
  style={{
    marginTop: "56px",                // 헤더 높이만큼 띄움
    width: "100%",                    // 전체 폭 유지
    height: "calc(100vh - 56px)",     // 헤더 제외 영역
    overflow: "hidden",               // ✅ 스크롤 제거
    boxSizing: "border-box",
  }}
>
  <Outlet />
</main>

    </div>
  );
};

export default Layout;
