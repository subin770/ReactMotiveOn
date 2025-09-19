// src/components/common/OrgTree2.jsx
import React, { useEffect } from "react";
import $ from "jquery";
import "jstree";
import { getOrgTree } from "../motiveOn/api";

export default function OrgTree2({ onSelect }) {
  useEffect(() => {
    getOrgTree()
      .then((res) => {
        console.log(" 원본 데이터:", res.data);

        const data = res.data.map((node) => {
          const id = String(node.id || node.ID);
          const parent =
            node.parent === "#" || node.PARENT === "#"
              ? "#"
              : String(node.parent || node.PARENT);
          const text = node.text || node.TEXT;
          const type = node.type || node.TYPE;

          // 부서 → children 배열 (하위 가능)
          if (type === "department") {
            return {
              id,
              parent,
              text,
              type,
              children: [], 
              icon: "jstree-folder",
            };
          }

          // 사원 → leaf node (children 없음)
          return {
            id,
            parent,
            text,
            type,
            icon: "jstree-user",
          };
        });

        console.log(" 변환된 데이터:", data);

        // 기존 트리 초기화
        if ($("#orgTree").jstree(true)) {
          $("#orgTree").jstree("destroy");
        }

        // jstree 초기화
        $("#orgTree")
          .jstree({
            core: {
              data,
              check_callback: true,
            },
            themes: { dots: true, icons: true },
            plugins: ["search"],
          })
          .on("select_node.jstree", (e, node) => {
            if (node.node.id.startsWith("e-")) {
              const eno = node.node.id.replace("e-", "");
              const name = node.node.text;
              onSelect({ value: eno, label: name });
            }
          });
      })
      .catch((err) => {
        console.error("❌ 조직도 불러오기 실패:", err);
      });
  }, [onSelect]);

  return (
    <div>
      <input
        type="text"
        id="orgSearch"
        placeholder="검색(이름/부서)"
        onKeyUp={(e) => $("#orgTree").jstree(true).search(e.target.value)}
        style={{ marginBottom: "8px", width: "100%" }}
      />
      <div id="orgTree"></div>
    </div>
  );
}
