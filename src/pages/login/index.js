import React from 'react';
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
import Auth from '../../commonFunctions/Auth';

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

const Login = (props) => {
console.log(props)
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('valartamil@gmail.com');
  const [pass, setPass] = React.useState('admin');

  const handleButtonClick = async () => {
    if(validate()){
      setLoading(true);
      const response = await Auth({email: email, pass: pass});
      
      if(response.status === 401){
        SnackMessage({status: 'error', msg: response.message});
      }
      else{
        SnackMessage({status: 'success', msg: response.data.message});
        localStorage.setItem('userData', JSON.stringify(response.data.data));
        props.history.replace('/dashboard');
      }
      setLoading(false);
    }
  };

  const validate = () => {
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    
    if(!email){
      SnackMessage({status: 'error', msg: 'Email cannot be blank'});
      return false;
    }

    if(email.match(mailformat))
    {
      return true;
    }

    if(!email.match(mailformat))
    {
      SnackMessage({status: 'error', msg: 'Invalid Email Address'});
      return false;
    }

    if(!pass){
      SnackMessage({status: 'error', msg: 'Password cannot be blank'});
      return false;
    }
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField value={pass} onChange={(e) => setPass(e.target.value)} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <div className={classes.wrapper}>
              <Button fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading} onClick={handleButtonClick} >
                Sign In
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

export default withRouter(Login);