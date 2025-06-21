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
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(`${role}-token`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add response interceptor to handle errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        console.error("Unauthorized access - please login again");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const patientApiClient = createApiClient("patient");
export const doctorApiClient = createApiClient("doctor");
