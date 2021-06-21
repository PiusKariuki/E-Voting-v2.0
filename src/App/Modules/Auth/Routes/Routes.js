import Register from "../Views/Register";
import Landing from "../Views/Landing";
import Voting from "../../Voting/Container/Voting"

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
  }
];

export default authRoutes;