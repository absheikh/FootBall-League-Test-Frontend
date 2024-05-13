import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const authEndpoints = ["/login"];

axiosClient.interceptors.request.use((config) => {
  if (authEndpoints.some((endpoint) => config.url.includes(endpoint))) {
    return config;
  }
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : undefined;
  return config;
});

const AxiosInterceptor = () => {
  const dispatch = useDispatch();

  const handleUnauthorized = () => {
    dispatch(logout());
  };

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      }
      return Promise.reject(error);
    }
  );

  return null; // or you can return a component here if needed
};

export { axiosClient, AxiosInterceptor };
