import React from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddExpence = (props) => {
  const {
    isAdd,
    open,
    handleClose,
    itemName,
    setItemName,
    nameErrorText,
    setNameErrorText,
    value,
    setValue,
    valueErrorText,
    setValueErrorText,
    handleSaveItem,
  } = props;

  const vaidate = () => {
    if (itemName === '') setNameErrorText('This field is required!');
    if (!value) setValueErrorText('Incorrect entry.');
    return false;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        {isAdd ? 'Add Expance' : 'Edit Expance'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please, specify the name of the item with their expense.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              autoFocus
              margin='dense'
              label='Item Name'
              fullWidth
              value={itemName}
              onChange={(e) => {
                if (e.target.value !== '') setNameErrorText('');
                else setNameErrorText('This field is required!');
                setItemName(e.target.value);
              }}
              error={nameErrorText.length === 0 ? false : true}
              helperText={nameErrorText}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin='dense'
              label='Value'
              fullWidth
              value={value}
              onChange={(e) => {
                if (e.target.value !== '0' && /^\d+$/.test(e.target.value))
                  setValueErrorText('');
                else setValueErrorText('Incorrect entry.');
                setValue(e.target.value);
              }}
              error={valueErrorText.length === 0 ? false : true}
              helperText={valueErrorText}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={
            nameErrorText === '' &&
            valueErrorText === '' &&
            itemName !== '' &&
            value
              ? handleSaveItem
              : vaidate
          }
          color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpence;
