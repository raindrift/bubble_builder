import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';


import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import grey from '@material-ui/core/colors/grey';
import deepPurple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';

// import TopNavIcon from './TopNavIcon';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  topBar: {
    backgroundColor: deepPurple[800],
    color: grey[100],
  },
  topBarGrid: {
    // paddingTop: 3,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    padding: 5,
  },
  menuButtonSelected: {
    marginRight: theme.spacing(1),
    color: green[800],
    padding: 5,
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
    marginTop: 9,
    marginLeft: 10,
    fontWeight: 600,
  },
  loadingSpacer: {
    height: 4
  },
}));

// function BottomNavButton({ path, label, ...props }){
//   return <BottomNavigationAction
//     {...props}
//     component={Link}
//     value={label}
//     label={label}
//     to={`/app${path}`}
//   />
// }

function NavButton({ path, label, icon, selected, ...props }){
  const classes = useStyles();
  const currentPath = `/${window.location.pathname.split('/')[1] || ''}`

  return <IconButton
    {...props}
    component={Link}
    value={label}
    label={label}
    to={path}
    className={currentPath.startsWith(path) ? classes.menuButtonSelected : classes.menuButton}
    color="inherit"
    aria-label={label}>
      {icon}
  </IconButton>
}

export default function TopNav({ loading }) {
  const classes = useStyles();
  const path = window.location.pathname.split('/')[1] || ''

  let buttons = [
    <NavButton
      key="new"
      path="/new"
      label="new"
      icon={<AddIcon />}
    />,
    <NavButton
      key="people"
      path="/people"
      label="people"
      icon={<PeopleAltIcon />}
    />,
    <NavButton
      key="graph"
      path="/graph"
      label="graph"
      icon={<AccountTreeIcon />}
    />,
  ];


  // Menu boilerplace
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }
  // const handleLogout = () => {
  //   window.location.href = "/logout"
  // }

  buttons.push(
    <IconButton key="menu_button" className={classes.menuButton} onClick={openMenu} color="inherit">
      <MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" />
    </IconButton>,
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
      key="menu"
    >
      <MenuItem component={Link} to={'/share'} onClick={closeMenu}>Share</MenuItem>
      {/*<MenuItem onClick={handleLogout}>Logout</MenuItem>*/}
    </Menu>
  )

  let title = ''
  if(path.startsWith('new')) {
    title = 'new'
  } else if(path.startsWith('people')) {
    title = 'people'
  } else if(path.startsWith('graph')) {
    title = 'graph'
  } else if(path.startsWith('share')) {
    title = 'share'
  }

  let loadingBar = <div className={classes.loadingSpacer}></div>
  if(loading) {
    loadingBar = <LinearProgress color="primary" />
  }

  let nav = (
    <AppBar position="static" className={classes.topBar}>
      <Toolbar style={{paddingLeft: 10}}>
        <Grid container spacing={0} className={classes.topBarGrid}>
          <Grid item xs={1}>
            {/*<TopNavIcon/>*/}
            bb
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" className={classes.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={7} style={{textAlign: 'right'}}>
            {buttons}
          </Grid>
        </Grid>
      </Toolbar>
      {loadingBar}
    </AppBar>
  );

  return nav;
}
