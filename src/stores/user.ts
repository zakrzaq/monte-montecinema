import { defineStore } from "pinia";

import { login, register, logout } from "@/api/userService";
import { removeAuthHeader, setAuthHeader } from "@/api/client";
import type { User, LoginCredentials, RegisterCredentials } from "@/types/user";

const TOKEN_STORAGE_KEY = "AUTH";
const USER_STORAGE_KEY = "USER";

interface RootState {
  user: User | null;
  authToken: string | null;
}

export const useUserStore = defineStore("userStore", {
  state: () => {
    return {
      user: null,
      authToken: null,
    } as RootState;
  },
  getters: {
    isLoggedIn: (state) => !!state.authToken,
  },
  actions: {
    setUserData({ authToken, user }: { authToken: string; user: User }) {
      this.authToken = authToken;
      this.user = user;
      localStorage.setItem(TOKEN_STORAGE_KEY, authToken);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    },
    resetUserData() {
      this.authToken = null;
      this.user = null;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    },
    restoreUserData() {
      try {
        const authToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        const user: User = JSON.parse(
          localStorage.getItem(USER_STORAGE_KEY) || ""
        );
        if (authToken && user) {
          setAuthHeader(`Bearer ${authToken}`);
          this.setUserData({ authToken, user });
        }
      } catch (error) {
        console.error(error);
        this.resetUserData();
      }
    },
    async login(credentials: LoginCredentials) {
      if (this.isLoggedIn) await logout();
      const response = await login(credentials);
      const authHeader = response.headers.authorization;
      const authToken = authHeader.slice("Bearer ".length);
      console.log(authToken);
      setAuthHeader(authHeader);
      this.setUserData({ authToken, user: response.data });
    },
    async register(credentials: RegisterCredentials) {
      if (this.isLoggedIn) await logout();
      const response = await register(credentials);
      const authHeader = response.headers.authorization;
      const authToken = authHeader.slice("Bearer ".length);
      setAuthHeader(authHeader);
      this.setUserData({ authToken, user: response.data });
    },
    async logout() {
      if (!this.isLoggedIn) return;
      this.resetUserData();
      removeAuthHeader();
    },
  },
});
