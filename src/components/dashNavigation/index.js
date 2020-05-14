import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Summary from '../../pages/dashboard/summary';
import NewPost from '../../pages/posts/newPost';
import AllPost from '../../pages/posts/allPost';
import EditPost from '../../pages/posts/editPost';
import ViewPost from '../../pages/posts/viewPost';

import AddPdf from '../../pages/pdf/addPdf';
import AllPdf from '../../pages/pdf/allPdf';
import EditPdf from '../../pages/pdf/editPdf';
import ViewPdf from '../../pages/pdf/viewPdf';

import AddVideo from '../../pages/video/addVideo';
import AllVideo from '../../pages/video/allVideo';
import EditVideo from '../../pages/video/editVideo';
import ViewVideo from '../../pages/video/viewVideo';

const DashNavigation = () => {
  
  let { path } = useRouteMatch();
  let routes = [
    { id: 1, path: `${path}/add-post`, component: <NewPost/> },
    { id: 2, path: `${path}/all-post`, component: <AllPost/> },
    { id: 3, path: `${path}/edit-post/:post_id`, component: <EditPost/> },
    { id: 4, path: `${path}/view-post/:post_id`, component: <ViewPost/> },
    { id: 5, path: `${path}/add-pdf`, component: <AddPdf/> },
    { id: 6, path: `${path}/all-pdf`, component: <AllPdf/> },
    { id: 7, path: `${path}/edit-pdf/:pdf_id`, component: <EditPdf/> },
    { id: 8, path: `${path}/view-pdf/:pdf_id`, component: <ViewPdf/> },
    { id: 9, path: `${path}/add-video`, component: <AddVideo/> },
    { id: 10, path: `${path}/all-video`, component: <AllVideo/> },
    { id: 11, path: `${path}/edit-video/:video_id`, component: <EditVideo/> },
    { id: 12, path: `${path}/view-video/:video_id`, component: <ViewVideo/> },
  ]

  return (
    <Switch>
      <Route exact path={path}>
        <Summary/>
      </Route>
      {routes.map((route) => {
        return(
          <Route key={route.id} path={route.path}>
            {route.component}
          </Route>
        )
      })}
    </Switch>
  )
}

export default DashNavigation;