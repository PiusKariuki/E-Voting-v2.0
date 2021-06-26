import Axios from "axios";
import { baseUrl, axios } from "../../../Common/Shared/Shared";



const useInterceptor = () => {
  const interceptor = (tkn) => {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${tkn}`;
      return config;
    });
  }
  return [interceptor];
};

export default useInterceptor;