import React from "react";
import authRoutes from "../Routes/Routes";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
// react-router-dom imports
import { Switch, Route, Redirect } from "react-router-dom";


const Auth = ({history, tkn}) => {
  const getRoutes = (routes) => {
    return (
      routes.map((prop, key) => {
          return (
            <Route
              path={(prop.path && prop.layout + prop.path) || prop.layout}
              component={prop.component}
              key={key}
            />
          );
      })
    );
  };
  React.useEffect(() => {
    if(tkn === undefined) history.push("/auth/landing")
  },[history])

  return (
    <Switch>
      {getRoutes(authRoutes)}
      <Redirect from="*" to="/auth/landing" />
    </Switch>
  )
}


const mapStateToProps = (state) => {
  return {
    tkn: state.User?.tkn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(Login(email, password)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Auth));
