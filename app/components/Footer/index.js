// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import styles from './index.scss';
import getFileType from '../../utils/common';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import {
  VIDEO_FILE,
  AUDIO_FILE,
  DOCUMENT_FILE,
  IMAGE_FILE
} from '../../utils/constants';

const options = [
  'VIDEO',
  'AUDIO',
  'IMAGE',
];

class ConfirmationDialogRaw extends React.Component {
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

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postFileInfo: null,
      dialogOpen: false
    };
  }

  /**
   * When click Record button, This shows dialog to select media type.
   */
  handleClickOpen = () => {
    this.setState({
      open: true,
      selectType: null,
    });
  };

  /**
   * Method for Close dialog
   */
  handleClose = value => {
    this.setState({
      open: false,
    });
    switch (value) {
      case 'VIDEO':
        this.props.history.push('/recordvideo');
        break;
      case 'AUDIO':
        this.props.history.push('/recordaudio');
        break;
      case 'IMAGE':
        this.props.history.push('/captureimage');
        break;
      default:
        break;
    }
  };


  handleChange = (e) => {
    const file = {};
    file.path = e.target.files[0].path;
    file.name = e.target.files[0].name;
    file.fileType = getFileType(file.name);
    // this.setState({ postFileInfo: file });
    this.props.postMedia(file);
  }

  render() {

    return (
      <div className={styles.footerContainer}>
        <div className={styles.BtnContainer}>
          <label className={styles.fileContainer}>
            <span>Attach</span>
            <input type="file" onChange={this.handleChange.bind(this)} />
          </label>
          <span className={styles.postBtn} onClick={this.handleClickOpen} >Record</span>
        </div>

        <ConfirmationDialogRaw
          open={this.state.open}
          onClose={this.handleClose}
          value={this.state.value}
        />
      </div>

    );
  }
}

export default withRouter(Footer);
