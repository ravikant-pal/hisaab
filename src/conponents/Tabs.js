import {
  EventNote as EventNoteIcon,
  PersonPin as PersonPinIcon,
} from '@mui/icons-material';
import { Paper, Tab, Tabs } from '@mui/material';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

const IconLabelTabs = (props) => {
  const location = useLocation();
  const value = location.pathname.includes('/daily') ? 1 : 0;

  return (
    <Paper
      square
      elevation={0}
      sx={{
        flexGrow: 1,
        backgroundColor: 'transparent',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <Tabs
        value={value}
        indicatorColor='secondary'
        textColor='primary'
        centered
        sx={{
          '& .MuiTab-root': {
            minHeight: 64,
            fontSize: '0.95rem',
            fontWeight: 500,
            textTransform: 'capitalize',
          },
        }}
      >
        <Tab
          icon={<PersonPinIcon />}
          iconPosition='start'
          label='Friends'
          component={RouterLink}
          to='/hisaab/contacts'
        />
        <Tab
          icon={<EventNoteIcon />}
          iconPosition='start'
          label='Daily'
          component={RouterLink}
          to='/hisaab/daily'
        />
      </Tabs>
    </Paper>
  );
};

export default IconLabelTabs;
