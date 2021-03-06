import React, { useState } from 'react';
import {
  Avatar,
  Chip,
  Divider,
  Fab,
  Grid,
  Paper,
  InputAdornment,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Addcontact from '../conponents/AddContact';
import ContactCard from '../conponents/ContactCard';
import ProminentAppBar from '../conponents/ProminentAppBar';
import Tabs from '../conponents/Tabs';
import { Search as SearchIcon } from '@material-ui/icons';
import Page from '../conponents/Page';
import * as contactService from '../services/ContactService';

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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  searchInput: {
    padding: theme.spacing(2),
  },
}));

const ContactView = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [errorText, setErrorText] = useState('');
  const [records, setRecords] = useState(contactService.getAllContacts());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setContactName('');
    setErrorText('');
  };

  const handleSaveContact = () => {
    contactService.insertContact(contactName);
    setOpen(false);
    setContactName('');
    setRecords(contactService.getAllContacts());
  };

  const isContactExists = (name) => {
    return records.some((cnt) => cnt.name.toLowerCase() === name.toLowerCase());
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
            cnt.name.toLowerCase().includes(target.value.toLowerCase()),
          ),
      );
    } else {
      setRecords(contactService.getAllContacts());
    }
  };

  return (
    <Page className={classes.root} title='Hissab - Contacts'>
      <div>
        <ProminentAppBar />
        <Tabs />
        <Grid container justify='center' className={classes.root}>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <Grid container wrap='nowrap' spacing={2}>
                <ListItem style={{ width: '85%' }}>
                  <ListItemText
                    primary={
                      <Typography
                        component='span'
                        variant='h5'
                        color='textPrimary'>
                        Friends
                      </Typography>
                    }
                  />
                </ListItem>
                <Chip
                  variant='outlined'
                  color={getGrandTotal() < 0 ? 'secondary' : 'primary'}
                  size='small'
                  avatar={
                    <Avatar>
                      <b>₹</b>
                    </Avatar>
                  }
                  label={Math.abs(getGrandTotal())}
                />
              </Grid>
              <Divider />
              <TextField
                placeholder='Search Friends...'
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
              {records.map((contact, index) => (
                <ContactCard
                  key={index}
                  contact={contact}
                  onDelete={onDelete}
                />
              ))}
            </Paper>
          </Grid>
          <Grid item>
            <Fab size="medium" variant="extended"
              className={classes.fabButton}
              onClick={handleOpen}
            >
              <PersonAddIcon className={classes.extendedIcon} />
              New Contact
            </Fab>
            <Addcontact
              open={open}
              handleClose={handleClose}
              contactName={contactName}
              setContactName={setContactName}
              errorText={errorText}
              setErrorText={setErrorText}
              isContactExists={isContactExists}
              handleSaveContact={handleSaveContact}
            />
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default ContactView;
