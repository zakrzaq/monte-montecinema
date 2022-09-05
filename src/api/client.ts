import axios from "axios";
import router from "./../router";

import { useUserStore } from "@/stores/user";

export const defaultClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

defaultClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const userStore = useUserStore();
      await userStore.logout();
      router.push({ name: "HomePage" });
    }
    return Promise.reject(error);
  }
);

export const setAuthHeader = (authHeader: string) => {
  defaultClient.defaults.headers.common["Authorization"] = authHeader;
};

export const removeAuthHeader = () => {
  delete defaultClient.defaults.headers.common["Authorization"];
};
