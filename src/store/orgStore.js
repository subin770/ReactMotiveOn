import { create } from "zustand";
import axios from "axios";

const useOrgStore = create((set) => ({
  orgData: [], // ✅ 더미 제거하고 API 응답으로 채우도록 변경

  fetchOrgData: async () => {
    try {
      const res = await axios.get("/api/org/tree"); 
      set({ orgData: res.data });  // ✅ API 결과를 orgData에 저장
    } catch (err) {
      console.error("조직도 데이터 불러오기 실패:", err);
    }
  },
}));

export default useOrgStore;
