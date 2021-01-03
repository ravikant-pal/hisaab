import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Chip,
  Divider,
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
import { Search as SearchIcon } from '@material-ui/icons';
import Page from '../conponents/Page';
import * as contactService from '../services/ContactService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    flexGrow: 1,
    spacing: 0,
    alignItems: 'center',
    minHeight: '100vh',
  },
  control: {
    padding: theme.spacing(2),
  },
  fabButton: {
    position: 'fixed',
    zIndex: 1,
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
  searchInput: {
    padding: theme.spacing(2),
  },
}));

const AppView = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [records, setRecords] = useState(contactService.getAllContacts());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveContact = () => {
    contactService.insertContact(contactName);
    setOpen(false);
    setContactName('');
    setRecords(contactService.getAllContacts());
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
          .filter((cnt) => cnt.name.toLowerCase().includes(target.value)),
      );
    } else {
      setRecords(contactService.getAllContacts());
    }
  };

  return (
    <Page className={classes.root} title='Hisaab'>
      <div>
        <ProminentAppBar />
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
            <Button
              variant='contained'
              color='default'
              className={classes.fabButton}
              startIcon={<PersonAddIcon />}
              onClick={handleOpen}>
              New Contact
            </Button>
            <Addcontact
              open={open}
              handleClose={handleClose}
              contactName={contactName}
              setContactName={setContactName}
              handleSaveContact={handleSaveContact}
            />
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default AppView;
