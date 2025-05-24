'use client';
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AuthProviderProps, User } from './types';
import { useAuth, useRole } from './hooks';
import { AuthContextType } from './types';
// interface AuthContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   accessToken: string | null;
//   isAuthenticated: boolean;
//   authCookie: string | undefined;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   useAuth: () => AuthContextType;
//   axiosInstance: AxiosInstance;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   useRole: () => 'normal' | 'club' | 'admin' | null;
// }

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = useCallback(async () => {
    try {
      const tempAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
        withCredentials: true
      });
      await tempAxios.post(`/api/auth/logout`, {}, { withCredentials: true });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
    }
  }, []);

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
      withCredentials: true,
      timeout: 10000 // 10 seconds
    });

    // Add access token to requests
    instance.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Handle 401s and token refresh
    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          !originalRequest._retry &&
          originalRequest.url !== '/api/auth/refresh'
        ) {
          originalRequest._retry = true;
          try {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
              {},
              { withCredentials: true }
            );

            const { idToken, refreshToken: newRefreshToken, user: userData } = res.data;

            setAccessToken(idToken);
            setRefreshToken(newRefreshToken);
            setUser(userData || null);
            setIsAuthenticated(true);

            originalRequest.headers.Authorization = `Bearer ${idToken}`;
            return instance(originalRequest);
          } catch (err) {
            const axiosError = err as AxiosError;

            if (axiosError.response?.status === 401) {
              // User just isn't logged in — no action needed
              console.warn("Not logged in — skipping refresh and logout.");
              return Promise.reject(err);
            }
            await logout();
            return Promise.reject(err);
          }
        }
        
        return Promise.reject(error);
      }
    );

    return instance;
  }, [accessToken, logout]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get("/api/auth/is-authenticated");
      setUser(response.data.user || null);
    }
    if (isAuthenticated) {
      fetchUser();
    }
  }, [axiosInstance, isAuthenticated]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await axiosInstance.post('/api/auth/signin', { email, password });
    const { idToken, refreshToken, user } = response.data;

    setAccessToken(idToken);
    setRefreshToken(refreshToken);
    setUser(user);
    setIsAuthenticated(true);
  }, [axiosInstance]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axiosInstance.post(
          `/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const { idToken, refreshToken: newRefreshToken, user: userData } = res.data;

        setAccessToken(idToken);
        setRefreshToken(newRefreshToken);
        setUser(userData || null);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const authCookie = Cookies.get('loginToken');

  const value = useMemo(() => ({
    user,
    setUser,
    accessToken,
    isAuthenticated,
    authCookie,
    login,
    logout,
    useAuth,
    axiosInstance,
    setIsAuthenticated,
    useRole,
  }), [user, setUser, accessToken, isAuthenticated, setIsAuthenticated, authCookie, login, logout, axiosInstance]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}