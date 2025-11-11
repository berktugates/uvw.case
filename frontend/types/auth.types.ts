export type UserRole = 'ADMIN' | 'STOREKEEPER' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface RegisterData {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

