import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

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

  const validate = () => {
    let isValid = true;
    if (itemName === '' || itemName.length < 3) {
      setNameErrorText(
        itemName === ''
          ? 'This field is required!'
          : 'Item name must be at least 3 characters'
      );
      isValid = false;
    }
    if (!value || value <= 0) {
      setValueErrorText('Please enter a valid amount');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      handleSaveItem();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      aria-labelledby='form-dialog-title'
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle
        id='form-dialog-title'
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          paddingTop: 3,
          paddingBottom: 2,
        }}
      >
        {isAdd ? 'Add Transaction' : 'Edit Transaction'}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: 1 }}>
        <DialogContentText
          sx={{
            marginBottom: 2,
            color: 'text.secondary',
            fontSize: '0.95rem',
          }}
        >
          Please specify the item name and amount for this transaction.
        </DialogContentText>
        <Stack spacing={2.5}>
          <TextField
            autoFocus
            label='Item Name'
            placeholder='e.g., Lunch, Movie tickets'
            variant='outlined'
            fullWidth
            value={itemName}
            onChange={(e) => {
              const val = e.target.value;
              if (val !== '' && val.length >= 3) {
                setNameErrorText('');
              } else if (val === '') {
                setNameErrorText('This field is required!');
              } else {
                setNameErrorText('Item name must be at least 3 characters');
              }
              setItemName(val);
            }}
            onKeyPress={handleKeyPress}
            error={nameErrorText.length > 0}
            helperText={nameErrorText}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
              },
            }}
          />
          <TextField
            label='Amount'
            placeholder='Enter amount'
            variant='outlined'
            fullWidth
            type='number'
            value={value || ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val && parseInt(val) > 0) {
                setValueErrorText('');
              } else {
                setValueErrorText('Please enter a valid amount');
              }
              setValue(val);
            }}
            onKeyPress={handleKeyPress}
            error={valueErrorText.length > 0}
            helperText={valueErrorText}
            inputProps={{
              min: 1,
              step: 1,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 3, paddingTop: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          variant='outlined'
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            paddingX: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={
            nameErrorText.length > 0 ||
            valueErrorText.length > 0 ||
            itemName.length < 3 ||
            !value ||
            value <= 0
          }
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            paddingX: 3,
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
            },
          }}
        >
          {isAdd ? 'Add' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpence;
