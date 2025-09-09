import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header
        onMenuClick={() => setSidebarOpen(!isSidebarOpen)} 
        onNoticeClick={() => alert("알림 보기")}
        onLogout={() => alert("로그아웃")}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main style={{ padding: "72px 16px 16px 16px" }}>{children}</main>
    </div>
  );
};

export default Layout;
