import Election from "../Views/Election";
// election icon
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';
import Posts from "../Views/Posts";
// post icon
import PostAddIcon from '@material-ui/icons/PostAdd';
import Aspirants from "../Views/Aspirants";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ApplyCandidacy from "../Views/ApplyCandidacy";




export const Routes = [
  // apply candidacy 
  {
    path: "/:electionId/apply/:postId",
    name: "Apply Candidacy",
    component: ApplyCandidacy,
    icon: PersonOutlineOutlinedIcon,
    layout: "/voting",
    onmenu: false
  },
  // aspirants route
  {
    path: "/:electionId/:postId",
    name: "Aspirants",
    component: Aspirants,
    icon: PersonOutlineOutlinedIcon,
    layout: "/voting",
    onmenu: false
  },
  // posts routes
  {
    path: "/:electionId",
    name: "Election posts",
    component: Posts,
    icon: PostAddIcon,
    layout: "/voting",
    onmenu: false
  },
  // election route
  {
    path: "",
    name: "Active Elections",
    component: Election,
    icon: HowToVoteOutlinedIcon,
    layout: "/voting",
    onmenu: true
  },
]