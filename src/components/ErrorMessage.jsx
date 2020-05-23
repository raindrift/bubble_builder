import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  errorIcon: {
    marginBottom: '-8px',
  }
}));

export default function ErrorMessage({ error, takeAction }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(Boolean(error));
  if (!error) return null

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    takeAction('resetError')
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id"><ErrorIcon className={classes.errorIcon}/> {error}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}
