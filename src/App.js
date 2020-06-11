import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Navigation from './components/navigation/index';

function App(props) {

  const vertical = 'bottom';
  const horizontal = 'right';

  
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: props.theme,
          primary:{
            main: '#4901A7',
          }
        },
      }),
    [props.theme],
  );

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Snackbar anchorOrigin={{ vertical, horizontal }} key={`${vertical},${horizontal}`} open={props.snackbar.visible} autoHideDuration={6000}>
          <Alert severity={props.snackbar.status === 200 ? 'success' : 'error'}>
            {props.snackbar.msg}
          </Alert>
        </Snackbar>
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(App);
