import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Avatar, Chip, ListItem, ListItemText, ListItemAvatar} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';


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
  },  
}));

const  ContactCard = (props) => {
  const classes = useStyles();
  const { txn } = props;
  const buildDate = () => {
    let today = new Date(txn.cdate);
    let day = ['Sun','Mon','Tue', 'Wed', 'Thu','Fri','Sat'][today.getDay()];
    let month = ['Jan','Feb','Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][today.getDate()];
    let dd = String(today.getDate()).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = day + ', ' + month+' ' + dd+' ' + yyyy;
    return today;
  }

  return (
    <div className={classes.root}>
        <Paper className={classes.paper} style={{ background: (txn.value < 0) ? '#ffcccc' : '#ccffcc' }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <ListItem style={{width:'85%'}} >
                        <ListItemAvatar>
                            <ReceiptRoundedIcon/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={txn.itemName}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                    <Chip variant="outlined" color={(txn.value < 0) ? '#ffcccc' : '#ccffcc'} size="small" avatar={<Avatar><b>₹</b></Avatar>} label={ Math.abs(txn.value) } />
                                    </Typography>
                                    {" — "+ buildDate()}
                                </>
                            }
                        />
                    </ListItem>
                </Grid>
        </Paper>    
    </div>
  );
}

export default ContactCard;
