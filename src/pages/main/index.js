import React from 'react';
import { withRouter } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Main = (props) => {

  const classes = useStyles();

  React.useEffect(() => {
    if(localStorage.getItem('userData')){
      props.history.push('/dashboard');
    }
    else{
      props.history.push('/login');
    }
  })

  return(
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default withRouter(Main);