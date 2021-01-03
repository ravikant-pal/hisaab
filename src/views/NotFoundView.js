import React from 'react';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import Page from '../conponents/Page';
import ProminentAppBar from '../conponents/ProminentAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
  heading: {
    marginTop: theme.spacing(3),
  },
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title='404'>
      <ProminentAppBar />
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='center'>
        <Container maxWidth='md'>
          <Typography
            align='center'
            color='textPrimary'
            className={classes.heading}
            variant='h4'>
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align='center' color='textPrimary' variant='subtitle2'>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign='center'>
            <img
              alt='Under development'
              className={classes.image}
              src='logo512.png'
            />
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
