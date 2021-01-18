import React from 'react';
import Button from '@material-ui/core/Button';
import {
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  makeStyles,
  FormHelperText,
  Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
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
  alert: {
    margin: theme.spacing(1),
  },
}));

const AddMonth = (props) => {
  const {
    open,
    handleClose,
    monthName,
    setMonthName,
    year,
    isValid,
    setYear,
    errorText,
    setErrorText,
    handleSaveMonth,
  } = props;

  const classes = useStyles();

  const years = [
    parseInt(year) - 2,
    parseInt(year) - 1,
    parseInt(year),
    parseInt(year) + 1,
    parseInt(year) + 2,
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>New Month</DialogTitle>
      <DialogContent>
        {errorText ? (
          <Alert severity='error' className={classes.alert}>
            {errorText}
          </Alert>
        ) : (
          ''
        )}
        <Grid container>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <FormControl
              className={classes.formControl}
              error={errorText.length === 0 ? false : true}
              required>
              <InputLabel htmlFor='month'>Month</InputLabel>
              <Select
                labelId='month'
                value={monthName}
                onChange={(e) => {
                  setMonthName(e.target.value);
                  isValid(e.target.value, year);
                }}
                input={<Input />}>
                {months.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={6} xl={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id='year'>Year</InputLabel>
              <Select
                labelId='year'
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  isValid(monthName, e.target.value);
                }}
                input={<Input />}>
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={
            errorText === '' && monthName !== ''
              ? handleSaveMonth
              : () => (errorText ? '' : setErrorText('fields are required!'))
          }
          color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMonth;
