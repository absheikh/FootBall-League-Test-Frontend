import { axiosClient } from "../../../config/axios";

const login = async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  return res.data;
};

const authService = {
  login,
};

export default authService;
