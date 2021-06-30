import { useState } from "react";
import { axios } from "../../../Common/Shared/Shared";
import swal from "sweetalert";
import useInterceptor from "./useInterceptor";

import React from 'react'

const useAspirants = () => {

  // state hooks
  const [aspirants, setAspirants] = useState([]);
  const txt = "loading aspirants please wait......";
  const [loader, setLoad] = useState(false);
  //...end state hooks...

  // initialize interceptor
  const [interceptor] = useInterceptor();


  const fetchAspirants = (tkn, electionId,postId) => {
    interceptor(tkn);
    interceptor(tkn);
    setLoad(true);

    axios
      .get(`candidate/voter/candidates/get-all/post/${electionId}/${postId}`)
      .then((res) => {
        setLoad(false);
        setAspirants(res.data.data);
      })
      .catch((err) => {
        swal(err?.response?.data?.message, "please try again", "error");
        setLoad(false);
      });
  };


  // create table rows fn
  const createData = (data) => {
    
    const columns = ["first_name", "middle_name", "last_name", "identification_number"];
    const rows = data.map((data) => columns.map((col) => data.voter[col]));
    return rows;
  };
  // end create data


    // modal state hook
    const [viewAsp, setViewAsp] = useState(false);
    // selected post id for routing 
    const [postId, setPostId] = useState("");
  //............btn click handler
  const clickHandler = (btn, name) => {
    let e = btn.target.innerHTML;
    if (e === "view") {
      setViewAsp(true);
      return aspirants.map((asp) => {
        if (asp.voter.first_name = name)
          setAspContent(
            [ asp.post.name,
              asp.profile_picture,
              asp.manifesto,
            ]);
      });
    }
    //  else if (e === "vote") {
    //  return posts.map(post =>{
    //    if(post.name == name) setPostId(post.uuid)
    //  })
    // } 
    
  };
  // end click handler................




  // return array
  return [aspirants, fetchAspirants, txt, loader,createData];

};

export default useAspirants

