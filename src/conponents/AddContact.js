import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

const Addcontact = (props) => {
  const {
    open,
    handleClose,
    contactName,
    setContactName,
    errorText,
    setErrorText,
    isContactExists,
    handleSaveContact,
    isEditing = false,
  } = props;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setErrorText('This field is required!');
    } else if (value.length < 3) {
      setErrorText('Name must be at least 3 characters long');
    } else if (isContactExists(value)) {
      setErrorText('This contact already exists!');
    } else {
      setErrorText('');
    }
    setContactName(value);
  };

  const handleSubmit = () => {
    if (contactName === '') {
      setErrorText('This field is required!');
    } else if (contactName.length < 3) {
      setErrorText('Name must be at least 3 characters long');
    } else if (errorText === '') {
      handleSaveContact();
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
          fontSize: '1.5rem',
          fontWeight: 600,
          paddingTop: 3,
          paddingBottom: 2,
        }}
      >
        {isEditing ? 'Edit Contact' : 'New Contact'}
      </DialogTitle>
      <DialogContent sx={{ paddingTop: 1 }}>
        <DialogContentText
          sx={{
            marginBottom: 2,
            color: 'text.secondary',
            fontSize: '0.95rem',
          }}
        >
          {isEditing
            ? 'Update the name of your contact.'
            : 'Please, specify the name of the person with whom you are going to track your expenses.'}
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Person Name'
          placeholder='Enter name (min 3 characters)'
          fullWidth
          required
          variant='outlined'
          value={contactName}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          error={errorText.length > 0}
          helperText={errorText}
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
          disabled={errorText.length > 0 || contactName.length < 3}
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
          {isEditing ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Addcontact;
