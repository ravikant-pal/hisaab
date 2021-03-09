import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const IconLabelTabs = (props) => {
  const classes = useStyles();
  const { month: daily } = props;
  const [value, setValue] = React.useState(daily ? 1 : 0);

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        indicatorColor='secondary'
        textColor='primary'
        centered>
        <Tab
          icon={<PersonPinIcon />}
          label='Friends'
          component={RouterLink}
          to='/hisaab/contacts'
        />
        <Tab
          icon={<EventNoteIcon />}
          label='daily'
          component={RouterLink}
          to='/hisaab/daily'
        />
      </Tabs>
    </Paper>
  );
};

export default IconLabelTabs;
