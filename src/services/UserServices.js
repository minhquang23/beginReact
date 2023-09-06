import axios from "./customizeAxios";
import { default as axiosLogin } from "./customizeAxiosLogin";

const fetchAllUsers = (page) => {
  return axios.get(`/posts?_page=${page}`);
};

const postUsers = (data) => {
  return axios.post(`/posts`, data);
};

const editUser = (id, data) => {
  return axios.put(`/posts/${id}`, data);
};

const deleteUser = (id) => {
  return axios.delete(`/posts/${id}`);
};

const searchUsers = (keyword) => {
  return axios.get(`/posts?q=${keyword}`);
};

const loginApi = (account) => {
  return axiosLogin.post("/api/login", account);
};
export {
  fetchAllUsers,
  postUsers,
  editUser,
  deleteUser,
  searchUsers,
  loginApi,
};
