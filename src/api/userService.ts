import { defaultClient } from "./client";
import type { LoginCredentials, RegisterCredentials } from "@/types/user";

export const register = async (credentials: RegisterCredentials) =>
  defaultClient.post("/register", {
    user: {
      email: credentials.email,
      password: credentials.password,
      date_of_birth: "1990-01-01",
    },
  });

export const login = async (credentials: LoginCredentials) =>
  defaultClient.post("/login", {
    user: {
      email: credentials.email,
      password: credentials.password,
    },
  });

export const logout = async () => {
  await defaultClient.delete("/logout");
};

export const getUser = async () => defaultClient.get("/user");
