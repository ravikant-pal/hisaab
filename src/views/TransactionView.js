import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, Grid, makeStyles, Paper, ListItem, ListItemAvatar, Avatar, ListItemText,Typography, Chip} from "@material-ui/core";
import  AddExpense  from "../conponents/AddExpense";
import TransactionCard from "../conponents/TransactionCard";
import Page from "../conponents/Page";
import * as contactService from "../services/ContactService";
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      flexGrow: 1,
        spacing: 0,
        alignItems: 'center',
        minHeight: '100vh'
    },
      control: {
        padding: theme.spacing(2),
      },
      giveButton: {
        position: "fixed",
        zIndex: 1,
        bottom: 10,
        left: 0,
        right: 100,
        margin: '0 auto',
      },
      takeButton: {
        position: "fixed",
        zIndex: 1,
        bottom: 10,
        left: 100,
        right: 0,
        margin: '0 auto',
      },
      paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },  
  }))


const TransactionView = () => {
  const classes = useStyles();
  const { id }= useParams();

  const [openGive, setOpenGive] = useState(false);
  const [openTake, setOpenTake] = useState(false);
  const [itemName, setItemName] = useState('');
  const [value, setValue] = useState(0);
  const [contact, setContact] = useState(contactService.findById(id))
//   console.log("contact : ",contact)

  const handleOpenGive = () => {
    setOpenGive(true);
  };

  const handleOpenTake = () => {
    setOpenTake(true);
  };

  const handleCloseGive = () => {
    setOpenGive(false);
  };

  const handleCloseTake = () => {
    setOpenTake(false);
  };

  const handleSaveItemGive = () => {
      console.log("Item Name : ",itemName, "Value",value)
      let item ={
        itemName : itemName,
        value: value,
        cdate : new Date()
    }
    contact.total+=value;
    contact.transactions.push(item);
    contactService.addExpance(contact);
    setOpenGive(false);
    setItemName('');
    setValue(0);
  }

  const handleSaveItemTake = () => {
    console.log("Item Name : ",itemName, "Value",value)
    let item ={
        itemName : itemName,
        value: -value,
        cdate : new Date()
    }
    contact.total-=value;
    contact.transactions.push(item);
    contactService.addExpance(contact);
    setOpenTake(false);
    setItemName('');
    setValue(0);
  }
  
    return (
      <Page
        className={classes.root}
        title="Ram"
      >
        <div>
            <Grid container justify='center' className={classes.root}>
                <Grid item md={12}>
                    <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <ListItem style={{width:'85%'}} >
                                <ListItemAvatar>
                                    <Avatar alt={contact.name} src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                                <Typography
                                                    component="span"
                                                    variant="h5"
                                                    color="textPrimary"
                                                >
                                                  {contact.name}  
                                    </Typography>}
                                />
                            </ListItem>
                            <Chip variant="outlined" color={(contact.total < 0) ? 'secondary' : 'primary'} size="small" avatar={<Avatar><b>₹</b></Avatar>} label={ Math.abs(contact.total) } />
                        </Grid>
                        {contact.transactions.map((txn,index) => (
                            <TransactionCard key={index} txn={txn} />
                        ))}
                    </Paper>    
                </Grid>
            <Grid 
                item 
                >
                    <Grid container>
                        <Grid item md={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.giveButton}
                                startIcon={<ArrowUpwardRoundedIcon />}
                                onClick={handleOpenGive}
                                >
                                Give
                            </Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.takeButton}
                                startIcon={<ArrowDownwardRoundedIcon />}
                                onClick={handleOpenTake}
                                >
                                Take
                            </Button>
                        </Grid>
                    </Grid>
                <AddExpense open={openGive} handleClose={handleCloseGive} itemName={itemName} setItemName={setItemName} value={value} setValue={setValue} handleSaveItem={handleSaveItemGive} />
                <AddExpense open={openTake} handleClose={handleCloseTake} itemName={itemName} setItemName={setItemName} value={value} setValue={setValue} handleSaveItem={handleSaveItemTake} />
                </Grid>
                
            </Grid>
        </div>
      </Page>
    );
}

export default TransactionView;