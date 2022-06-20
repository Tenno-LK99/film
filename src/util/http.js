// axios封装
// 方法一
import axios from "axios";
import { Toast } from "vant";
// function httpForList() {
//   return axios({
//     url: "https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=6754165",
//     headers: {
//       "X-Client-Info":
//         '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653915101551933362307073"}',
//       "X-host": "mall.film-ticket.film.list",
//     },
//   });
// }

// function httpForDetail() {
//     return axios({
//       url: "https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=6754165",
//       headers: {
//         "X-Client-Info":
//           '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653915101551933362307073"}',
//         "X-host": "mall.film-ticket.film.list",
//       },
//     });
//   }

// export default {
//   httpForDetail,
//   httpForList,
// };

// 方法二：axios自己的方式
const http = axios.create({
  baseURL: "https://m.maizuo.com",
  timeout: 10000,
  headers: {
    "X-Client-Info":
      '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653915101551933362307073"}',
  },
});

// 在发请求之前拦截 --showLoading
// 在所有用到http的都使用到Loading
http.interceptors.request.use(
  function (config) {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 成功后响应前拦截 --hideLoading
http.interceptors.response.use(
  function (response) {
    Toast.clear();
    return {
      ...response,
      aaa: "k",
    };
  },
  function (error) {
    Toast.clear();
    return Promise.reject(error);
  }
);

export default http;
