import { useHistory} from "react-router";

 export const useLogout = () => {
  let history = useHistory();
  const clearTkn = () => {
    window.localStorage.removeItem("state")
    window.localStorage.clear();
    history.push("/auth")
  }

  return [clearTkn];
}