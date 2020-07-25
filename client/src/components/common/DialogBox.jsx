import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog=({open,setOpen,dialogData,value,setValue,clickFunc})=>{


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">{dialogData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {dialogData.msg}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={dialogData.label}
            value={value}
            onChange={setValue}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={clickFunc} color="primary">
            {dialogData.proceedText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;
