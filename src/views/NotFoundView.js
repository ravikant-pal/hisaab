import { Box, Container, Typography } from '@mui/material';
import AppContainer from '../conponents/AppContainer';
import Page from '../conponents/Page';

const NotFoundView = () => {
  return (
    <Page
      sx={{
        backgroundColor: 'background.dark',
        height: '100%',
        paddingBottom: 3,
      }}
      title='404'
    >
      <AppContainer showTabs={false}>
        <Box
          display='flex'
          flexDirection='column'
          height='100%'
          justifyContent='center'
        >
          <Container maxWidth='md'>
            <Typography
              align='center'
              color='textPrimary'
              sx={{ marginTop: 3 }}
              component={'span'}
              variant='h4'
            >
              404: The page you are looking for isn’t here
            </Typography>
            <Typography
              align='center'
              color='textPrimary'
              component={'span'}
              variant='subtitle2'
            >
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <Box textAlign='center'>
              <img
                alt='Under development'
                // className={classes.image}
                src={process.env.PUBLIC_URL + '/404.svg'}
              />
            </Box>
          </Container>
        </Box>
      </AppContainer>
    </Page>
  );
};

export default NotFoundView;
