import { defineStore } from "pinia";
import router from "./../router";
import { notify } from "@kyvg/vue3-notification";
import { login, register, logout, getUser } from "@/api/userService";
import { removeAuthHeader, setAuthHeader } from "@/api/client";
import type { User, LoginCredentials, RegisterCredentials } from "@/types/user";
import type { AxiosResponse } from "axios";

export const userModel = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  date_of_birth: "",
};

interface RootState {
  user: User;
  authToken: string | null;
  fromPath: string | symbol;
  deskNumber: string;
}

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: { ...userModel },
      authToken: null,
      fromPath: "",
      deskNumber: '',
    } as RootState;
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
    isEmployee: (state) => state.user.role === "employee",
    selectedDesk: (state) => {
      return state.user.role === 'employee' ? state.deskNumber : ''
    }
  },
  actions: {
    setUserData({ authToken, user }: { authToken: string; user: User }) {
      this.authToken = authToken;
      this.user = user;
    },
    resetUserData() {
      this.authToken = null;
      this.user = { ...userModel };
    },
    async callLogout() {
      if (this.isLoggedIn) await logout();
    },
    processResponse(response: AxiosResponse) {
      const authHeader = response.headers.authorization;
      const authToken = authHeader.slice("Bearer ".length);
      setAuthHeader(authHeader);
      this.setUserData({ authToken, user: response.data });
    },
    async login(credentials: LoginCredentials) {
      this.callLogout();
      try {
        const response = await login(credentials);
        this.processResponse(response);
      } catch (err) {
        console.error(err);
        notify({ type: "error", text: "Unable to login" });
      } finally {
        if (this.isLoggedIn) {
          this.isEmployee
            ? router.push({ name: "EmployeePage" })
            : router.push({ name: "HomePage" });
        }
      }
    },
    async register(credentials: RegisterCredentials) {
      this.callLogout();
      try {
        const response = await register(credentials);
        this.processResponse(response);
        router.push({ name: "UserPage" });
      } catch (err) {
        console.error(err);
      }
    },
    async getUser() {
      try {
        const response = await getUser();
        this.processResponse(response);
      } catch (err) {
        console.error(err);
      }
    },
    async logout() {
      try {
        this.callLogout();
        this.resetUserData();
        removeAuthHeader();
      } catch (err) {
        console.error(err);
      }
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
