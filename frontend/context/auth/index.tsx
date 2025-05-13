'use client';
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { AuthProviderProps, User } from './types';
import { createAxiosInstance } from './utils';
import { useAuth, useRole } from './hooks';

interface AuthContextType {
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

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true });
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
    return createAxiosInstance(
      process.env.NEXT_PUBLIC_BACKEND_URL || '',
      accessToken,
      refreshToken,
      (newToken) => setAccessToken(newToken),
      logout
    );
  }, [accessToken, refreshToken, logout]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get("/api/auth/is-authenticated");
      setUser(response.data?.user || null);
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
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        setAccessToken(res.data.accessToken);
        setUser(res.data.user || null);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setAccessToken(null);
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