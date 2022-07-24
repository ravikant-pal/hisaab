import React, { useState, useEffect } from "react";
import {
  Avatar,
  Chip,
  Fab,
  Grid,
  Paper,
  InputAdornment,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  makeStyles,
  List,
  ListItemAvatar,
  Tooltip,
} from "@material-ui/core";
import Addcontact from "../conponents/AddContact";
import ContactCard from "../conponents/ContactCard";
import ProminentAppBar from "../conponents/ProminentAppBar";
import Tabs from "../conponents/Tabs";
import { PersonAddRounded, SearchRounded } from "@material-ui/icons";
import Page from "../conponents/Page";
import * as contactService from "../services/ContactService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    flexGrow: 1,
    spacing: 0,
  },
  itemList: {
    padding: theme.spacing(0),
  },
  fabButton: {
    position: "fixed",
    zIndex: 1,
    bottom: 35,
    margin: "auto",
    left: "50%",
    transform: "translateX(-50%)",
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
  const [contactName, setContactName] = useState("");
  const [errorText, setErrorText] = useState("");
  const [records, setRecords] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setContactName("");
    setErrorText("");
  };

  const handleSaveContact = () => {
    contactService.insertContact(contactName);
    setOpen(false);
    setContactName("");
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

    if (target.value !== "") {
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

  return (
    <Page className={classes.root} title="Hissab - Contacts">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={4}>
          <ProminentAppBar />
          <Tabs />
          <Paper>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Chip
                    variant="outlined"
                    color={getGrandTotal() < 0 ? "secondary" : "primary"}
                    size="small"
                    avatar={
                      <Avatar>
                        <b>₹</b>
                      </Avatar>
                    }
                    label={Math.abs(getGrandTotal())}
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography component={"span"} variant="h6">
                      Friends
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Search Friends"
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                />
              </ListItem>
            </List>
            <List className={classes.itemList}>
              {records.map((contact, index) => (
                <ContactCard
                  key={index}
                  contact={contact}
                  onDelete={onDelete}
                />
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item>
          <Tooltip title="Add a new key">
            <Fab
              color="secondary"
              variant="extended"
              size="medium"
              aria-label="add new contact"
              className={classes.fabButton}
              onClick={handleOpen}
            >
              <PersonAddRounded className={classes.extendedIcon} /> New Contact
            </Fab>
          </Tooltip>
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
    </Page>
  );
};

export default ContactView;
