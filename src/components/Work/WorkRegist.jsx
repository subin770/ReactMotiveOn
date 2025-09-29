// src/components/Work/WorkRegist.jsx
import React, { useState, useRef } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import OrgTree from "../common/OrgTree2"; // 조직도
import { useNavigate, useLocation } from "react-router-dom";
import { registWork } from "../motiveOn/api";
import { useUserStore } from "../../store/userStore";   

export default function WorkRegist() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoggedIn } = useUserStore(); 

  const [showOrgTree, setShowOrgTree] = useState(false);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [assignees, setAssignees] = useState([]);
  const orgTreeRef = useRef(null); // ref 추가

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
        alert("업무등록이 완료 되었습니다.");
        navigate("/work/reqlist"); // 요청한 업무 리스트로 이동
      })
      .catch((err) => {
        console.error(err);
        alert("등록에 실패했습니다.");
      });
  };

  // === 스타일 ===
  const pageWrapperStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    maxHeight: "788px",
    fontFamily: "Noto Sans CJK KR, sans-serif",
    backgroundColor: "#f0f2f5",
  };
  const contentContainerStyle = {
    flex: 1,
    maxWidth: "390px",
    maxHeight: "704px",
    padding: "16px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
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
  const buttonContainerStyle = { position: "fixed",   // 📌 항상 하단 고정
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
      zIndex: 1000,      };   // 다른 요소보다 위에

  return (
    <div style={pageWrapperStyle}>
      <div style={contentContainerStyle}>
        {/* 제목 */}
        <div style={fieldRowStyle}>
          <div style={labelStyle}>제목</div>
          <div style={{...inputWrapperStyle,
            marginTop: "-2px",
            marginBottom : "-16px",
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
          <div style={{...inputWrapperStyle,
            marginTop: "-2px",
            marginBottom : "-16px",
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
          <div style={{...inputWrapperStyle,
            marginTop: "-2px",
            marginBottom : "-16px",
          }}>
            <DatePicker
              dateValue={endDate}
              onDateChange={setEndDate}
              style={commonInputStyle}
            />
          </div>
        </div>

        {/* 내용 */}

        <div style={{...inputWrapperStyle,
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
              height: "410px",
              resize: "vertical",
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
    </div>
  );
}