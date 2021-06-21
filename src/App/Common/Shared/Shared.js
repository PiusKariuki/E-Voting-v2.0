import Axios from "axios";

export const baseUrl = "https://votingapi.zoopio.co.ke/api/v1/";

const axios = Axios.create({
  baseURL: baseUrl,
})

// // request interceptor
// export const useInterceptor = () => {
//   const interceptor = (token) => {
//     axios.interceptors.request.use(function (config) {
//       config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     });
//   };

//   return [interceptor];
// };


// export const interceptor = (token) => {
//   axios.interceptors.request.use(function (config) {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
// };

