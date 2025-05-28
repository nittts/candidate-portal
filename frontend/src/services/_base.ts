import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// Includes token on every API call when available and set timeout for a minute
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("@CandidatePortal:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      config.timeout = 60000;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Set token and user role when applicables
instance.interceptors.response.use(
  (response) => {
    const { token } = response.data;

    if (token) {
      sessionStorage.setItem("@CandidatePortal:token", token);
    }

    return response;
  },
  (error) => {
    if (error?.response.status === 401) {
      sessionStorage.removeItem("@CandidatePortal:token");
      sessionStorage.removeItem("@CandidatePortal:user");

      window.location.href = "/";
    }

    if (error?.response.status === 403) {
      window.location.pathname = "/";
    }

    return Promise.reject(error);
  }
);

export default instance;
