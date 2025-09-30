import React, { useState } from "react";
import arrowIcon from "../../assets/img/dropdown.png";
import { IconLogout } from "../common/icons";

const Sidebar = ({ isOpen, onClose, user, onNavigate, onLogout }) => {
  const [openMenu, setOpenMenu] = useState(null);

  // 메뉴 데이터
  const menuItems = [
    { label: "홈", path: "/home", type: "link" },
    { label: "일정", path: "/calendarPage", type: "link" },
    {
      label: "업무",
      children: [
        { label: "홈", path: "/work" },
        { label: "내업무", path: "/work/myworklist" },
        { label: "요청한업무", path: "/work/reqlist" },
      ],
    },
    {
      label: "전자결재",
      children: [
        { label: "홈", path: "/approval" },
        { label: "참조문서함", path: "/approval/viewerList" },
        { label: "기안문서함", path: "/approval/draftList" },
        { label: "임시문서함", path: "/approval/tempList" },
        { label: "결재문서함", path: "/approval/approvalList" },
      ],
    },
  ];

  const handleMenuClick = (item) => {
    if (item.type === "link") {
      onNavigate(item.path);
      onClose();
    } else {
      setOpenMenu(openMenu === item.label ? null : item.label);
    }
  };

  const handleSubMenuClick = (path) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
      {/* ✅ 오버레이 영역 (사이드바 열렸을 때만 표시) */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: "56px", // 헤더 높이만큼 띄움
            left: 0,
            width: "100%",
            height: "calc(100vh - 56px)",
            background: "rgba(0,0,0,0.3)", // 반투명 배경
            zIndex: 1500,
          }}
        />
      )}

      {/* 사이드바 */}
      <aside
        style={{
          width: "300px",
          height: "calc(100vh - 56px)",
          background: "#f9f9f9",
          borderRight: "1px solid #eee",
          position: "fixed",
          top: "56px",
          left: isOpen ? "0" : "-300px",
          transition: "left 0.3s ease",
          zIndex: 2001, // 오버레이보다 위
          padding: "20px 16px",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // 👈 사이드바 내부 클릭 시 닫히지 않도록 막음
      >
        {/* 사용자 정보 */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <img
              src={`/images/${user.name}.jpg`}
              alt="프로필"

              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                marginRight: "14px",
                objectFit: "cover",   // 👈 비율 유지 + 꽉 채우기

              }}
            />
            <div style={{ fontSize: "13px", lineHeight: "1.8", color: "#333" }}>
              <p>성명 : {user?.name}</p>
              <p>사번 : {user?.eno}</p>
            </div>
          </div>
          <hr style={{ border: "0", borderTop: "1px solid #ddd", margin: "8px 0" }} />
        </div>

        {/* 메뉴 */}
        <nav>
          <h4
            style={{
              marginBottom: "12px",
              fontSize: "15px",
              fontWeight: "bold",
              color: "#060b3b",
            }}
          >
            바로가기
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.map((item) => (
              <li key={item.label} style={{ marginBottom: "6px" }}>
                <div
                  style={{
                    padding: "8px 0",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "13px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => handleMenuClick(item)}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <img
                      src={arrowIcon}
                      alt="arrow"
                      style={{
                        width: "14px",
                        height: "14px",
                        transform:
                          openMenu === item.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  )}
                </div>

                {item.children && openMenu === item.label && (
                  <ul style={{ listStyle: "none", paddingLeft: "16px" }}>
                    {item.children.map((sub) => (
                      <li
                        key={sub.label}
                        style={{
                          padding: "6px 0",
                          cursor: "pointer",
                          fontSize: "13px",
                          color: "#444",
                        }}
                        onClick={() => handleSubMenuClick(sub.path)}
                      >
                        {sub.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 로그아웃 버튼 */}
        <button
          onClick={onLogout}
          style={{
            position: "absolute",
            bottom: "60px",
            right: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            color: "#333",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#eee")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <IconLogout />
          <span>로그아웃</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
