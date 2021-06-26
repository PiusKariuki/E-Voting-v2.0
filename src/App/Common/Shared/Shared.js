import Axios from "axios";

export const baseUrl = "https://votingapi.zoopio.co.ke/api/v1/";

 export const axios = Axios.create({
  baseURL: baseUrl,
})


