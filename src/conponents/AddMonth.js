import React from 'react';
import Button from '@material-ui/core/Button';
import {FormControl, InputLabel, Select, Input, MenuItem, makeStyles, FormHelperText} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const AddMonth = (props) => {
  const {
    open,
    handleClose,
    monthName,
    setMonthName,
    year,
    errorText,
    setErrorText,
    isValid,
    handleSaveMonth,
  } = props;

  const classes = useStyles();

  const handleInputChange = (e) => {
    setMonthName(e.target.value);
    if (isValid(e.target.value)) {
      setErrorText('');
    }else {
      setErrorText('This month already exists!');
    } 
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>New Month</DialogTitle>
      <DialogContent>
      <FormControl className={classes.formControl} error={errorText.length === 0 ? false : true} required >
              <InputLabel htmlFor="month">Month</InputLabel>
              <Select
                labelId="month"
                value={monthName}
                onChange={handleInputChange}
                input={<Input />}
              >
                {months.map((m) => 
                <MenuItem value={m}>{m}</MenuItem>
                )}
                
              </Select>
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} >
              <InputLabel id="year">Year</InputLabel>
              <Select
                labelId="year"
                defaultValue={year}
                input={<Input />}
              >
                <MenuItem value={year}>{year}</MenuItem>
              </Select>
            </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={
            errorText === '' && monthName !== ''
              ? handleSaveMonth
              : () => (errorText) ? '' : setErrorText('This field is required!')
          }
          color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMonth;
