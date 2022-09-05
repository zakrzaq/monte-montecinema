export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  date_of_birth: string;
}

export interface User {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  date_of_birth: string;
}
