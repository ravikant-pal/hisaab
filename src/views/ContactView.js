import { PersonAddRounded, SearchRounded } from '@mui/icons-material';
import {
  Box,
  Fab,
  InputAdornment,
  List,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Addcontact from '../conponents/AddContact';
import AppContainer from '../conponents/AppContainer';
import ContactCard from '../conponents/ContactCard';
import * as contactService from '../services/ContactService';

const ContactView = () => {
  const [open, setOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [errorText, setErrorText] = useState('');
  const [records, setRecords] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const handleOpen = () => {
    setEditingContact(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setContactName('');
    setErrorText('');
    setEditingContact(null);
  };

  const handleSaveContact = () => {
    if (editingContact) {
      contactService.updateContact(editingContact.id, contactName);
    } else {
      contactService.insertContact(contactName);
    }
    setOpen(false);
    setContactName('');
    setEditingContact(null);
    setRecords(contactService.getAllContacts());
  };

  const isContactExists = (name) => {
    return records.some(
      (cnt) =>
        cnt.name.toLowerCase() === name.toLowerCase() &&
        (!editingContact || cnt.id !== editingContact.id)
    );
  };

  const onEdit = (contact) => {
    setEditingContact(contact);
    setContactName(contact.name);
    setOpen(true);
  };

  const onDelete = (id) => {
    contactService.deleteContact(id);
    setRecords(contactService.getAllContacts());
  };

  const getGrandTotal = () => {
    return records
      .map((cnt) => {
        return cnt.transactions
          .map((txn) => parseInt(txn.value))
          .reduce((a, b) => a + b, 0);
      })
      .reduce((a, b) => a + b, 0);
  };

  const handleSearch = (e) => {
    let target = e.target;

    if (target.value !== '') {
      setRecords(
        contactService
          .getAllContacts()
          .filter((cnt) =>
            cnt.name.toLowerCase().includes(target.value.toLowerCase())
          )
      );
    } else {
      setRecords(contactService.getAllContacts());
    }
  };

  useEffect(() => {
    setRecords(contactService.getAllContacts());
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  return (
    <AppContainer>
      <Box
        sx={{
          padding: { xs: '24px 16px', sm: '32px 24px' },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 0,
          marginBottom: 0,
        }}
      >
        <Stack spacing={2} alignItems='center'>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3rem' },
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            {formatCurrency(getGrandTotal())}
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '8px 20px',
              borderRadius: 5,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  getGrandTotal() < 0
                    ? '#ff4444'
                    : getGrandTotal() > 0
                    ? '#4caf50'
                    : '#ffc107',
              }}
            />
            <Typography
              variant='body1'
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {getGrandTotal() < 0
                ? 'You owe'
                : getGrandTotal() > 0
                ? 'You are owed'
                : 'All Settled Up'}
            </Typography>
          </Box>
          <Typography
            variant='body2'
            sx={{
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: 400,
            }}
          >
            {records.length === 0
              ? 'Start tracking expenses with your friends'
              : `Managing ${records.length} friend${
                  records.length === 1 ? '' : 's'
                }`}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          padding: '16px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          gap: { xs: 1, sm: 1.5 },
          alignItems: 'stretch',
        }}
      >
        <TextField
          placeholder='Search by name...'
          variant='outlined'
          size='medium'
          fullWidth
          sx={{
            backgroundColor: 'white',
            borderRadius: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: '#667eea',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#667eea',
                borderWidth: 2,
              },
            },
            '& .MuiInputBase-input': {
              padding: { xs: '12px 10px', sm: '14px 12px' },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchRounded style={{ color: '#999' }} />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <Tooltip title='Add new friend' arrow placement='left'>
          <Fab
            color='secondary'
            size='medium'
            aria-label='add new contact'
            onClick={handleOpen}
            sx={{
              minHeight: { xs: 44, sm: 48 },
              height: { xs: 44, sm: 48 },
              width: { xs: 44, sm: 48 },
              flexShrink: 0,
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0 6px 24px rgba(102, 126, 234, 0.4)',
              },
            }}
          >
            <PersonAddRounded sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </Fab>
        </Tooltip>
      </Box>

      {records.length === 0 ? (
        <Box
          sx={{
            padding: { xs: '48px 16px', sm: '64px 24px' },
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <PersonAddRounded
            sx={{
              fontSize: 80,
              color: '#d0d0d0',
              marginBottom: 3,
            }}
          />
          <Typography
            variant='h5'
            gutterBottom
            sx={{ fontWeight: 600, color: 'text.primary' }}
          >
            No friends added yet
          </Typography>
          <Typography variant='body1' color='textSecondary' sx={{ mb: 3 }}>
            Start by adding your first friend to track expenses
          </Typography>
        </Box>
      ) : (
        <List
          sx={{
            padding: 0,
            maxHeight: 'calc(100vh - 350px)',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {records.map((contact, index) => (
            <ContactCard
              key={index}
              contact={contact}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </List>
      )}

      <Addcontact
        open={open}
        handleClose={handleClose}
        contactName={contactName}
        setContactName={setContactName}
        errorText={errorText}
        setErrorText={setErrorText}
        isContactExists={isContactExists}
        handleSaveContact={handleSaveContact}
        isEditing={!!editingContact}
      />
    </AppContainer>
  );
};

export default ContactView;
