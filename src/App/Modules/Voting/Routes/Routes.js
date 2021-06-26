import Election from "../Views/Election";
// election icon
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';
import Posts from "../Views/Posts";
// post icon
import PostAddIcon from '@material-ui/icons/PostAdd';


export const Routes = [
  // posts routes
  {
    path: "/election/:electionId",
    name: "Election posts",
    component: Posts,
    icon: PostAddIcon,
    layout: "/voting",
    onmenu: false
  },
  // election route
  {
    path: "/election",
    name: "Active Elections",
    component: Election,
    icon: HowToVoteOutlinedIcon,
    layout: "/voting",
    onmenu: true
  },

]