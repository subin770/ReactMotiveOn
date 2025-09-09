import { useState } from 'react'
import { Button } from "./components/Common/Button";
import Layout from './components/Common/Layout';
import Sidebar from './components/Common/Sidebar';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Layout/>
   <Sidebar/>
    </>
  )
}

export default App;

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
