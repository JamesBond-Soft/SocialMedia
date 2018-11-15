import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  state = {
    open: this.props.isOpen,
  };


  handleClose = () => {
    this.props.closeAlert();
  };

  handleAgree = () => {
    this.props.deleteItems();
  }

  render() {
    const { isOpen } = this.props;
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{ this.props.message}</DialogTitle>
          <DialogContent>
            {/*  <DialogContentText id="alert-dialog-description">
              { this.props.message}
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
