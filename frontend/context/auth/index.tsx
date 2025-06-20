'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AuthProviderProps, User, AuthContextType } from './types';
import { useAuth, useRole } from './hooks';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const authCookie = Cookies.get('loginToken');

  // ✅ logout function (not memoized to avoid stale closure)
  const logout = async () => {
    try {
      console.log("Logging out...");
      const tempAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
        withCredentials: true,
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
  };

  // ✅ Axios instance configured to respect latest tokens
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || '',
      withCredentials: true,
      timeout: 8000,
    });

    instance.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

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

            const {
              idToken,
              refreshToken: newRefreshToken,
              user: userData,
            } = res.data;

            setAccessToken(idToken);
            setRefreshToken(newRefreshToken);
            setUser(userData || null);
            setIsAuthenticated(true);

            originalRequest.headers.Authorization = `Bearer ${idToken}`;
            return instance(originalRequest);
          } catch (err) {
            const axiosError = err as AxiosError;
            if (axiosError.response?.status === 401) {
              console.warn('Not logged in — skipping refresh and logout.');
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
  }, [accessToken]);

  // ✅ login using the memoized axios instance
  const login = useCallback(
    async (email: string, password: string) => {
      const response = await axiosInstance.post('/api/auth/signin', {
        email,
        password,
      });

      const { idToken, refreshToken, user } = response.data;

      setAccessToken(idToken);
      setRefreshToken(refreshToken);
      setUser(user);
      setIsAuthenticated(true);
    },
    [axiosInstance]
  );

  // ✅ Init auth on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await axiosInstance.post(
          `/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const {
          idToken,
          refreshToken: newRefreshToken,
          user: userData,
        } = res.data;

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
  }, [axiosInstance]);

  // ✅ Fetch user if already authenticated
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get('/api/auth/is-authenticated');
      setUser(response.data.user || null);
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [axiosInstance, isAuthenticated]);

  // ✅ Clean context value — no `useMemo` here; all values are stable
  const value: AuthContextType = {
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
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
