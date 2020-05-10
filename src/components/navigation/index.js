import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from '../../pages/main/index';
import Login from '../../pages/login/index';
import Signup from '../../pages/signup/index';
import Dashboard from '../../pages/dashboard/index';
import PageNotFound from '../../pages/pageNotFound/index';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Main/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/dashboard">
        <Dashboard/>
      </Route>
      <Route path="*">
        <PageNotFound/>
      </Route>
    </Switch>
  )
}

export default Navigation;