import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in/",
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let res = {};
    if (error.response) {
      // Request đã được tạo ra và server đã hồi đáp với một mã trạng thái
      // nằm ra ngoài tầm 2xx
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      // Request đã được tạo ra nhưng không nhận được hồi đáp nào
      // Trong trình duyệt, `error.request` là instance của XMLHttpRequest
      // còn trong node.js thì nó là instance của http.ClientRequest
      console.log("RQ error", error.request);
    } else {
      // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
      console.log("Lỗi1", error.message);
    }
    console.log("Lỗi2", error.config);
    return res;
    // return Promise.reject(error);
  }
);

export default instance;
