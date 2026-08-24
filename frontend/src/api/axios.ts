import axios from "axios";

import { useAuthStore } from "@/features/auth/store/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ----------------------------------------
   Request Interceptor
---------------------------------------- */

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

/* ----------------------------------------
   Response Interceptor
---------------------------------------- */

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      const { logout } =
        useAuthStore.getState();

      logout();

      window.location.href = "/login";
    }

    if (status === 403) {
      const message =
        error?.response?.data?.message ??
        "You do not have permission to perform this action.";

      console.warn(
        "Forbidden:",
        message
      );
    }

    return Promise.reject(error);
  }
);

export default api;