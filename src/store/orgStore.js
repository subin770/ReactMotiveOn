import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ✅ 프록시 엔트리포인트
});

const useOrgStore = create((set) => ({
  orgData: [],

  fetchOrgData: async () => {
    try {
      const res = await api.get("/org/tree"); // ✅ 자동으로 /motiveOn/api/org/tree 로 변환
      set({ orgData: res.data.list || [] });
    } catch (err) {
      console.error("조직도 데이터 불러오기 실패:", err);
    }
  },
}));

export default useOrgStore;