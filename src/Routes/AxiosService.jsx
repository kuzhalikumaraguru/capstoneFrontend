import axios from "axios";
import { toast } from "react-toastify";

const AxiosService = axios.create({
  baseURL: "https://capstonebackend-1ast.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosService.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (config.authenticate && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
AxiosService.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response.status, error.response.data.message);
    if (error.response.status == 402) {
      handleNavigation(error.response.data.message);
    }
    return Promise.reject(error);
  }
);
const handleNavigation = (message) => {
  if (message === "Session Expired") {
    toast.error(message);
    sessionStorage.removeItem("token");
    window.location.href = "/";
  } else {
    window.location.href = "/402";
  }
};
export default AxiosService;
