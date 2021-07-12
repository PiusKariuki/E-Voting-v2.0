import ViewProfile from "../Views/ViewProfile";
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';
import Voting from "App/Modules/Voting/Container/Voting";


export const Routes = [
  {
    path: "",
    name: "User profile",
    component: ViewProfile,
    icon: PersonOutlineSharpIcon,
    layout: "/profile",
    onmenu: false
  },
  {
    path: "",
    name: "Active Elections",
    component: Voting,
    icon: HowToVoteOutlinedIcon,
    layout: "/voting",
    onmenu: true
  }
];