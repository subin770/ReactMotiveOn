import axios from "axios";

export function getnoticemain() {
  return axios.get('/api/notice/main');
}
export function getCalendarList() {
  const loginUser = JSON.parse(sessionStorage.getItem("user-storage"));
  const eno = loginUser?.state?.user?.eno;

  return axios.get(`/api/calendar/list?Eno=${eno}`);
}

// ✅ 일정 등록
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


// ✅ 일정 삭제
// api.js
export function deleteCalendar(ccode) {
  const loginUser = JSON.parse(sessionStorage.getItem("user-storage"));
  const eno = loginUser?.state?.user?.eno;

  return axios.post("/api/calendar/delete", { ccode, eno });
}
