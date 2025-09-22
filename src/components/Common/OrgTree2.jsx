import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import $ from "jquery";
import "jstree";
import { getOrgTree } from "../motiveOn/api";
import "jstree/dist/themes/default/style.min.css";
import "./orgTreeCustom.css";   //  커스텀 스타일 불러오기

const OrgTree2 = forwardRef(({}, ref) => {
  const treeRef = useRef(null);
  const [selectedUsers, setSelectedUsers] = useState([]); 

  useImperativeHandle(ref, () => ({
    getSelectedUser: () => selectedUsers, // 부모에서 확인 버튼 클릭 시 배열 반환
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
              multiple: true,   
            },
            themes: { dots: true, icons: true },
            plugins: ["search"],
          })
          .on("select_node.jstree", function (e, data) {
            // 클릭한 노드만 펼치기
            if (data.node.children.length > 0) {
              $(this).jstree("open_node", data.node);
            }

            // 사원만 선택되면 배열에 추가
            if (data.node.original.type === "employee") {
              const eno = data.node.id.replace("e-", "");
              const name = data.node.text;
              setSelectedUsers((prev) => {
                if (prev.some((u) => u.value === eno)) return prev; // 중복 방지
                return [...prev, { value: eno, label: name }];
              });
            }
          })
          .on("deselect_node.jstree", function (e, data) {
            // 선택 해제 시 배열에서 제거
            if (data.node.original.type === "employee") {
              const eno = data.node.id.replace("e-", "");
              setSelectedUsers((prev) => prev.filter((u) => u.value !== eno));
            }
          });
      })
      .catch((err) => {
        console.error("조직도 불러오기 실패:", err);
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
        style={{
          marginBottom: "15px",
          width: "100%",
          height: "40px",        
          padding: "8px 12px", 
          fontSize: "14px",     
          border: "1px solid #ccc",
          borderRadius: "6px",
          boxSizing: "border-box",
        }}
      />
      <div ref={treeRef}></div>
    </div>
  );
});

export default OrgTree2;