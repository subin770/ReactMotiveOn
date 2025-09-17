import React, { useEffect, useState } from "react";
import { IconPlus } from "../Work/icons";
import { useNavigate } from "react-router-dom";
import { getRequestedWork } from "../motiveOn/api";

export default function RequestedWorkPage() {
  const navigate = useNavigate();
  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    const fetchRequested = async () => {
      try {
        const res = await getRequestedWork();
        setWorkList(res.data.list || []);
      } catch (err) {
        console.error("요청한 업무 목록 가져오기 실패:", err);
      }
    };
    fetchRequested();
  }, []);

 useEffect(() => {
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    // 👉 스와이프 판정 (오른쪽으로 80px 이상 이동했을 때)
  // 왼쪽 → 오른쪽 (뒤로가기)
if (diffX > 80) {
  navigate(-1); // history back
}

// 오른쪽 → 왼쪽 (앞으로 가기)
if (diffX < -80) {
  navigate(1); // history forward
}

  };

  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchend", handleTouchEnd);

  return () => {
    document.removeEventListener("touchstart", handleTouchStart);
    document.removeEventListener("touchend", handleTouchEnd);
  };
}, [navigate]);

  return (
    <div style={{ padding: "16px", height: "788px", overflow: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", fontWeight: "bold" }}>
        <span>요청한 업무 &gt; 전체</span>
      </div>
      <hr style={{ border: "0.1px solid #eee", margin: "8px 0" }} />

      <div>
        {workList.length === 0 ? (
          <div style={{ color: "#777", fontSize: "14px" }}>업무가 없습니다.</div>
        ) : (
          workList.map((work) => (
            <div
              key={work.wcode}
              style={{
                background: "#fff",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                marginBottom: "12px",
                cursor: "pointer"   // 클릭 가능 느낌 추가
              }}
onClick={() => navigate(`/work/detail/${work.wcode}`, { state: { from: "reqlist" } })}
            >
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{work.wtitle || work.wcode}</div>
              <div style={{ fontSize: "13px", color: "#555" }}>
                {work.dno} {work.managerName || "담당자 없음"}
              </div>
              <div style={{ fontSize: "13px", color: "#777" }}>상태: {work.wstatus}</div>
              <div style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>마감: {work.wend || "미정"}</div>
            </div>
          ))
        )}
      </div>

      <button
        style={{ position: "fixed", bottom: "20px", right: "15px", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#52586B", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        onClick={() => navigate("/work/regist")}
      >
        <IconPlus />
      </button>
    </div>
  );
}