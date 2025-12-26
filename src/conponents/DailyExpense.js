import { DeleteForeverRounded, EditRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import * as dailyService from '../services/DailyService';
import * as transactionService from '../services/TransactionService';

const DailyExpense = (props) => {
  const { date, setDate, open, setOpen } = props;
  const [txnId, setTxnId] = useState(0);
  const [itemName, setItemName] = useState('');
  const [value, setValue] = useState('');
  const [nameErrorText, setNameErrorText] = useState('');
  const [valueErrorText, setValueErrorText] = useState('');

  console.log('DailyExpense render - open:', open, 'date:', date);
  const findTransactionById = (txnId) => {
    return date.transactions.filter((txn) => txn.id == txnId)[0];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getTotal = () => {
    if (!date || !date.transactions || !Array.isArray(date.transactions)) {
      return 0;
    }
    const total = date.transactions
      .map((txn) => parseInt(txn.value))
      .reduce((a, b) => a + b, 0);

    return total;
  };

  const handleClose = () => {
    setOpen(false);
    setValue('');
    setItemName('');
    setNameErrorText('');
    setValueErrorText('');
    setTxnId(0);
  };

  const handleSaveItem = () => {
    if (!date || !date.transactions) return;

    if (txnId) {
      // Edit existing transaction
      let item = findTransactionById(txnId);
      if (item) {
        item.itemName = itemName;
        item.value = -value;
      }
    } else {
      // Add new transaction
      const newItem = {
        id: ++date.transactionId,
        itemName: itemName,
        value: -value,
        cdate: new Date(),
      };
      date.transactions.unshift(newItem);
    }

    transactionService.addDailyExpance(date);
    setItemName('');
    setValue('');
    setTxnId(0);
    setNameErrorText('');
    setValueErrorText('');
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

  const validate = () => {
    if (itemName === '' || itemName.length < 3) {
      setNameErrorText('Minimum 3 characters required!');
      return false;
    }
    if (!value) {
      setValueErrorText('Incorrect entry.');
      return false;
    }
    return true;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      PaperProps={{
        sx: {
          borderRadius: 3,
          minWidth: { xs: '90%', sm: 400 },
        },
      }}
    >
      <DialogTitle
        id='form-dialog-title'
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          pb: 2,
        }}
      >
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12}>
            <Grid
              container
              wrap='nowrap'
              spacing={2}
              alignItems='center'
              justifyContent='space-between'
            >
              <Grid item xs>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{ fontWeight: 600 }}
                >
                  {date?.name || 'Daily Expense'}
                </Typography>
              </Grid>

              <Grid item>
                <Box
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    px: 2,
                    py: 0.5,
                    fontSize: '0.9rem',
                  }}
                >
                  {formatCurrency(Math.abs(getTotal()))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ pt: 2, pb: 1 }}>
        {/* Transactions List */}
        {date && date.transactions && date.transactions.length > 0 ? (
          <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              my: 2,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
            }}
          >
            {date.transactions.map((txn, index) => (
              <Box
                key={index}
                sx={{
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  mb: index < date.transactions.length - 1 ? 1 : 0,
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
                    {txn.itemName}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{
                      color: txn.value < 0 ? '#ff4444' : '#4caf50',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    {formatCurrency(Math.abs(txn.value))}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <IconButton
                    size='small'
                    onClick={() => onEdit(txn.id)}
                    sx={{
                      color: '#667eea',
                      '&:hover': {
                        backgroundColor: '#e8eaf6',
                      },
                    }}
                  >
                    <EditRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() => onDelete(txn.id)}
                    sx={{
                      color: '#ff4444',
                      '&:hover': {
                        backgroundColor: '#ffebee',
                      },
                    }}
                  >
                    <DeleteForeverRounded sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 2,
              color: 'text.secondary',
              mb: 2,
            }}
          >
            <Typography variant='body2'>
              No expenses yet. Add your first expense below.
            </Typography>
          </Box>
        )}

        {/* Add Expense Form */}
        <Box
          sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Typography
            variant='subtitle2'
            sx={{ mb: 1.5, fontWeight: 600, color: '#667eea' }}
          >
            {txnId ? 'Update Expense' : 'Add New Expense'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <TextField
                autoFocus
                label='Item Name'
                variant='outlined'
                fullWidth
                size='small'
                value={itemName}
                onChange={(e) => {
                  const val = e.target.value;
                  setItemName(val);
                  if (val.length >= 3) {
                    setNameErrorText('');
                  } else if (val === '') {
                    setNameErrorText('This field is required!');
                  } else {
                    setNameErrorText('Minimum 3 characters required!');
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && validate()) {
                    handleSaveItem();
                  }
                }}
                error={nameErrorText.length > 0}
                helperText={nameErrorText}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label='Value'
                variant='outlined'
                fullWidth
                size='small'
                value={value}
                onChange={(e) => {
                  const val = e.target.value;
                  setValue(val);
                  if (val !== '0' && /^\d+$/.test(val)) {
                    setValueErrorText('');
                  } else {
                    setValueErrorText('Incorrect entry.');
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && validate()) {
                    handleSaveItem();
                  }
                }}
                error={valueErrorText.length > 0}
                helperText={valueErrorText}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}
      >
        <Button
          onClick={handleClose}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
          }}
        >
          Close
        </Button>
        <Button
          onClick={
            nameErrorText === '' &&
            valueErrorText === '' &&
            itemName !== '' &&
            value
              ? handleSaveItem
              : validate
          }
          variant='contained'
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
            },
          }}
        >
          {txnId ? 'Update Expense' : 'Add Expense'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DailyExpense;
