import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Avatar,
  Chip,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import TodayRoundedIcon from '@material-ui/icons/TodayRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    cursor: 'pointer',
  },
  deleteIcon: {
    margin: theme.spacing(2),
  },
}));

const MonthCard = (props) => {
  const classes = useStyles();
  const { month, onDelete } = props;
  const getTotal = () => {
    return month.transactions
      .map((txn) => parseInt(txn.value))
      .reduce((a, b) => a + b, 0);
  };
  const to = '/hisaab/month/' + month.id;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{ background: '#e6e6e6' }}>
        <Grid container wrap='nowrap' spacing={2}>
          <ListItem style={{ width: '80%' }} component={RouterLink} to={to}>
            <ListItemAvatar>
              <Avatar alt={month.name}>
                <TodayRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={month.name}
              secondary={
                <>
                  <Typography
                    component='span'
                    variant='body2'
                    color='textPrimary'>
                    <Chip
                      variant='outlined'
                      color='secondary'
                      size='small'
                      label='you spend'
                    />
                  </Typography>
                  <Typography
                    component='span'
                    variant='body2'
                    color='textPrimary'>
                    <Chip
                      variant='outlined'
                      color='default'
                      size='small'
                      avatar={
                        <Avatar>
                          <b>₹</b>
                        </Avatar>
                      }
                      label={Math.abs(getTotal())}
                    />
                  </Typography>
                </>
              }
            />
          </ListItem>
          <IconButton
            edge='end'
            color='secondary'
            aria-label='delete'
            className={classes.deleteIcon}
            onClick={() => onDelete(month.id)}>
            <DeleteForeverRoundedIcon />
          </IconButton>
        </Grid>
      </Paper>
    </div>
  );
};

export default MonthCard;
