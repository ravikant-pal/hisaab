import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import ProminentAppBar from '../conponents/ProminentAppBar';
import Tabs from '../conponents/Tabs';
import Page from '../conponents/Page';
import * as dailyService from '../services/DailyService';
import DailyExpense from '../conponents/DailyExpense';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    flexGrow: 1,
    spacing: 0,
  },
  control: {
    padding: theme.spacing(2),
  },
  fabButton: {
    position: 'fixed',
    zIndex: 1,
    bottom: 10,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    // display: 'table',
  },
  searchInput: {
    padding: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  calendar: {
    borderRadius: 10,
  },
  roundedDate: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 100,
    borderRadius: 50,
  },
}));

const AppView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dailyService.getOrBuildDate(new Date()));
  const handleClickOnDay = date => {
    // console.log("dateId", ('' + date.getDate() + date.getMonth() + date.getFullYear()).trim());
    setDate(dailyService.getOrBuildDate(date));
    setOpen(true);
  }

  const tileContent = ({ date, view }) => {
    let content = null;
    if (view == 'month') {
      let total = dailyService.getTotalForDay(date)
      // console.log("Day : ", date, "total: ", total);
      if (total) {
        content = <div><sub>₹{total * (-1)}</sub></div>;
      }
    }
    // if (view == 'year') {
    //   dailyService.getTotalByYear(date);
    // }
    // if (view == 'decade') {
    //   dailyService.getTotalByMonth(date);
    // }
    return content;
  }

  return (
    <Page className={classes.root} title='Hissab - Daily'>
      <div>
        <ProminentAppBar />
        <Tabs month={true} />
        <Grid containe className={classes.root}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Calendar
                className={classes.calendar}
                tileClassName={classes.roundedDate}
                tileContent={tileContent}
                onClickDay={handleClickOnDay}
                prevLabel={<ArrowLeftRoundedIcon />}
                nextLabel={<ArrowRightRoundedIcon />}
                prev2Label={<SkipPreviousRoundedIcon />}
                next2Label={<SkipNextRoundedIcon />}
              />
              <DailyExpense
                date={date}
                setDate={setDate}
                open={open}
                setOpen={setOpen}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default AppView;
