import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
} from '@material-ui/core';
import AddExpense from '../conponents/AddExpense';
import TransactionCard from '../conponents/TransactionCard';
import ProminentAppBar from '../conponents/ProminentAppBar';
import Page from '../conponents/Page';
import * as monthService from '../services/MonthService';
import * as transactionService from '../services/TransactionService';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';

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
    bottom: 10,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const MonthTxnView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [txnId, setTxnId] = useState(0);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [value, setValue] = useState(0);
  const [nameErrorText, setNameErrorText] = useState('');
  const [valueErrorText, setValueErrorText] = useState('');
  const [month, setMonth] = useState(monthService.findById(id));
  const getTotal = () => {
    return month.transactions
      .map((txn) => parseInt(txn.value))
      .reduce((a, b) => a + b, 0);
  };
  const [total, setTotal] = useState(getTotal());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue(0);
    setItemName('');
    setNameErrorText('');
    setValueErrorText('');
  };

  const handleSaveItem = () => {
    let item = txnId
      ? findTransactionById(txnId)
      : {
        id: ++month.transactionId,
        itemName: itemName,
        value: -value,
        cdate: new Date(),
      };
    [item.itemName, item.value] = [itemName, -value];
    if (!txnId) {
      month.transactions.push(item);
    }
    transactionService.addExpanceInMonth(month);
    setTotal(getTotal());
    setOpen(false);
    setItemName('');
    setValue(0);
    setTxnId(0);
  };
  const onDelete = (id) => {
    transactionService.deleteExpanceOfMonth(month, id);
    setMonth(monthService.findById(month.id));
    setTotal(getTotal());
  };
  const onEdit = (id) => {
    let currTxn = findTransactionById(id);
    setTxnId(id);
    setItemName(currTxn.itemName);
    setValue(Math.abs(currTxn.value));
    setOpen(true);
  };

  const findTransactionById = (txnId) => {
    return month.transactions.filter((txn) => txn.id === txnId)[0];
  };

  return (
    <Page className={classes.root} title={month.name}>
      <div>
        <ProminentAppBar />
        <Grid container justify='center' className={classes.root}>
          <Grid item md={12}>
            <Paper className={classes.paper} style={{ background: '#e6e6e6' }}>
              <Grid container wrap='nowrap' spacing={2}>
                <ListItem
                  style={{ width: '85%' }}
                  component={RouterLink}
                  to='/hisaab/months'>
                  <ListItemAvatar>
                    <Avatar alt={month.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component='span'
                        variant='h5'
                        color='textPrimary'>
                        {month.name}
                      </Typography>
                    }
                  />
                </ListItem>
                <Chip
                  variant='outlined'
                  color={total < 0 ? 'secondary' : 'primary'}
                  size='small'
                  avatar={
                    <Avatar>
                      <b>₹</b>
                    </Avatar>
                  }
                  label={Math.abs(total)}
                />
              </Grid>
              {month.transactions.map((txn, index) => (
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
            <Fab size="medium"
              variant="extended"
              color='secondary'
              className={classes.fabButton}
              onClick={handleOpen}
            >
              <ArrowUpwardRoundedIcon className={classes.extendedIcon} />
                  Add
            </Fab>
            <AddExpense
              isAdd={!txnId}
              open={open}
              handleClose={handleClose}
              itemName={itemName}
              setItemName={setItemName}
              value={value}
              setValue={setValue}
              nameErrorText={nameErrorText}
              setNameErrorText={setNameErrorText}
              valueErrorText={valueErrorText}
              setValueErrorText={setValueErrorText}
              handleSaveItem={handleSaveItem}
            />
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default MonthTxnView;
