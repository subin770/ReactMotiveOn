import React from "react";
import { IconPlus } from "../Work/icons";
import { useNavigate } from "react-router-dom";

export default function MyWorkListPage() {
  const navigate = useNavigate();

  const workList = [
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "진행", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "완료", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
    { title: "업무 제목", dept: "00부", name: "김00", status: "대기", deadline: "2025.09.07" },
  ];

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        height: "100vh", // ✅ 전체 화면 채우기
        boxSizing: "border-box",
      }}
    >
      {/* 상단 헤더 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "8px",
          fontWeight: "bold",
          flexShrink: 0, // ✅ 줄어들지 않게
        }}
      >
        <span>내 업무 &gt; 전체</span>
      </div>

      <hr style={{ border: "0.1px solid #eee", margin: "8px 0", flexShrink: 0 }} />

      {/* 업무 리스트 (스크롤 영역) */}
      <div
        style={{
          flex: 1, // ✅ 남은 공간 차지
          overflowY: "auto", // ✅ 스크롤 가능
          paddingRight: "4px", // 스크롤바 여유
        }}
      >
        {workList.map((work, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              marginBottom: "12px",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
              {work.title}
            </div>
            <div style={{ fontSize: "13px", color: "#555" }}>
              {work.dept} {work.name}
            </div>
            <div style={{ fontSize: "13px", color: "#777" }}>
              상태: {work.status}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#999",
                marginTop: "4px",
              }}
            >
              ~{work.deadline}
            </div>
          </div>
        ))}
      </div>

      {/* 우측 하단 플로팅 버튼 */}
      <button
        style={{
          position: "fixed",
          bottom: "20px",
          right: "15px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#52586B",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
        onClick={() => navigate("/work/regist")}
      >
        <IconPlus />
      </button>
    </div>
  );
}
