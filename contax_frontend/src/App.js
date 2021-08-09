import { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch, useSelector, connect } from "react-redux";

import "./App.scss";

import { Container } from "reactstrap";
import Homepage from "./pages/Homepage/Homepage";
import UserAuth from "./pages/UserAuth/UserAuth";
import Contacts from "./pages/Contacts/Contacts";

import PrivateRoute from "./components/PrivateRoute";

import { requestAccessToken } from "./state/AuthSlice";

function App() {
  let history = createBrowserHistory();
  const dispatch = useDispatch();

  let { isAuthenticated, authLoadingStatus, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log(history);
  }, [history]);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      (async () => {
        console.log("app loaded");
        await dispatch(requestAccessToken());
      })();
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <Container fluid className="g-0">
      <Router history={history}>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/login"
          component={UserAuth}
          pageAction={"login"}
          pageTitle={"Log in"}
          history={history}
        />
        <Route
          exact
          path="/signup"
          component={<UserAuth />}
          pageAction={"signup"}
          pageTitle={"Sign up"}
          history={history}
        />
        <PrivateRoute
          exact
          path="/app"
          // history={history}
          isAuthenticated={isAuthenticated}
          authLoadingStatus={authLoadingStatus}
          component={Contacts}
        />
        {/* <PrivateRoute
          exact
          path="/app/:formAction?/:contactId?"
          // history={history}
          isAuthenticated={isAuthenticated}
          authLoadingStatus={authLoadingStatus}
          component={Contacts}
          /> */}
      </Router>
    </Container>
  );
}

const mapPropsToState = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authLoadingStatus: state.auth.authLoadingStatus,
  };
};

export default connect(mapPropsToState)(App);
