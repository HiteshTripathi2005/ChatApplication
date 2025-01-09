import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapplication-siwt.onrender.com/api",
  withCredentials: true,
});
