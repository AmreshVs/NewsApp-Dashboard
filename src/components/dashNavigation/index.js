import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Summary from '../../pages/dashboard/summary';
import NewPost from '../../pages/posts/newPost';
import AllPost from '../../pages/posts/allPost';
import EditPost from '../../pages/posts/editPost';
import ViewPost from '../../pages/posts/viewPost';

import AddPdf from '../../pages/pdf/addPdf';

const DashNavigation = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <Summary/>
      </Route>
      <Route path={`${path}/add-post`}>
        <NewPost/>
      </Route>
      <Route path={`${path}/all-post`}>
        <AllPost/>
      </Route>
      <Route path={`${path}/edit-post/:post_id`}>
        <EditPost/>
      </Route>
      <Route path={`${path}/view-post/:post_id`}>
        <ViewPost/>
      </Route>
      <Route path={`${path}/add-pdf`}>
        <AddPdf/>
      </Route>
    </Switch>
  )
}

export default DashNavigation;