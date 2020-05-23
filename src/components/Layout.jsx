import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TopNav from './TopNav';
import Routes from './Routes';

const useStyles = makeStyles({
  Layout: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
  Page: {
    flex: '1 1',
    overflow: 'auto',
  },
});


export default function Layout(props){
  const classes = useStyles();
  return <div className={classes.Layout} data-testid="layout">
    <TopNav {...props} className={classes.nav} />
    <div className={classes.Page}>
      <Routes {...props} />
    </div>
  </div>
}
