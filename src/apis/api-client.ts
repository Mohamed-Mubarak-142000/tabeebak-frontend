import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const createApiClient = (role: "doctor" | "patient"): AxiosInstance => {
  const instance = axios.create({
    baseURL: "https://tabeebak-backend.vercel.app/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    timeout: 10000,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(`${role}-token`);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized access - please login again");
        // Handle token expiration or invalid token
        localStorage.removeItem(`${role}-token`);
        window.location.href = "/login"; // Redirect to login
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const patientApiClient = createApiClient("patient");
export const doctorApiClient = createApiClient("doctor");
