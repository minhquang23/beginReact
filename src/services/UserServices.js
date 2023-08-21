import axios from "./customizeAxios";

const fetchAllUsers = (page) => {
  return axios.get(`/users?page=${page}`);
};

const postUsers = (data) => {
  return axios.post(`/users`, data);
};
export { fetchAllUsers, postUsers };
