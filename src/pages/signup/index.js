import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";

import useStyles from './style';
import SnackMessage from '../../commonFunctions/SnackMessage';
import ASignup from '../../commonFunctions/signup';
import { userLogin } from '../../redux/actions/commonActions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="https://amreshvs.ml">
        Valar Tamil by Amresh Vs
      </Link>
      {'.'}
    </Typography>
  );
}

const Signup = (props) => {

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [repass, setRepass] = React.useState('');


  const handleButtonClick = async () => {
    if(validate()){
      setLoading(true);
      const response = await ASignup({username: username, email: email, pass: pass});
      SnackMessage({status: response.status, msg: response.message});
      if(response.status === 200){
        props.history.replace('/login');
      }
      setLoading(false);
    }
  };

  const validate = () => {
    
    if(!username){
      SnackMessage({status: 'error', msg: 'Username cannot be blank'});
      return false;
    }

    if(!email){
      SnackMessage({status: 'error', msg: 'Email cannot be blank'});
      return false;
    }

    if(!pass){
      SnackMessage({status: 'error', msg: 'Password cannot be blank'});
      return false;
    }

    if(!repass){
      SnackMessage({status: 'error', msg: 'Retype Password cannot be blank'});
      return false;
    }

    if(pass !== repass){
      SnackMessage({status: 'error', msg: 'Passwords are not same'});
      return false;
    }

    return true;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" margin="normal" required fullWidth name="email" label="Email" type="email" id="email" autoComplete="email" />
            <TextField value={pass} onChange={(e) => setPass(e.target.value)} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <TextField value={repass} onChange={(e) => setRepass(e.target.value)} variant="outlined" margin="normal" required fullWidth name="re-password" label="Retype Password" type="password" id="re-password" autoComplete="current-password" />
            <div className={classes.wrapper}>
              <Button fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading} onClick={handleButtonClick} >
                Sign Up
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({userLogin: userLogin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));