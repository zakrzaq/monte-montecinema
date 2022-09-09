import { defaultClient } from "./client";
import type {
  LoginCredentials,
  RegisterCredentials,
  PatchCredentials,
} from "@/types/user";

export const register = async (credentials: RegisterCredentials) =>
  defaultClient.post("/register", {
    user: {
      email: credentials.email,
      password: credentials.password,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      date_of_birth: credentials.date_of_birth,
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

export const getUser = async () => await defaultClient.get("/user");

export const patchUser = async (credentials: PatchCredentials) => {
  defaultClient.patch("/user", {
    user: {
      email: credentials.email,
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      date_of_birth: credentials.date_of_birth,
      password: credentials.password,
      current_password: credentials.current_password,
    },
  });
};
