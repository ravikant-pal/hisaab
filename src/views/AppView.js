import React, { useState } from 'react';
import { Button, Grid, makeStyles} from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import  Addcontact  from "../conponents/AddContact";
import ContactCard from "../conponents/ContactCard";
import Page from "../conponents/Page";
import * as contactService from "../services/ContactService";


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      flexGrow: 1,
        spacing: 0,
        alignItems: 'center',
        minHeight: '100vh'
    },
      control: {
        padding: theme.spacing(2),
      },
      fabButton: {
        position: "fixed",
        zIndex: 1,
        bottom: 10,
        left: 0,
        right: 0,
        margin: '0 auto',
      },
  }))


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
    setRecords(contactService.getAllContacts())
  }

  const onDelete = (id) => {
    contactService.deleteContact(id);
    setRecords(contactService.getAllContacts());
  };
  
    return (
      <Page
        className={classes.root}
        title="Home"
      >
        <div>
            <Grid container justify='center' className={classes.root}>
            <Grid item md={12}>
            {records.map((contact,index) => (
                <ContactCard key={index} contact={contact} onDelete={onDelete} />
            ))}
            </Grid>
            <Grid 
                item 
                >
                <Button
                    variant="contained"
                    color="default"
                    className={classes.fabButton}
                    startIcon={<PersonAddIcon />}
                    onClick={handleOpen}
                    >
                    New Contact
                </Button>
                <Addcontact open={open} handleClose={handleClose} contactName={contactName} setContactName={setContactName} handleSaveContact={handleSaveContact} />
                </Grid>
                
            </Grid>
        </div>
      </Page>
    );
}

export default AppView;
