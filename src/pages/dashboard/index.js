import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import Tooltip from '@material-ui/core/Tooltip';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import style from './style';
import DashNavigation from '../../components/dashNavigation/index';
import { toggleTheme } from '../../redux/actions/commonActions';

const Dashboard = (props) => {
  const classes = style();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let history = useHistory();
  let { url } = useRouteMatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    history.push('/login');
  };

  const handleTheme = () => {
    props.toggleTheme(props.theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Valar Tamil
          </Typography>
          <Tooltip title="Toggle Theme" aria-label="toggle-theme">
            <IconButton color="inherit" aria-label="menu" onClick={handleTheme}>
              <Brightness4Icon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout" aria-label="logout">
            <IconButton color="inherit" aria-label="menu" onClick={logout}>
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to={`${url}`}>
            <ListItem button key={'Home'}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
          </Link>
          <Divider />
          <Link to={`${url}/new-post`}>
            <ListItem button key={'New Post'}>
              <ListItemIcon><PostAddIcon /></ListItemIcon>
              <ListItemText primary={'New Post'} />
            </ListItem>
          </Link>
          <Link to={`${url}/all-post`}>
            <ListItem button key={'All Post'}>
              <ListItemIcon><ViewStreamIcon /></ListItemIcon>
              <ListItemText primary={'All Post'} />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <DashNavigation/>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.common;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({toggleTheme: toggleTheme}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);