// import { useState } from 'react'
// import CalendarRegist from './components/calendar/CalendarRegist';
// import CalendarPage from './components/calendar/CalendarPage';
// import { createGlobalStyle } from 'styled-components';
// // import { Button } from "./components/Common/Button";
// // import Layout from './components/Common/Layout';
// // import Sidebar from './components/Common/Sidebar';
// // import ModalWrapper from './components/Common/ModalWrapper';
// // import InputField from './components/Common/InputField.jsx';
// // import OrgTree from "./components/Common/OrgTree";
// // import StatusBadge from './components/Common/StatusBadge.jsx';
// // import StatusCard from './components/Common/StatusCard.jsx';

// function App() {
//   const [count, setCount] = useState(0)

//   const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: Poppins;
//   }
//   a {
//     text-decoration: none;
//     color: inherit;
//   }
// `

//   return (
//     <>
//     <GlobalStyle />
//    {/* <Button/>
//    <Layout/>
//    <Sidebar/>
//    <ModalWrapper/>
//    <InputField/>
//    <OrgTree />
//    <StatusBadge/>
//    <StatusCard /> */}

//    <CalendarRegist/>
//    {/* <CalendarPage /> */}
 
//     </>
//   )
// }

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // 캘린더 관련
// import CalendarPage from "./components/calendar/CalendarPage";
// import CalendarRegist from "./components/calendar/CalendarRegist";
// import CalendarDetail from "./components/calendar/CalendarDetail";
// import CalendarEdit from "./components/calendar/CalendarEdit";
// import CalendarDelete from "./components/calendar/CalendarDelete";

// // 홈
// import Home from "./components/Home/HomePage";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* 홈 */}
//         <Route path="/" element={<Home />} />

//         {/* 캘린더 */}
//         <Route path="/calendar" element={<CalendarPage />} />
//         <Route path="/calendar/regist" element={<CalendarRegist />} />
//         <Route path="/calendar/:id" element={<CalendarDetail />} />
//         <Route path="/calendar/edit/:id" element={<CalendarEdit />} />
//         <Route path="/calendar/delete/:id" element={<CalendarDelete />} />

//         {/* 없는 경로 */}
//         <Route path="*" element={<div>404 Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/common/Layout";

// // 홈
// import HomePage from "./components/Home/HomePage";

// // 일정
// import CalendarPage from "./components/calendar/CalendarPage";
// import CalendarRegist from "./components/calendar/CalendarRegist";
// import CalendarDetail from "./components/calendar/CalendarDetail";
// import CalendarEdit from "./components/calendar/CalendarEdit";
// import CalendarDelete from "./components/calendar/CalendarDelete";

// // 업무
// import WorkPage from "./components/Work/WorkPage";
// import MyWorkPage from "./components/Work/MyWorkPage";
// import RequestedWorkPage from "./components/Work/RequestedWorkPage";

// // 전자결재
// import ApprovalPage from "./components/Approval/ApprovalPage";
// import ReferenceApprovalPage from "./components/Approval/ReferenceApprovalPage";
// import DraftApprovalPage from "./components/Approval/DraftApprovalPage";
// import TempApprovalPage from "./components/Approval/TempApprovalPage";
// import CompleteApprovalPage from "./components/Approval/CompleteApprovalPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 공통 레이아웃 적용 */}
//         <Route element={<Layout />}>
//           {/* 홈 */}
//           <Route path="/" element={<HomePage />} />

//           {/* 일정 */}
//           <Route path="/calendar" element={<CalendarPage />} />
//           <Route path="/calendar/regist" element={<CalendarRegist />} />
//           <Route path="/calendar/:id" element={<CalendarDetail />} />
//           <Route path="/calendar/edit/:id" element={<CalendarEdit />} />
//           <Route path="/calendar/delete/:id" element={<CalendarDelete />} />

//           {/* 업무 */}
//           <Route path="/work" element={<WorkPage />} />
//           <Route path="/work/myworklist" element={<MyWorkPage />} />
//           <Route path="/work/reqlist" element={<RequestedWorkPage />} />

