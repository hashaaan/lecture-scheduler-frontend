import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import indexRoutes from "./routes";

import Schedules from "./components/pages/Schedules";
import Halls from "./components/pages/Halls";

const AppRouter = ({ authenticated, ...props }) => {
  // Test every passed-in auth verification function.
  const verifyAuth = (authCriteria, props) => {
    if (authCriteria.length === 0) return true;
    return authCriteria.every((criterion) => criterion(props));
  };

  // Authentication HoC
  const withAuth =
    ({ authCriteria = [], redirectPath = "/" } = {}) =>
    (Component) =>
    (props) => {
      const isAuthorized = verifyAuth(authCriteria, props);
      console.log(redirectPath);
      return isAuthorized ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: props.location },
          }}
        />
      );
    };

  const validUser = (_props) => {
    if (!authenticated) {
      return false;
    }
    return true;
  };

  // const unauthUser = (_props) => {
  //   if (authenticated) {
  //     return false;
  //   }
  //   return true;
  // };

  // The Store route has different authentication requirements
  // than the other two routes
  // const loginCriteria = [unauthUser];
  const mainCriteria = [validUser];

  const authRoute = withAuth({
    authCriteria: mainCriteria,
    redirectPath: "/login",
  });

  const ProtectedRoutes = {
    //Login: withAuth({ authCriteria: loginCriteria })(Login),
    //SignUp: withAuth({ authCriteria: loginCriteria })(SignUp),
    Schedules: authRoute(Schedules),
    Halls: authRoute(Halls),
  };

  return (
    <Router>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route {...prop} key={key} />;
        })}
        <Route exact path="/schedules" component={ProtectedRoutes.Schedules} />
        <Route exact path="/halls" component={ProtectedRoutes.Halls} />
        {/* <Route exact path="/login" component={ProtectedRoutes.Login} />
        <Route exact path="/signup" component={ProtectedRoutes.SignUp} />
        <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  //authenticated: state.member.authenticated,
  authenticated: true,
});

export default connect(mapStateToProps, null)(AppRouter);
