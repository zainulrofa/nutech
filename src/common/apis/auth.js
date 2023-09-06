import axiosInstance from "./axios";

export const loginRequest = (data) => {
  return axiosInstance.post("/login", data);
};