import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const options = [
  'VIDEO',
  'AUDIO',
  'IMAGE',
];

class MediaSelectionModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

    handleEntering = () => {
      this.radioGroupRef.focus();
    };

    handleCancel = () => {
      this.props.onClose(this.props.value);
    };

    handleOk = () => {
      this.props.onClose(this.state.value);
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {
      const { value, ...other } = this.props;

      return (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          onEntering={this.handleEntering}
          aria-labelledby="confirmation-dialog-title"
          {...other}
        >
          <DialogTitle id="confirmation-dialog-title">Select Media Type</DialogTitle>
          <DialogContent>
            <RadioGroup
              ref={ref => {
                this.radioGroupRef = ref;
              }}
              aria-label="Ringtone"
              name="ringtone"
              value={this.state.value}
              onChange={this.handleChange}
            >
              {options.map(option => (
                <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
}

MediaSelectionModal.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

export default MediaSelectionModal;
