import axios from "./customizeAxios";

const fetchAllUsers = (page) => {
  return axios.get(`/users?page=${page}`);
};

const postUsers = (data) => {
  return axios.post(`/users`, data);
};

const editUser = (data) => {
  return axios.put(`users/2`, data);
};
export { fetchAllUsers, postUsers, editUser };
