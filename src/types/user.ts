export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends User {
  privacy_policy?: boolean;
}

export interface User {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  date_of_birth: string;
}
