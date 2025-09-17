// src/components/Home/HomePage.jsx
import React, { useState } from "react";   // ✅ useState 추가
import StatusCard from "../common/StatusCard";
import { Link } from "react-router-dom";

const HomePage = () => {

  const [activeTab, setActiveTab] = useState("긴급");


  const approvalData = {
    긴급: [
      "긴급 결재 문서입니다.",
      "긴급 결재가 필요한 문서 1",
      "긴급 결재가 필요한 문서 2",
      "긴급 결재가 필요한 문서 3",
      "긴급 결재가 필요한 문서 4",
      "긴급 결재가 필요한 문서 5",
      "긴급 결재가 필요한 문서 6",
      "긴급 결재 문서입니다.",
 
    ],
    반려: [
      "반려된 결재 문서입니다.",
      "반려 사유: 서명 누락",
      "반려 사유: 예산 초과",
    ],
    보류: [
      "보류된 결재 문서입니다.",
      "보류: 담당자 확인 필요",
      "보류: 추가 자료 요청",
    ],
    대기: [
      "결재 대기 문서입니다.",
      "대기: 부서장 승인 필요",
      "대기: 회계팀 확인 필요",
    ],
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",
        background: "#f5f5f5", // 전체 배경 회색
        fontFamily: "sans-serif",
        fontSize: "14px",
        color: "#344055",
        minHeight: "100vh",
      }}
    >
      {/* 일정 */}
      <section
        style={{
          padding: "16px",
          background: "#fff",
          marginBottom: "8px",
          
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontWeight: "bold",
            padding: "0 12px",
          }}
        >
          <span>일정</span>
          <Link to="/calendarPage" style={{ fontSize: "12px", color: "#bbb" }}>
            바로가기
          </Link>
        </div>
        <Link to="/calendar/detail/1" style={{ textDecoration: "none", color: "inherit" }}>
       {/* <Link to={`/calendar/detail/${schedule.id}`} style={{ textDecoration: "none", color: "inherit" }}></Link>*/}
        
        
  <div
    style={{
      background: "#f9f9f9",
      borderRadius: "6px",
      padding: "16px",
      cursor: "pointer",   
    }}
  >
    <div style={{ fontWeight: "600", marginBottom: "8px", fontSize: "13px" }}>
      8일 (월)
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          width: "12px",
          height: "20px",
          backgroundColor: "#4caf50",
          borderRadius: "3px",
        }}
      ></div>
      <div>
        <div style={{ fontWeight: "500", fontSize: "13px" }}>테스트</div>
        <div style={{ fontSize: "12px", color: "#8d8c8c" }}>
          2025/9/26 14:00
        </div>
      </div>
    </div>
  </div>
</Link>

      </section>

      {/* 업무 */}
      <section
        style={{
          padding: "16px",
          background: "#fff",
          marginBottom: "8px",
        }}
      >
        {/* 상단 타이틀 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontWeight: "bold",
            color: "#344055",
            padding: "0 8px",
          }}
        >
          <span>업무</span>
          <Link to="/work" style={{ fontSize: "12px", color: "#bbb" }}>
            바로가기
          </Link>
        </div>

        {/* 금주 마감 업무 + 카드 */}
        <div
          style={{
            background: "#f7f7f7",
            borderRadius: "6px",
            padding: "16px",
          }}
        >
          {/* 제목 줄 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              fontWeight: "600",
              fontSize: "14px",
              color: "#344055",
            }}
          >
            <span>금주 마감 업무</span>
            {/* <span style={{ fontSize: "12px", color: "#9b9b9b" }}>더보기</span> */}
          </div>

          {/* 카드 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
            }}
          >
            <StatusCard label="대기" count={0} color="#d4f0d2" />
            <StatusCard label="진행" count={0} color="#f9d6c7" />
            <StatusCard label="협업요청" count={0} color="#f7d8f0" />
            <StatusCard label="대리요청" count={0} color="#d9d9d9" />
            <StatusCard label="완료" count={0} color="#fff7b1" />
            <StatusCard label="전체" count={0} color="#e7ebf0" />
          </div>
        </div>
      </section>

      {/* 전자결재 */}
      <section
        style={{
          padding: "16px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          minHeight: "400px", // 카드 최소 높이 지정
        }}
      >
        {/* 상단 타이틀 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            fontWeight: "bold",
            color: "#344055",
            padding: "0 12px",
          }}
        >
          <span>전자결재</span>
          <Link to="/approvalPage" style={{ fontSize: "12px", color: "#bbb" }}>
            바로가기
          </Link>
        </div>

        {/* 탭 + 리스트를 하나의 박스로 */}
        <div
          style={{
            background: "#f9f9f9",
            borderRadius: "6px",
          
            minHeight: "280px",
          }}
        >
          {/* 탭 */}
          <div
            style={{
              display: "flex",
              borderBottom: "0.9px solid #ddd",
            }}
          >
            {["긴급", "반려", "보류", "대기"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)} 
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "10px 0",
                  fontSize: "13px",
                  cursor: "pointer",
                  color: activeTab === tab ? "#2c557d" : "#555",
                  fontWeight: activeTab === tab ? "600" : "400",
                  borderBottom:
                    activeTab === tab
                      ? "3px solid #2c557d"
                      : "3px solid transparent",
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* 리스트 */}
          <div
            style={{
               height: "220px",  
              overflowY: "auto",
              padding: "12px",
              background: "#f9f9f9",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
            }}
          >
             {approvalData[activeTab].map((item, idx) => (
                <li key={idx} style={{
                fontSize: "14px",
                color: "#444",
                lineHeight: "3",
                listStyleType: "disc",
                paddingLeft: "15px",
                margin: 0,
              }}>{item}</li>
              ))}
        
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
