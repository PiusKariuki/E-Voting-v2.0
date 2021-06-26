import { useState } from "react";
import { axios } from "../../../Common/Shared/Shared";
import swal from "sweetalert";
import useInterceptor from "./useInterceptor";
// import election to know state for btns

/*................fetch posts start..................*/
const usePosts = () => {
  // state hooks
  const [posts, setPosts] = useState([]);
  const txt = "loading posts please wait......";
  const [loader, setLoad] = useState(false);
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

  const cols = posts.length > 0 && Object.keys(posts[0]);

  const filteredCols = () =>
    cols.length > 0 &&
    cols.filter(
      (col) =>
        col !== "created_at" &&
        col !== "uuid" &&
        col !== "departments" &&
        col !== "description" &&
        col !== "options" &&
        col !== "candidates_count" &&
        col !== "requirements" &&
        col !== "residence"
    );

  // create table rows fn
  const createData = (data) => {
    const columns = ["name", "bound", "verified_candidates_count", "voted"];
    const rows = data.map((data) => columns.map((col) => data[col]));
    return rows;
  };
  // end create data

  //...................action buttons click handler
  // btn click handler
  // modal state hook
  const [viewPost, setViewPost] = useState(false);
  // selected post id for routing 
  const [postId, setPostId] = useState("");
  /*  selected post info for the modalprops 
  :departaments , descriptions residence and requirements
  */
  const [postContent, setPostContent] = useState([])
  const clickHandler = (btn, name) => {
    let e = btn.target.innerHTML;
    if (e === "view") {
      setViewPost(true);
      return posts.map((post) => {
        if (post.name === name)
          setPostContent(
            [
              post.name,
              post.departments,
              post.residence,
              post.requirements,
              post.description
            ]);
      });
    }
    //  else if (e === "vote") {
    //   history.push("/voting/posts/aspirants");
    // } else history.push("/voting/posts/apply");
  };
  // end click handler................

  return [
    loader,
    txt,
    fetchPosts,
    posts,
    createData,
    clickHandler,
    viewPost,
    setViewPost,
    postId,
    postContent
  ];
};

export default usePosts;
