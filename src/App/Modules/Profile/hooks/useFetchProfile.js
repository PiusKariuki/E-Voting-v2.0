import { useEffect, useState } from "react";
import Axios from "axios";
import { baseUrl } from "../../../Common/Shared/Shared";
import swal from "sweetalert";

const axios = Axios.create({
  baseURL: baseUrl,
});

// request interceptor
const interceptor = (token) => {
  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

const useFetchProfile = () => {
  const [user, setUser] = useState("");
  const [load, setLoad] = useState(false);
  const text = "Fetching profile data, please wait......";

  
  const fetchProfile = (tkn) => {
    interceptor(tkn);
    setLoad(true);
    axios
      .get("/voter/me")
      .then((res) => {
        setUser(res.data.data)
        setLoad(false);
      })
      .catch((err) => {
        swal(err?.response?.data?.message, '', 'error');
        setLoad(false);
      });
  };



  return [user, fetchProfile,load, text];

}
export default useFetchProfile;
