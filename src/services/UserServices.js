import axios from "./customizeAxios";

const fetchAllUsers = (page) => {
  return axios.get(`/users?page=${page}`);
};

export { fetchAllUsers };
