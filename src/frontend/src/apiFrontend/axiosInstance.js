import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL:'http://localhost:3002/api/v1', // base url for each backend req
//     withCredentials : true // with this make sure that access and refresh token sent with each req
// })

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3004/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("user/refreshToken");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
