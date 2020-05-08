import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from '../../pages/main/index';
import Login from '../../pages/login/index';
import Dashboard from '../../pages/dashboard/index';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Main/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/dashboard">
        <Dashboard/>
      </Route>
    </Switch>
  )
}

export default Navigation;