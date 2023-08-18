import axios from "./customizeAxios";

const fetchAllUsers = () => {
  return axios.get("/users?page=1");
};

export { fetchAllUsers };
