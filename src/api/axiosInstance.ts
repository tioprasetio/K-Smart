// src/axiosInstance.ts
import axios, {
  AxiosResponse,
  AxiosError,
//   InternalAxiosRequestConfig,
} from "axios";
// import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/${
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  }/databases/(default)/documents`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to attach Firebase Auth Token
// api.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       const token = await user.getIdToken();
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error("Firestore API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
