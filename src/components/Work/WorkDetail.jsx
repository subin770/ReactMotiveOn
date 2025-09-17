import React from "react";
import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";

export default function RequestedWorkPage() {
  return (
    <div
      style={{
        maxWidth: "390px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        height: "788px", // 화면 전체 높이
        display: "flex",
        flexDirection: "column",
        padding: "16px 16px 0px",
        boxSizing: "border-box",
      }}
    >
      {/* 고정 헤더 */}
      <div style={{ marginBottom: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "bold", color: "#222" }}>
          테스트
        </h3>
        <hr style={{ marginTop: "4px", border: "none", borderTop: "1px solid #ddd" }} />
      </div>

      {/* 내용 영역 - 스크롤 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "16px",
        }}
      >
        {/* 공통 행 */}
        {[{ label: "요청자", value: "김민준" },
          { label: "담당자", value: "박동규" },
          { label: "기한", value: "2025.09.09" }].map((item, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ width: "70px", fontSize: "13px", fontWeight: "bold", color: "#555" }}>
              {item.label}
            </div>
            <div
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: "6px",
                backgroundColor: "#f5f5f5",
                fontSize: "13px",
                color: "#333",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}

        {/* 상태 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ width: "70px", fontSize: "13px", fontWeight: "bold", color: "#555" }}>
            상태
          </div>
          <StatusBadge label="대기" />
        </div>

        {/* 내용 */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "70px",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#555",
              paddingTop: "4px",
            }}
          >
            내용
          </div>
          <div
            style={{
              flex: 1,
              minHeight: "180px",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "#f5f5f5",
              fontSize: "13px",
              color: "#333",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            테스트입니다. 테스트입니다. 긴 문장이 와도 자동으로 줄바꿈이 됩니다.
            
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "12px",
          display: "flex",
          gap: "12px",
          marginBottom: "16px"
        }}
      >
        <Button label="수정" variant="primary" onClick={() => console.log("수정 클릭")} />
        <Button label="삭제" variant="danger" onClick={() => console.log("삭제 클릭")} />
      </div>
    </div>
  );
}