import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from './components/navigation/index';

function App(props) {
  
  const vertical = 'bottom';
  const horizontal = 'right';

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Router>
      <Navigation/>
      <Snackbar anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`} open={props.snackbar.visible} autoHideDuration={6000}>
        <Alert severity={props.snackbar.status}>
          {props.snackbar.msg}
        </Alert>
      </Snackbar>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(App);
