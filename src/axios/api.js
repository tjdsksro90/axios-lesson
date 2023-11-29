import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1,
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    console.log("인터넵터 요청 성공!");
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (err) {
    console.log("인터넵터 요청 오류!");
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (config) {
    console.log("인터넵터 응답 성공!");
    return config;
  },

  // 오류 응답을 내보내기 전 수행되는 함수
  function (err) {
    console.log("인터넵터 응답 오류!");
    return Promise.reject(err);
  }
);

export default instance;
