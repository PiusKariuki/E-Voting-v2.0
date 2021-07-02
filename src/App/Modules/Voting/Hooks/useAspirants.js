import { useState } from "react";
import { axios } from "../../../Common/Shared/Shared";
import swal from "sweetalert";
import useInterceptor from "./useInterceptor";

const useAspirants = () => {

  // state hooks
  const [aspirants, setAspirants] = useState([]);
  const txt = "loading aspirants please wait......";
  const [loader, setLoad] = useState(false);
  //...end state hooks...

  // initialize interceptor
  const [interceptor] = useInterceptor();


  const fetchAspirants = (tkn, electionId, postId) => {
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
  //array of all asp uuids

  const [aspContent, setAspContent] = useState([])

  const clickHandler = (btn, uuid) => {
    setViewAsp(true);
    let e = btn.target.innerHTML;
    if (e === "view") {
      return aspirants.map((asp) => {
        if (asp.uuid === uuid)
          setAspContent(
            [
              asp.post.name,
              asp.profile_picture,
              asp.manifesto
            ]);
      });
    }
    else if (e === "vote") {
      return aspirants.map((asp) => {
        if (asp.uuid === uuid)
          setAspContent(
            [
              asp.post.name,
              asp.profile_picture,
              asp.manifesto,
              asp.uuid, //use this to vote
            ]);
      });
    }


  };
  // end click handler................

  // state hook to track our aspirants in the table
  const [aspUuids, setAspUuids] = useState([]);
  // map through aspirants and make an array of id for routing
  const mapAspIds = (asps) => {
    asps.forEach(asp => {
      return setAspUuids(prev => [...prev, asp.uuid])
    })
  }
  // end click handler................


  const castVote = (tkn, election_uuid, post_uuid, candidate_uuid) => {
    interceptor(tkn);
    setLoad(true);

    const vote = {
      "post_uuid": post_uuid,
      "candidate_uuid": candidate_uuid,
      "election_uuid": election_uuid
    }

    axios.post('voter/vote', vote)
      .then(res => {
        setLoad(false)
        swal("Voting successful", "", "success")
      })
      .catch(err => {
        setLoad(false)
        if (err?.response?.data?.message) {
          swal(err?.response?.data?.message, '', 'error')
        }
      })
  }


  // return array
  return [
    aspirants,
    fetchAspirants,
    txt,
    loader,
    createData,
    viewAsp,
    setViewAsp,
    aspContent,
    clickHandler,
    mapAspIds,
    aspUuids,
    castVote,
  ];

};

export default useAspirants

