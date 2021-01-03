import { Grid } from '@material-ui/core';
import React from 'react';
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
    value,
    setValue,
    handleSaveItem,
  } = props;

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
          Please, specify the name of the item with their expaince.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              autoFocus
              margin='dense'
              label='Item Name'
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin='dense'
              label='Value'
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSaveItem} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpence;
