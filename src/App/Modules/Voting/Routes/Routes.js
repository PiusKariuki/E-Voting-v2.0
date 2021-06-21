import Election from "../Views/Election";
// election icon
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';


export const Routes = [
  {
    path: "/election",
    name: "Active Elections",
    component: Election,
    icon: HowToVoteOutlinedIcon,
    layout: "/voting",
    onmenu: true
  },
]