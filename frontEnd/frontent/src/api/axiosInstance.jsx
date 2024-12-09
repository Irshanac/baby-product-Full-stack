import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Access token expired. Attempting to refresh the token...");
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        // Request a new access token
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
          { token: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        // Store the new access token and retry the original request
        localStorage.setItem("accessToken", data.accessToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(error.config); // Retry the failed request
      } catch (refreshError) {
        console.error("Failed to refresh token. Please log in again.");
        localStorage.clear(); // Clear tokens on failure
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
