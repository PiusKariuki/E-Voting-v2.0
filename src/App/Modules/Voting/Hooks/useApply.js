import React, { useState } from "react";
import { connect } from "react-redux";
import { axios } from "../../../Common/Shared/Shared";
import swal from "sweetalert";
import useInterceptor from "./useInterceptor";
import { useHistory, withRouter } from "react-router";



const useApply = () => {
  const txt = "Processing request. Please wait.........."
  const [load, setLoad] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  let history = useHistory();  
  let pathname = history.location.pathname;
  
  let id = pathname.split('/')
  let electionId = id[2];
  let postId = id[4];

  const [interceptor] = useInterceptor();

  const applyCandidacy = (tkn, picture, manifesto) => {
    setLoad(true);

    const newAspirant = new FormData();
    newAspirant.append("profile_picture", picture);
    newAspirant.append("manifesto", manifesto);
    newAspirant.append("election", electionId);
    newAspirant.append("post", postId);

    interceptor(tkn);
    axios.post('candidate/voter/candidates', newAspirant)
      .then(res => {
        swal("Candidate application successful", "", "success")
      }).catch(err => {
        setErrMsg(err.response.data.errors);
        setLoad(false)
        swal(err?.response?.data?.message, '', 'error')
      });

  }


  return [applyCandidacy, load, txt,errMsg,electionId];
}



export default useApply;