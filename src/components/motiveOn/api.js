import axios from "axios";

export function getnoticemain() {
  return axios.get('/api/notice/main');
}
export function getCalendarList() {
  const loginUser = JSON.parse(sessionStorage.getItem("user-storage"));
  const eno = loginUser?.state?.user?.eno;

  return axios.get(`/api/calendar/list?Eno=${eno}`);
}

//  일정 등록
export function registCalendar(calendar) {
  const loginUser = JSON.parse(sessionStorage.getItem("user-storage"));
  const eno = loginUser?.state?.user?.eno;
  return axios.post(`/api/calendar/regist?Eno=${eno}`, calendar);
}

// 일정 수정
export function modifyCalendar(calendar) {
  const loginUser = JSON.parse(sessionStorage.getItem("user-storage"));
  const eno = loginUser?.state?.user?.eno;

  return axios.post(`/api/calendar/modify?Eno=${eno}`, calendar);
}


// 일정 삭제

export function deleteCalendar(ccode) {
  const loginUser = JSON.parse(sessionStorage.getItem("user-storage"));
  const eno = loginUser?.state?.user?.eno;

  return axios.post("/api/calendar/delete", { ccode, eno });
}


// ---------------------------------------------------------------------------//

function getEno() {
  const loginUser = JSON.parse(sessionStorage.getItem("user-storage"));
  return loginUser?.state?.user?.eno;   // ✅ eno만 반환
}

// 요청한 업무 리스트
export function getRequestedWork() {
  const eno = getEno();
  return axios.get(`/api/work/toReqList?Eno=${eno}`);
}

// 내가 담당자인 업무 리스트
export function getMyWorkList() {
  const eno = getEno();
  return axios.get(`/api/work/myWorkList?eno=${eno}`);
}

// 부서 업무 리스트
export function getDepWorkList(dno) {
  return axios.get(`/api/work/depWorkList?dno=${dno}`);
}

// 업무 상세 조회
export function getWorkDetail(wcode) {
  return axios.get(`/api/work/detail?wcode=${wcode}`);
}

// 업무 등록
export function registWork(workData, ownerEno) {
  const eno = getEno(); // 로그인 사용자 eno
  const query = ownerEno ? `&ownerEno=${ownerEno}` : "";
  return axios.post(`/api/work/regist?requesterEno=${eno}${query}`, workData);
}


// 업무 상태 변경
export function updateWorkStatus(wcode, status) {
  return axios.post(`/api/work/updateStatus?wcode=${wcode}&status=${status}`);
}

// 승인
export function approveWork(wcode) {
  const eno = getEno();
  return axios.post(`/api/work/approve?wcode=${wcode}&eno=${eno}`);
}

// 반려
export function rejectWork(wcode, reason) {
  const eno = getEno();
  return axios.post(`/api/work/reject?wcode=${wcode}&reason=${reason}&eno=${eno}`);
}

// 이의 제기
export function objectionWork(wcode, reason) {
  return axios.post(`/api/work/objection?wcode=${wcode}&reason=${reason}`);
}

// 삭제
export function deleteWork(wcode) {
  return axios.post(`/api/work/delete?wcode=${wcode}`);
}

// 협업 요청
export function requestCollab(wcode, enos) {
  const eno = getEno();
  return axios.post(`/api/work/requestCollab?wcode=${wcode}&requesterEno=${eno}`, null, {
    params: { enos },
  });
}

// 대리 요청
export function requestDelegate(wcode, delegateEno) {
  const eno = getEno();
  return axios.post(`/api/work/requestDelegate?wcode=${wcode}&eno=${delegateEno}&requesterEno=${eno}`);
}




// ---------------------------------------------------------------------------------------------//


export const getApprovalViewerList = (eno) => {
  return axios.get(`/api/approval/viewerList?eno=${eno}`);
};