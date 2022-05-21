import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import {
  Grid,
  Fab,
  makeStyles,
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  ListItemSecondaryAction,
  List,
} from "@material-ui/core";
import AddExpense from "../conponents/AddExpense";
import TransactionCard from "../conponents/TransactionCard";
import ProminentAppBar from "../conponents/ProminentAppBar";
import Page from "../conponents/Page";
import * as contactService from "../services/ContactService";
import * as transactionService from "../services/TransactionService";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import { ArrowBackRounded, ArrowLeftRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    flexGrow: 1,
    spacing: 0,
  },
  giveButton: {
    position: "fixed",
    zIndex: 1,
    bottom: 35,
    margin: "auto",
    left: "46%",
    transform: "translateX(-46%)",
  },
  takeButton: {
    position: "fixed",
    zIndex: 1,
    bottom: 35,
    margin: "auto",
    right: "46%",
    transform: "translateX(46%)",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TransactionView = (props) => {
  let query = useQuery();
  console.log("props: ", query.get("q"));
  const classes = useStyles();
  const { id } = useParams();
  const [txnId, setTxnId] = useState(0);
  const [openGive, setOpenGive] = useState(false);
  const [openTake, setOpenTake] = useState(false);
  const [itemName, setItemName] = useState("");
  const [value, setValue] = useState(0);
  const [nameErrorText, setNameErrorText] = useState("");
  const [valueErrorText, setValueErrorText] = useState("");
  const [contact, setContact] = useState(contactService.findById(id));
  const getTotal = () => {
    return contact.transactions
      .map((txn) => parseInt(txn.value))
      .reduce((a, b) => a + b, 0);
  };
  const [total, setTotal] = useState(getTotal());

  const handleOpenGive = () => {
    setOpenGive(true);
  };

  const handleOpenTake = () => {
    setOpenTake(true);
  };

  const handleCloseGive = () => {
    setOpenGive(false);
    setValue(0);
    setItemName("");
    setNameErrorText("");
    setValueErrorText("");
  };

  const handleCloseTake = () => {
    setOpenTake(false);
    setValue(0);
    setItemName("");
    setNameErrorText("");
    setValueErrorText("");
  };

  const handleSaveItemGive = () => {
    let item = txnId
      ? findTransactionById(txnId)
      : {
          id: ++contact.transactionId,
          itemName: itemName,
          value: value,
          cdate: new Date(),
        };
    [item.itemName, item.value] = [itemName, value];
    if (!txnId) {
      contact.transactions.unshift(item);
    }
    transactionService.addContactExpance(contact);
    setTotal(getTotal());
    setOpenGive(false);
    setItemName("");
    setValue(0);
    setTxnId(0);
  };

  const handleSaveItemTake = () => {
    let item = txnId
      ? findTransactionById(txnId)
      : {
          id: ++contact.transactionId,
          itemName: itemName,
          value: -value,
          cdate: new Date(),
        };
    [item.itemName, item.value] = [itemName, -value];
    if (!txnId) {
      contact.transactions.unshift(item);
    }
    transactionService.addContactExpance(contact);
    setTotal(getTotal());
    setOpenTake(false);
    setItemName("");
    setValue(0);
    setTxnId(0);
  };
  const onDelete = (id) => {
    transactionService.deleteContactExpance(contact, id);
    setContact(contactService.findById(contact.id));
    setTotal(getTotal());
  };
  const onEdit = (id) => {
    let currTxn = findTransactionById(id);
    setTxnId(id);
    setItemName(currTxn.itemName);
    setValue(Math.abs(currTxn.value));
    currTxn.value < 0 ? setOpenTake(true) : setOpenGive(true);
  };

  const findTransactionById = (txnId) => {
    return contact.transactions.filter((txn) => txn.id === txnId)[0];
  };

  return (
    <Page className={classes.root} title={`Your Friend - ${contact.name}`}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item sm={4}>
          <ProminentAppBar />
          <Paper style={{ background: "#e6e6e6" }}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Tooltip title="Back">
                    <IconButton
                      edge="end"
                      aria-label="add-to-secret"
                      component={RouterLink}
                      to="/"
                    >
                      <ArrowBackRounded />
                    </IconButton>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="h5"
                      color="textPrimary"
                    >
                      {contact.name}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Chip
                    variant="outlined"
                    color={total < 0 ? "secondary" : "primary"}
                    size="small"
                    avatar={
                      <Avatar>
                        <b>₹</b>
                      </Avatar>
                    }
                    label={Math.abs(total)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>

            {contact.transactions.map((txn, index) => (
              <TransactionCard
                key={index}
                txn={txn}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </Paper>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item md={6}>
              <Fab
                size="medium"
                variant="extended"
                color="secondary"
                className={classes.giveButton}
                onClick={handleOpenGive}
              >
                <ArrowUpwardRoundedIcon className={classes.extendedIcon} />
                Give
              </Fab>
            </Grid>
            <Grid item md={6}>
              <Fab
                size="medium"
                variant="extended"
                color="primary"
                className={classes.takeButton}
                onClick={handleOpenTake}
              >
                <ArrowDownwardRoundedIcon className={classes.extendedIcon} />
                Take
              </Fab>
            </Grid>
          </Grid>
          <AddExpense
            isAdd={!txnId}
            open={openGive}
            handleClose={handleCloseGive}
            itemName={itemName}
            setItemName={setItemName}
            value={value}
            setValue={setValue}
            nameErrorText={nameErrorText}
            setNameErrorText={setNameErrorText}
            valueErrorText={valueErrorText}
            setValueErrorText={setValueErrorText}
            handleSaveItem={handleSaveItemGive}
          />
          <AddExpense
            isAdd={!txnId}
            open={openTake}
            handleClose={handleCloseTake}
            itemName={itemName}
            setItemName={setItemName}
            value={value}
            setValue={setValue}
            nameErrorText={nameErrorText}
            setNameErrorText={setNameErrorText}
            valueErrorText={valueErrorText}
            setValueErrorText={setValueErrorText}
            handleSaveItem={handleSaveItemTake}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default TransactionView;
