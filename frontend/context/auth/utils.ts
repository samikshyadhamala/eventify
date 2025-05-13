import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const createAxiosInstance = (
  baseURL: string,
  accessToken: string | null,
  refreshToken: string | null,
  onTokenRefresh: (newToken: string) => void,
  onLogout: () => Promise<void>
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/api/auth/refresh' &&
        refreshToken
      ) {
        originalRequest._retry = true;
        try {
          const res = await axios.post(
            `${baseURL}/api/auth/refresh`,
            { refreshToken },
            { withCredentials: true }
          );
          onTokenRefresh(res.data.accessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          }
          return instance(originalRequest);
        } catch (err) {
          await onLogout();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}; 