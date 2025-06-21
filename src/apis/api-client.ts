import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const createApiClient = (role: "doctor" | "patient"): AxiosInstance => {
  const instance = axios.create({
    baseURL: "https://tabeebak-backend-swsx.vercel.app/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "https://tabeebak-frontend.vercel.app", // إضافة يدوية للاختبار
    },
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(`${role}-token`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const patientApiClient = createApiClient("patient");
export const doctorApiClient = createApiClient("doctor");
