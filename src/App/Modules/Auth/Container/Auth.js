import React from "react";
import authRoutes from "../Routes/Routes";
// react-router-dom imports
import { Switch, Route, Redirect } from "react-router-dom";


const Auth = () => {
  // .............routing map fn.................
  const getRoutes = (routes) => {
    return (
      // ............conditional for redirecting to conatainer components...........
      routes.map((prop, key) => <Route path={(prop.path && prop.layout + prop.path)
        || (prop.layout)}
        component={prop.component} key={key} />)
    );
  };
  // ........end route map fn........................


  return (
    <Switch>
      {getRoutes(authRoutes)}
      <Redirect from="/" to="/auth/landing" />
    </Switch>
  )
}


export default Auth;
