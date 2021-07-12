import Register from "../Views/Register";
import Landing from "../Views/Landing";
import Voting from "../../Voting/Container/Voting";
import Profile from "App/Modules/Profile/Container/Profile";


const authRoutes = [
  {
    path: "/landing",
    name: "Landing",
    component: Landing,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: "/auth",
  },
  {
    path: "",
    name: "Voting",
    component: Voting,
    layout: "/voting",
  },
  {
    path: "",
    name: "Profile",
    component: Profile,
    layout: "/profile",
  }
];

export default authRoutes;