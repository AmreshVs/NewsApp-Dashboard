import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Summary from '../../pages/dashboard/summary';
import NewPost from '../../pages/posts/newPost';
import AllPost from '../../pages/posts/allPost';

const DashNavigation = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Summary/>
      </Route>
      <Route path={`${path}/new-post`}>
        <NewPost/>
      </Route>
      <Route path={`${path}/all-post`}>
        <AllPost/>
      </Route>
    </Switch>
  )
}

export default DashNavigation;