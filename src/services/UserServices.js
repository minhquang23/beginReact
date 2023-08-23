import axios from "./customizeAxios";

// const fetchAllUsers = (params) => {
//   return axios.get(`/posts`, { params });
// };
const fetchAllUsers = (page) => {
  return axios.get(`/posts?_page=${page}`);
};

const postUsers = (data) => {
  return axios.post(`/posts`, data);
};

const editUser = (data) => {
  return axios.put(`/posts/1`, data);
};

const deleteUser = () => {
  return axios.delete(`/posts/1`);
};
export { fetchAllUsers, postUsers, editUser, deleteUser };
