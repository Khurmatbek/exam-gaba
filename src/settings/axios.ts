import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";



const BASE_URL = import.meta.env.VITE_API_BASE_URL ;


if (!BASE_URL) {
  throw new Error("[apiClient] VITE_API_BASE_URL is not defined in .env");
}

// ─── Token helpers ────────────────────────────────────────────────────────────

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenService = {
  getAccessToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),

  setTokens: (access: string, refresh: string): void => {
    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },

  clearTokens: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

// ─── Axios instance ───────────────────────────────────────────────────────────

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // cookie asosli auth bo'lsa true
});

// ─── Request interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─── Refresh token logic ──────────────────────────────────────────────────────

// 401 kelganda bir marta refresh qilib qayta urinish
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

const redirectToLogin = (): void => {
  tokenService.clearTokens();
  // React Router ishlatilsa: window.location.href o'rniga navigate('/login')
  window.location.href = "/login";
};

// ─── Response interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = tokenService.getRefreshToken();

      if (!refreshToken) {
        redirectToLogin();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
          expiresInMins: 30,
        });

        const newAccessToken: string = data.accessToken;
        const newRefreshToken: string = data.refreshToken ?? refreshToken;

        tokenService.setTokens(newAccessToken, newRefreshToken);
        apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }


    if (error.response?.status === 403) {
      console.warn("[apiClient] 403 Forbidden:", originalRequest.url);
    }


    if (error.response?.status === 404) {
      console.warn("[apiClient] 404 Not Found:", originalRequest.url);
    }


    if (error.response?.status === 422) {
      console.warn("[apiClient] 422 Validation Error:", error.response.data);
    }


    if (error.response && error.response.status >= 500) {
      console.error("[apiClient] Server Error:", error.response.status);
    }


    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        console.error("[apiClient] Request timeout");
      } else {
        console.error("[apiClient] Network error — no response received");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
