import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  Page: {
    padding: '10px',
    // backgroundColor: 'purple',
  },
});

export default function Page(props){
  const classes = useStyles();
  return <div className={classes.Page}>
    {props.header &&
      <Typography variant="h3" component="h1" gutterBottom>
        {props.header}
      </Typography>
    }
    {props.children}
  </div>
}
