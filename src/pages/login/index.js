import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from "react-router-dom";

import useStyles from './style';
import SnackMessage from '../../commonFunctions/SnackMessage';
import Auth from '../../commonFunctions/Auth';
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

const Login = (props) => {

  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleButtonClick = async () => {
    if(validate()){
      setLoading(true);
      const response = await Auth({username: username, pass: pass});
      SnackMessage({status: response.status, msg: response.message});
      if(response.status === 200){
        if(checked){
          localStorage.setItem('userData', JSON.stringify(response.data));
        }
        props.userLogin(response.data);
        props.history.replace('/dashboard');
      }
      setLoading(false);
    }
  };

  const validate = () => {
    
    if(!username){
      SnackMessage({status: 'error', msg: 'Username cannot be blank'});
      return false;
    }

    if(!pass){
      SnackMessage({status: 'error', msg: 'Password cannot be blank'});
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
            <TextField value={pass} onChange={(e) => setPass(e.target.value)} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <FormControlLabel
              checked={checked}
              onChange={handleChange}
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <div className={classes.wrapper}>
              <Button fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading} onClick={handleButtonClick} >
                Sign In
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));