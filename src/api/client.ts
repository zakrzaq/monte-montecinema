import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

export const defaultClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});

defaultClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const userStore = useUserStore();
      const router = useRouter();
      await userStore.logout();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export const setAuthHeader = (authHeader) => {
  defaultClient.defaults.headers.common["Authorization"] = authHeader;
};

export const removeAuthHeader = () => {
  delete defaultClient.defaults.headers.common["Authorization"];
};
