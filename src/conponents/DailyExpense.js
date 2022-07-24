import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Chip,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TransactionCardWithoutDate from "./TransactionCardWithoutDate";
import * as transactionService from "../services/TransactionService";
import * as dailyService from "../services/DailyService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    flexGrow: 1,
    spacing: 0,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(0)}px auto`,
    padding: theme.spacing(2),
  },
  "& .MuiDialog-paper": {
    margin: "5px",
  },
  test: {
    margin: theme.spacing(1),
  },
}));

const DailyExpense = (props) => {
  const classes = useStyles();
  const { date, setDate, open, setOpen } = props;
  const [txnId, setTxnId] = useState(0);
  const [itemName, setItemName] = useState("");
  const [value, setValue] = useState(0);
  const [nameErrorText, setNameErrorText] = useState("");
  const [valueErrorText, setValueErrorText] = useState("");

  const findTransactionById = (txnId) => {
    return date.transactions.filter((txn) => txn.id == txnId)[0];
  };

  const getTotal = () => {
    return date.transactions
      .map((txn) => parseInt(txn.value))
      .reduce((a, b) => a + b, 0);
  };

  const handleClose = () => {
    setOpen(false);
    setValue(0);
    setItemName("");
    setNameErrorText("");
    setValueErrorText("");
  };

  const handleSaveItem = () => {
    let item = txnId
      ? findTransactionById(txnId)
      : {
          id: ++date.transactionId,
          itemName: itemName,
          value: -value,
          cdate: new Date(),
        };
    [item.itemName, item.value] = [itemName, -value];
    if (!txnId) {
      date.transactions.unshift(item);
    }
    transactionService.addDailyExpance(date);
    setItemName("");
    setValue(0);
    setTxnId(0);
  };
  const onDelete = (id) => {
    transactionService.deleteDailyExpance(date, id);
    setDate(dailyService.findById(date.id));
  };
  const onEdit = (id) => {
    let currTxn = findTransactionById(id);
    setTxnId(id);
    setItemName(currTxn.itemName);
    setValue(Math.abs(currTxn.value));
    setOpen(true);
  };

  const vaidate = () => {
    if (itemName === "") setNameErrorText("This field is required!");
    if (!value) setValueErrorText("Incorrect entry.");
    return false;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Grid container wrap="nowrap" spacing={2}>
              <ListItem>
                <ListItemAvatar>
                  <EventAvailableIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                    >
                      {date.name}
                    </Typography>
                  }
                />
              </ListItem>
              <Chip
                variant="outlined"
                color={getTotal() < 0 ? "secondary" : "primary"}
                size="small"
                avatar={
                  <Avatar>
                    <b>₹</b>
                  </Avatar>
                }
                label={Math.abs(getTotal())}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {date.transactions.length > 0 ? (
          <Grid container justify="center" className={classes.root}>
            <Grid item md={12}>
              <Paper
                className={classes.paper}
                style={{ background: "#e6e6e6" }}
              >
                {date.transactions.map((txn, index) => (
                  <TransactionCardWithoutDate
                    key={index}
                    txn={txn}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))}
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Grid container justify="center" className={classes.test}>
          <Grid item md={6}>
            <TextField
              autoFocus
              margin="dense"
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => {
                if (e.target.value !== "") setNameErrorText("");
                else setNameErrorText("This field is required!");
                setItemName(e.target.value);
              }}
              error={nameErrorText.length === 0 ? false : true}
              helperText={nameErrorText}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="dense"
              label="Value"
              variant="outlined"
              value={value}
              onChange={(e) => {
                if (e.target.value !== "0" && /^\d+$/.test(e.target.value))
                  setValueErrorText("");
                else setValueErrorText("Incorrect entry.");
                setValue(e.target.value);
              }}
              error={valueErrorText.length === 0 ? false : true}
              helperText={valueErrorText}
            />
          </Grid>
          <Grid item md={12}>
            <Grid container justify="flex-end">
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={
                  nameErrorText === "" &&
                  valueErrorText === "" &&
                  itemName !== "" &&
                  value
                    ? handleSaveItem
                    : vaidate
                }
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default DailyExpense;
