import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  } = props;

  const handleInputChange = (e) => {
    if (e.target.value === "") {
      setErrorText("This field is required!");
    } else if (isContactExists(e.target.value)) {
      setErrorText("This contact already exists!");
    } else {
      setErrorText("");
    }
    setContactName(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Contact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please, specify the name of the person with whom you are going to
          track your expenses.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Person Name"
          fullWidth
          required
          variant="outlined"
          value={contactName}
          onChange={handleInputChange}
          error={errorText.length === 0 ? false : true}
          helperText={errorText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={
            errorText === "" && contactName !== ""
              ? handleSaveContact
              : () => (errorText ? "" : setErrorText("This field is required!"))
          }
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Addcontact;
