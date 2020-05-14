import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import BookIcon from '@material-ui/icons/Book';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import Tooltip from '@material-ui/core/Tooltip';
import { Link, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import style from './style';
import DashNavigation from '../../components/dashNavigation/index';
import { toggleTheme } from '../../redux/actions/commonActions';

const Dashboard = (props) => {
  const classes = style();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let history = useHistory();
  let { url } = useRouteMatch();
  let location = useLocation().pathname;

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

  const navLinks = [
    { id: 1, title: 'Home', url: url, icon: <HomeIcon/>, divider: true },
    { id: 2, title: 'Add Post', url: `${url}/add-post`, icon: <PostAddIcon/> },
    { id: 3, title: 'All Post', url: `${url}/all-post`, icon: <ViewStreamIcon/>, divider: true },
    { id: 4, title: 'Add Pdf', url: `${url}/add-pdf`, icon: <BookIcon/> },
    { id: 5, title: 'All Pdf', url: `${url}/all-pdf`, icon: <AmpStoriesIcon/>, divider: true },
    { id: 6, title: 'Add Video', url: `${url}/add-video`, icon: <VideoLabelIcon/> },
    { id: 7, title: 'All Video', url: `${url}/all-video`, icon: <VideoLibraryIcon/>, divider: true },
  ]

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
          <img width={40} src={require('../../img/logo.png')} alt="upload" />
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
        <MenuList>
          {navLinks.map((item) => {
            return(
              <div key={item.id}>
                <Tooltip title={open === false ? item.title : ''} aria-label={item.title} placement="right" className={location === item.url ? classes.activeLink : ''}>
                  <MenuItem component={Link} to={item.url}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </MenuItem>
                </Tooltip>
                {item.divider === true ? <Divider /> : null}
              </div>
            )
          })}
        </MenuList>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <DashNavigation />
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state.common;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleTheme: toggleTheme }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);