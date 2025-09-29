// src/components/Work/WorkRegist.jsx
import React, { useState, useRef } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import OrgTree from "../common/OrgTree2"; // 조직도
import { useNavigate, useLocation } from "react-router-dom";
import { registWork } from "../motiveOn/api";
import { useUserStore } from "../../store/userStore"; 
import Toast from "../common/Toast";  

export default function WorkRegist() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoggedIn } = useUserStore(); 

  const [showOrgTree, setShowOrgTree] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date()); // ✅ 오늘 날짜 기본값
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [assignees, setAssignees] = useState([]);
  const orgTreeRef = useRef(null); // ref 추가

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // ✅ 저장 버튼
  const handleSave = () => {
    if (!user?.eno) {
      alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }

    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!assignees || assignees.length === 0) {
      alert("담당자를 최소 1명 선택해주세요.");
      return;
    }

    // 담당자 eno 배열
    const ownerEnos = assignees.map((a) => a.value);

    registWork(
      {
        wtitle: title,
        wcontent: content,
        wdate: startDate || null,
        wend: endDate || null,
        wstatus: "WAIT",
      },
      ownerEnos
    )
     .then(() => {
        // ✅ 성공 토스트 표시 후 이동
        setToastType("success");
        setToastMessage("업무가 등록되었습니다.");
        setTimeout(() => navigate("/work/reqlist"), 1200);
      })
      .catch((err) => {
        console.error(err);
        alert("등록에 실패했습니다.");
      });
  };

  // === 스타일 ===
  const pageWrapperStyle = {
    width: "100%",
    height: "100vh",           // ✅ 전체 화면
    display: "flex",
    flexDirection: "column",
    fontFamily: "Noto Sans CJK KR, sans-serif",
    backgroundColor: "#f0f2f5",
    overflow: "hidden",        // ✅ body 스크롤 막고 내부 스크롤만
  };
  const contentContainerStyle = {
    flex: 1,
    maxWidth: "390px",
    padding: "16px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
    overflowY: "auto",         // ✅ 본문 스크롤
    paddingBottom: "80px",     // ✅ 버튼 영역 확보
    margin: "0 auto",
    width: "100%",
  };
  const fieldRowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
  };
  const labelStyle = {
    width: "80px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#333",
    flexShrink: 0,
    marginRight: "6px",
  };
  const inputWrapperStyle = { flex: 1 };
  const commonInputStyle = {
    height: "40px",
    padding: "0 12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontSize: "14px",
    lineHeight: "40px",
    width: "100%",
    outline: "none",
    display: "inline-block",
  };
  const assigneeInputStyle = {
    ...commonInputStyle,
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  };
  const buttonContainerStyle = { 
    position: "fixed",   // 📌 항상 하단 고정
    bottom: 0,
    left: 0,
    width: "100%",
    maxWidth: "390px",   // 모바일 화면 크기 맞춤
    margin: "0 auto",
    background: "#fff",
    borderTop: "1px solid #ddd",
    padding: "12px 16px",
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    zIndex: 1000,      
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={contentContainerStyle}>
        {/* 제목 */}
        <div style={fieldRowStyle}>
          <div style={labelStyle}>제목</div>
          <div style={{
            ...inputWrapperStyle,
            marginTop: "-2px",
            marginBottom: "-16px",
          }}>
            <InputField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요(필수)"
              required
              style={commonInputStyle}
            />
          </div>
        </div>

        {/* 요청자 */}
        <div style={fieldRowStyle}>
          <div style={labelStyle}>요청자</div>
          <div style={inputWrapperStyle}>
            <span style={commonInputStyle}>
              {user ? `${user.name}` : ""}
            </span>
          </div>
        </div>

        {/* 담당자 */}
        <div style={fieldRowStyle}>
          <div style={labelStyle}>담당자</div>
          <input
            type="text"
            value={assignees.map((a) => a.label).join(", ")}
            placeholder="담당자를 선택하세요."
            readOnly
            onClick={() => setShowOrgTree(true)}
            style={assigneeInputStyle}
          />
        </div>

        {/* 시작일 */}
        <div style={fieldRowStyle}>
          <div style={labelStyle}>시작일</div>
          <div style={{
            ...inputWrapperStyle,
            marginTop: "-2px",
            marginBottom: "-16px",
          }}>
            <DatePicker
              dateValue={startDate}
              onDateChange={setStartDate}
              style={commonInputStyle}
            />
          </div>
        </div>

        {/* 종료일 */}
        <div style={fieldRowStyle}>
          <div style={labelStyle}>종료일</div>
          <div style={{
            ...inputWrapperStyle,
            marginTop: "-2px",
            marginBottom: "-16px",
          }}>
            <DatePicker
              dateValue={endDate}
              onDateChange={setEndDate}
              style={commonInputStyle}
            />
          </div>
        </div>

        {/* 내용 */}
        <div style={{
          ...inputWrapperStyle,
          marginTop: "20px",
        }}></div>
        <div
          style={{
            ...fieldRowStyle,
            alignItems: "flex-start",
            marginBottom: 0,
          }}
        >
          <div style={labelStyle}>내용</div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              fontSize: "14px",
              minHeight: "180px",   // ✅ 일정 크기 확보
              maxHeight: "300px",   // ✅ 너무 커지지 않도록 제한
              overflowY: "auto",    // ✅ 스크롤 처리
              resize: "none",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <div style={buttonContainerStyle}>
        <hr
          style={{ border: "none", borderTop: "1px solid #eee", margin: "10px 0" }}
        />
        <Button label="저장" onClick={handleSave} variant="primary" />
      </div>

      {/* OrgTree 모달 */}
      {showOrgTree && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowOrgTree(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              width: "80%",
              maxWidth: "500px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <OrgTree ref={orgTreeRef} />
            <Button
              label="확인"
              onClick={() => {
                const selected = orgTreeRef.current?.getSelectedUser();
                if (selected && selected.length > 0) {
                  setAssignees(selected); 
                }
                setShowOrgTree(false);
              }}
            />
          </div>
        </div>
      )}
{/* ✅ 토스트 */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={1200}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
}
