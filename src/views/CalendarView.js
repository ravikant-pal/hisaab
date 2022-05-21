import React, { useState } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import ProminentAppBar from "../conponents/ProminentAppBar";
import Tabs from "../conponents/Tabs";
import Page from "../conponents/Page";
import * as dailyService from "../services/DailyService";
import DailyExpense from "../conponents/DailyExpense";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    flexGrow: 1,
    spacing: 0,
  },
  calendar: {
    borderRadius: 5,
    width: "100%",
  },
  roundedDate: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    height: 100,
    borderRadius: 10,
  },
}));

const AppView = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dailyService.getOrBuildDate(new Date()));
  const handleClickOnDay = (date) => {
    setDate(dailyService.getOrBuildDate(date));
    setOpen(true);
  };

  const tileContent = ({ date, view }) => {
    let content = null;
    if (view == "month") {
      let total = dailyService.getTotalForDay(date);
      if (total) {
        content = (
          <div>
            <sub>₹{total * -1}</sub>
          </div>
        );
      }
    }
    return content;
  };

  return (
    <Page title="Hissab - Daily">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sm={4}>
          <ProminentAppBar />
          <Tabs month={true} />
          <Paper>
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
    </Page>
  );
};

export default AppView;
