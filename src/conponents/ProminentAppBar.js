import * as React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 100,
    padding: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-center',
  },
}));

const ProminentAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <Hidden>
            <Button
              component={RouterLink}
              to='/'
              style={{ textTransform: 'none' }}>
              <Typography
                className={classes.title}
                style={{ color: 'white' }}
                variant='h5'
                noWrap>
                Hisaab
                <Typography variant='subtitle2' noWrap component='div'>
                  Manage your expenses with your friends.
                </Typography>
              </Typography>
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ProminentAppBar;
