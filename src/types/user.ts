export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends User {
  privacy_policy?: boolean;
}

export interface PatchCredentials {
  email?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  password?: string;
  current_password?: string;
}

export interface User {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  date_of_birth: string;
  role?: string;
}
