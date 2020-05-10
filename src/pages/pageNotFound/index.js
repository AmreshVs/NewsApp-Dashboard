import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const PageNotFound = () => {

  const classes = useStyles();

  return(
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.container}>
          <Typography component="h1" variant="h1">
            404
          </Typography>
          <Typography variant="h6">
            Page Not Found
          </Typography>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default PageNotFound;

const useStyles = makeStyles((theme) => ({
  container:{
    display: "flex",
    height: '100vh',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column'
  }
}));