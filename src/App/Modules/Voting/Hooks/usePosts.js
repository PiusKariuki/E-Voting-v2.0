import  { useState } from "react";
import { axios } from "../../../Common/Shared/Shared";
import swal from "sweetalert";
import useInterceptor from "./useInterceptor";


/*................fetch posts start..................*/
const usePosts = () => {
  // state hooks
  const [posts, setPosts] = useState([]);
  const txt = "loading posts please wait......";
  const [loader, setLoad] = useState(false);
  // array of all post ids
  const [postUuids, setPostUuids] = useState([]);
  //...end state hooks...

  // initialize interceptor
  const [interceptor] = useInterceptor();

  const fetchPosts = (tkn, id) => {
    interceptor(tkn);
    interceptor(tkn);
    setLoad(true);

    axios
      .get(`election/voter/elections/posts/get-all/${id}`)
      .then((res) => {
        setLoad(false);
        setPosts(res.data.data);
      })
      .catch((err) => {
        swal("Couldn't fetch posts try again", "", "error");
        setLoad(false);
      });
  };


  // define the cols for our table
  const cols = ["name", "bound", "verified candidates", "voted yet"];
  // create table rows fn
  /* ....create an array of uuids for keeping track of selection and reusabiliy of tablle
    component................................ */

  const createData = () => {
    const columns = ["name", "bound", "verified_candidates_count", "voted"];
    const rows = posts.map((data) => columns.map((col) => data[col]));

    return rows;
  };
  // end create data

  //...................action buttons click handler
  // btn click handler
  // modal state hook
  const [viewPost, setViewPost] = useState(false);
  // selected post id for routing to the selected post. not to be confused with postUuids.
  const [postId, setPostId] = useState("");

  
  /*  selected post info for the modalprops 
  :departaments , descriptions residence and requirements
  */
  const [postContent, setPostContent] = useState([])


  // map through posts and make an array of id for routing
  const mapPostIds = (posts) => {
    posts.forEach(post => {
      return setPostUuids(prev => [...prev,post.uuid])
    })
  }



  return [
    loader,
    txt,
    fetchPosts,
    posts,
    createData,
    viewPost,
    setViewPost,
    postId,
    postContent,
    cols,
    mapPostIds,
    postUuids,
    setPostContent,
    setPostId
  ];
};

export default usePosts;
