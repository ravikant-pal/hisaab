import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

const ProminentAppBar = () => {
  return (
    <AppBar
      position='static'
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
      }}
    >
      <Toolbar sx={{ padding: { xs: '12px 16px', sm: '16px 24px' } }}>
        <Button
          component={RouterLink}
          to='/'
          sx={{
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <Typography
            sx={{
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            component={'span'}
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2rem' },
                letterSpacing: '-0.02em',
                fontFamily:
                  '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                marginBottom: 0.5,
              }}
            >
              Hisaab
            </Typography>
            <Typography
              variant='caption'
              sx={{
                fontSize: '0.875rem',
                opacity: 0.9,
                fontWeight: 400,
                letterSpacing: '0.01em',
                fontFamily:
                  '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              Track expenses with friends, effortlessly
            </Typography>
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default ProminentAppBar;
