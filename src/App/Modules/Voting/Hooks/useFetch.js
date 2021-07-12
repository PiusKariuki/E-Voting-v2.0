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

/*
 * custom fetch hook to get active election details
 */
const useFetch = () => {
  const [election, setElection] = useState("");
  const [btns, setBtns] = useState([]);
  const [load, setLoad] = useState(false);
  const text = "loading election, please wait......";
  /* ............fetch election fn...............*/
  const fetchElection = (tkn) => {
    interceptor(tkn);
    setLoad(true);
    axios
      .get("election/voter/elections/get-active")
      .then((res) => {
        setElection(res.data.data)
        setLoad(false);
        if (res.data.data.ongoing && res.data.data.active) setBtns(["view", "vote"]);
        else if (!res.data.data.ongoing && res.data.data.active)
          setBtns(["view", "apply candidacy"])

      })
      .catch((err) => {
        swal(err?.response?.data?.message, '', 'error');
        setLoad(false);
      });
  };
  /*..................fetch election end............*/

  /*...................... button creator fn ...............*/


  return [election, fetchElection, load, text, btns];

}
export default useFetch;