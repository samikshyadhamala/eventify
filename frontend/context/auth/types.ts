import { AxiosInstance } from 'axios';

export interface User {
  id: string;
  email: string;
  role: 'normal' | 'club' | 'super_admin';
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  accessToken: string | null;
  isAuthenticated: boolean;
  authCookie: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  useAuth: () => AuthContextType;
  axiosInstance: AxiosInstance;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  useRole: () => 'normal' | 'club' | 'super_admin' | null;
}

export interface AuthProviderProps {
  children: React.ReactNode;
} 