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

const editUser = (id, data) => {
  return axios.put(`/posts/${id}`, data);
};

const deleteUser = (id) => {
  return axios.delete(`/posts/${id}`);
};
export { fetchAllUsers, postUsers, editUser, deleteUser };
