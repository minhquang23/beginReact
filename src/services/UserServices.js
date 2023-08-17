const FetchAllUsers = () => {
  return axios.get("https://reqres.in/api/users?page=1");
};

export { FetchAllUsers };
