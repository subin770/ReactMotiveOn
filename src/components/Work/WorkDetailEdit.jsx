// src/components/Work/WorkDetailEdit.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../common/StatusBadge";
import Button from "../common/Button";
import InputField from "../common/InputField";
import OrgTree from "../common/OrgTree2"; // 👈 조직도 불러오기
import { modifyWork } from "../motiveOn/api";

export default function WorkDetailEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { wcode } = useParams();

  const work = location.state?.work;

  const [formData, setFormData] = useState({
    wtitle: "",
    requester: "",
    assignees: [], // 여러 명 가능
    deadline: "",
    content: "",
    status: "",
  });

  const [showOrgTree, setShowOrgTree] = useState(false);
  const orgTreeRef = useRef(null);

  // 초기값 세팅
  useEffect(() => {
    if (work) {
      setFormData({
        wtitle: work.wtitle || "",
        requester: work.requesterName || "",
        assignees: work.managerName
          ? [{ label: work.managerName, value: work.managerEno }]
          : [],
        deadline: work.wend
          ? new Date(work.wend).toISOString().substring(0, 10)
          : "",
        content: work.wcontent ? work.wcontent.replace(/<[^>]+>/g, "") : "",
        status: work.wstate || "WAIT",
      });
    }
  }, [work]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = async () => {
  try {
    const payload = {
      wcode,
      wtitle: formData.wtitle,
      wcontent: formData.content,
      wend: formData.deadline,
      wstate: formData.status,
      assignees: formData.assignees.map((a) => a.value), // 담당자 eno 배열
    };

    const res = await modifyWork(payload);

    if (res.data.message === "success" || res.data === "SUCCESS") {
      alert("업무가 수정되었습니다.");
      // 👉 수정 후 요청한 업무 목록 페이지로 이동
      navigate("/work/reqlist", { replace: true });
    } else {
      alert("수정 실패");
    }
  } catch (err) {
    console.error("업무 수정 실패:", err);
    alert("서버 오류로 수정에 실패했습니다.");
  }
};

  return (
    <div
      style={{
        maxWidth: "390px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        height: "788px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* 고정 헤더 */}
      <div style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "bold", color: "#222" }}>
          업무 수정
        </h3>
      </div>

      {/* 내용 영역 */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", boxSizing: "border-box" }}>
        <InputField label="제목" value={formData.wtitle} onChange={handleChange("wtitle")} />
        <InputField label="요청자" value={formData.requester} readOnly />

        {/* 담당자 선택 */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "6px", color: "#333" }}>
            담당자
          </label>
          <input
            type="text"
            value={formData.assignees.map((a) => a.label).join(", ")}
            placeholder="담당자를 선택하세요"
            readOnly
            onClick={() => setShowOrgTree(true)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              fontSize: "14px",
              cursor: "pointer",
            }}
          />
        </div>

        <InputField label="기한" type="date" value={formData.deadline} onChange={handleChange("deadline")} />

        {/* 상태 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ width: "40px", fontSize: "14px", fontWeight: "bold", color: "#333" }}>상태</div>
          <StatusBadge label={formData.status} />
        </div>

        {/* 내용 */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: "325px" }}>
          <label style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "6px", color: "#333" }}>
            내용
          </label>
          <textarea
            value={formData.content}
            onChange={handleChange("content")}
            style={{
              flex: 1,
              width: "100%",
              resize: "none",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
              outline: "none",
              lineHeight: "1.5",
              boxSizing: "border-box",
            }}
            placeholder="내용을 입력하세요"
          />
        </div>
      </div>

      {/* 하단 버튼 */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: "12px",
        }}
      >
        <Button label="저장" variant="primary" onClick={handleSave} />
        <Button label="취소" variant="secondary" onClick={() => navigate(-1)} />
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
                  setFormData((prev) => ({ ...prev, assignees: selected }));
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