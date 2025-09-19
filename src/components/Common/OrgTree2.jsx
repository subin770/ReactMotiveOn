// src/components/common/OrgTree2.jsx
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import $ from "jquery";
import "jstree";
import { getOrgTree } from "../motiveOn/api";
import "jstree/dist/themes/default/style.min.css";
import "./orgTreeCustom.css";   // ✅ 커스텀 스타일 불러오기

const OrgTree2 = forwardRef(({}, ref) => {
  const treeRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null); // ✅ 임시 저장

  useImperativeHandle(ref, () => ({
    getSelectedUser: () => selectedUser, // 부모에서 확인 버튼 클릭 시 불러감
  }));

  useEffect(() => {
    const treeEl = $(treeRef.current);

    getOrgTree()
      .then((res) => {
        const data = res.data.map((node) => {
          const id = String(node.id || node.ID);
          const parent =
            node.parent === "#" || node.PARENT === "#"
              ? "#"
              : String(node.parent || node.PARENT);
          const text = node.text || node.TEXT;
          const type = node.type || node.TYPE;

          if (type === "department") {
            return {
              id,
              parent,
              text,
              type,
              icon: "jstree-folder",
            };
          }

          return {
            id,
            parent,
            text,
            type,
            icon: "jstree-file",
          };
        });

        if (treeEl.jstree(true)) {
          treeEl.jstree("destroy");
        }

        treeEl
          .jstree({
            core: {
              data,
              check_callback: true,
            },
            themes: { dots: true, icons: true },
            plugins: ["search"],
          })
          .on("select_node.jstree", function (e, data) {
            console.log(data);
            $(this).jstree("open_all");

            // ✅ 사원만 선택되면 임시 저장
            if (data.node.original.type === "employee") {
              const eno = data.node.id.replace("e-", "");
              const name = data.node.text;
              setSelectedUser({ value: eno, label: name });
            }
          });
      })
      .catch((err) => {
        console.error("❌ 조직도 불러오기 실패:", err);
      });

    return () => {
      if (treeEl.jstree(true)) {
        treeEl.jstree("destroy");
      }
    };
  }, []);

  const handleSearch = (e) => {
    $(treeRef.current).jstree(true).search(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        id="orgSearch"
        placeholder="검색(이름/부서)"
        onKeyUp={handleSearch}
        style={{ marginBottom: "8px", width: "100%" }}
      />
      <div ref={treeRef}></div>
    </div>
  );
});

export default OrgTree2;