//           {/* 전자결재 */}
//           <Route path="/approval" element={<ApprovalPage />} />
//           <Route path="/approval/viewerList" element={<ReferenceApprovalPage />} />
//           <Route path="/approval/draftList" element={<DraftApprovalPage />} />
//           <Route path="/approval/tempList" element={<TempApprovalPage />} />
//           <Route path="/approval/approvalList" element={<CompleteApprovalPage />} />

//           {/* 없는 경로 */}
//           <Route path="*" element={<div>404 Not Found</div>} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


//레이아웃 확인용 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";

// 기본 페이지
import HomePage from "./components/Home/HomePage";
import CalendarPage from "./components/Calendar/CalendarPage";
import CalendarRegist from './components/Calendar/CalendarRegist';


// 업무
import WorkPage from "./components/Work/WorkPage";
import MyWorkPage from "./components/Work/MyWorkPage";
import RequestedWorkPage from "./components/Work/RequestedWorkPage";

// 전자결재
import ApprovalPage from "./components/Approval/ApprovalPage";
import ReferenceApprovalPage from "./components/Approval/ReferenceApprovalPage";
import DraftApprovalPage from "./components/Approval/DraftApprovalPage";
import TempApprovalPage from "./components/Approval/TempApprovalPage";
import CompleteApprovalPage from "./components/Approval/CompleteApprovalPage";


 import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
   * {
     margin: 0;
     padding: 0;
    box-sizing: border-box;
    font-family: Poppins;
   }
   a {
     text-decoration: none;
     color: inherit;
   }
 `

function App() {

 

  return (
    
    <Router>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          {/* 홈 */}
          <Route path="/" element={<HomePage />} />

          {/* 일정 */}
          <Route path="/calendarPage" element={<CalendarPage />} />
          <Route path="/calendar/CalendarRegist" element={<CalendarRegist />} />


          {/* 업무 */}
          <Route path="/workPage" element={<WorkPage />} />
          <Route path="/work/myworklist" element={<MyWorkPage />} />
          <Route path="/work/reqlist" element={<RequestedWorkPage />} />

          {/* 전자결재 */}
         <Route path="/approvalPage" element={<ApprovalPage />} />
<Route path="/approval/viewerList" element={<ReferenceApprovalPage />} />
<Route path="/approval/draftList" element={<DraftApprovalPage />} />
<Route path="/approval/tempList" element={<TempApprovalPage />} />
<Route path="/approval/approvalList" element={<CompleteApprovalPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;




// 배지 + 카드 
// import React from "react";
// import StatusBadge from "./components/Common/StatusBadge";
// import StatusCard from "./components/Common/StatusCard";

// function App() {
//   return (
//     <div style={{ maxWidth: "800px", margin: "20px auto" }}>
//       <h2>공통 컴포넌트 테스트</h2>

//       {/* 🔹 StatusBadge 테스트 */}
//       <h3>상태 배지</h3>
//       <p>
//         전자결재: <StatusBadge status="기안" /> <StatusBadge status="대기" />{" "}
//         <StatusBadge status="반려" /> <StatusBadge status="완료" />
//       </p>
//       <p>
//         업무: <StatusBadge status="보류" /> <StatusBadge status="긴급" />
//       </p>
//       <p>
//         일정: <StatusBadge status="진행중" /> <StatusBadge status="종료" />
//       </p>

//       {/* 🔹 StatusCard 테스트 */}
//       <h3 style={{ marginTop: "30px" }}>상태 요약 카드</h3>
//       <div style={{ display: "flex", gap: "10px" }}>
//         <StatusCard status="대기" count={3} />
//         <StatusCard status="진행" count={5} />
//         <StatusCard status="완료" count={2} />
//       </div>
//     </div>
//   );
// }

// export default App;








// import React from "react";
// import { Button } from "./components/Common/Button";

// function App() {
//   return (
//     <div style={{ padding: "20px", maxWidth: "300px" }}>
//       <Button label="저장하기" variant="primary" onClick={() => alert("저장")} />
//       <Button label="취소" variant="secondary" onClick={() => alert("취소")} />
//       <Button label="삭제" variant="danger" onClick={() => alert("삭제")} />
//       <Button label="비활성화" variant="primary" disabled />
//     </div>
//   );
// }

// export default App;


// 모달창 테스트 
// import React from "react";
// import Layout from "./components/Common/Layout";
// import ModalWrapper from "./components/Common/ModalWrapper";
// import useModalStore from "./store/modalStore";

// function App() {
//   const { openModal } = useModalStore();

//   return (
//     <>
//       <Layout>
//         <h2>메인 컨텐츠</h2>
//         <button
//           onClick={() =>
//             openModal(
//               <div>
//                 <h3>모달 테스트 </h3>
//                 <p>이건 미리보기를 위한 내용입니다.</p>
//               </div>
//             )
//           }
//         >
//           모달 열기
//         </button>
//       </Layout>
//       <ModalWrapper />
//     </>
//   );
// }

// export default App;


// 조직도
// import OrgTree from "./components/common/OrgTree";

// function App() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <OrgTree />
//     </div>
//   );
// }

// export default App;



// 상태카드
// import React from "react";
// import WorkSection from "./components/Work/WorkSection"; 

// function App() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>공통 컴포넌트 테스트</h2>
//       <WorkSection />
//     </div>
//   );
// }

// export default App;


// 상태배지
// import React from "react";
// import StatusBadge from "./components/common/StatusBadge";

// function App() {
//   const statuses = ["대기", "보류", "긴급", "반려", "임시"];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>상태 배지 테스트</h2>
//       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//         {statuses.map((status, idx) => (
//           <StatusBadge key={idx} label={status} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


// 드롭다운입력창
// import React, { useState } from "react";
// import SelectBox from "./components/common/SelectBox";

// function App() {
//   const [requester, setRequester] = useState("");
//   const [manager, setManager] = useState("");

//   const employeeOptions = [
//     { value: "kim", label: "김민준" },
//     { value: "park", label: "박지훈" },
//     { value: "lee", label: "이서준" },
//   ];

//   return (
//     <div style={{ padding: "20px", maxWidth: "300px" }}>
//       <h2>드롭다운 테스트</h2>

//       <SelectBox
//         label="요청자"
//         options={employeeOptions}
//         value={requester}
//         onChange={(e) => setRequester(e.target.value)}
//         placeholder="요청자를 선택하세요"
//       />

//       <SelectBox
//         label="담당자"
//         options={employeeOptions}
//         value={manager}
//         onChange={(e) => setManager(e.target.value)}
//         placeholder="담당자를 선택하세요"
//       />

     
//     </div>
//   );
// }

// export default App;


// 


// //일반모달창 똑같은겨
// import React, { useState } from "react";
// import ConfirmModal from "./components/common/ConfirmModal";

// function App() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Confirm Modal 테스트</h2>
//       <button onClick={() => setOpen(true)}>삭제하기</button>

//       <ConfirmModal
//         isOpen={open}
//         title="삭제 확인"
//         message="정말 이 항목을 삭제하시겠습니까?"
//         onConfirm={() => {
//           alert("삭제되었습니다.");
//           setOpen(false);
//         }}
//         onCancel={() => setOpen(false)}
//       />
//     </div>
//   );
// }

// export default App;



// //바닥시트모달
// import React, { useState } from "react";
// import BottomSheetModal from "./components/common/BottomSheetModal";

// function App() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>BottomSheet Modal 테스트</h2>
//       <button onClick={() => setOpen(true)}>삭제하기</button>

//       <BottomSheetModal
//         isOpen={open}
//         title="삭제 확인"
//         message="정말 이 항목을 삭제하시겠습니까?"
//         onConfirm={() => {
//           alert("삭제되었습니다.");
//           setOpen(false);
//         }}
//         onCancel={() => setOpen(false)}
//       />
//     </div>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import Toast from "./components/common/Toast";

// function App() {
//   const [toastOpen, setToastOpen] = useState(false);

//   const showToast = () => {
//     setToastOpen(true);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Toast 테스트</h2>
//       <button onClick={showToast}>토스트 띄우기</button>

//       <Toast
//         message="저장되었습니다."
//         isOpen={toastOpen}
//         duration={2000} // 2초 후 자동 닫힘
//         onClose={() => setToastOpen(false)}
//       />
//     </div>
//   );
// }

// export default App;



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //