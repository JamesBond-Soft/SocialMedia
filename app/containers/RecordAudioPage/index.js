import React, { Component } from 'react';
import MediaCapturer from 'react-multimedia-capture';
import { ipcRenderer, shell } from 'electron';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addMedia } from '../../redux/actions/timeline';
import backImg from '../../../resources/assets/images/back.png';
import recordVoice from '../../../resources/assets/images/voice_record.png';
import styles from './index.scss';
import {
  SAVE_AUDIO_REQUEST,
  SAVE_AUDIO_SUCCESS,
  AUDIO_FILE
} from '../../utils/constants';

class RecordAudioPage extends React.Component {
  constructor() {
    super();
    this.state = {
      granted: false,
      rejectedReason: '',
      recording: false,
      paused: false,
      postFileInfo: null,
      description: null,
      postDate: new Date().toISOString().slice(0, 10),
      filePath: null
    };

    this.handleRequest = this.handleRequest.bind(this);
    this.handleGranted = this.handleGranted.bind(this);
    this.handleDenied = this.handleDenied.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.handleStreamClose = this.handleStreamClose.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on(SAVE_AUDIO_SUCCESS, (event, path) => {
      this.setState({ open_dialog: true, filePath: path });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners([SAVE_AUDIO_SUCCESS]);
  }

  /**
   * Dialog Event handler
  */
  handleDialogClose = () => {
    this.setState({ open_dialog: false });
  }

  handleDialogSubmit = () => {
    const { description, postDate, filePath } = this.state;
    if (description === null) {
      alert('Description is required');
    } else {
      const postFileInfo = this.state.postFileInfo;
      postFileInfo.path = filePath;
      postFileInfo.fileType = AUDIO_FILE;
      postFileInfo.description = description;
      postFileInfo.postDate = postDate;
      postFileInfo.favorited = false;
      this.props.dispatch(addMedia(postFileInfo));
      this.setState({ open_dialog: false });
      this.props.history.push('/');
    }
  }

  _handleDialogValueChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleRequest() {
    console.log('Request Recording...');
  }

  handleGranted() {
    this.setState({ granted: true });
    console.log('Permission Granted!');
  }

  handleDenied(err) {
    this.setState({ rejectedReason: err.name });
    console.log('Permission Denied!', err);
  }

  handleStart(stream) {
    this.setState({
      recording: true
    });
    console.log('Recording Started.');
  }

  handleStop(blob) {
    this.setState({
      recording: false
    });
    console.log('Recording Stopped.');
    this.saveBlob(blob);
  }

  handlePause() {
    this.setState({
      paused: true
    });
  }

  handleResume(stream) {
    this.setState({
      paused: false
    });
  }

  handleError(err) {
    console.log(err);
  }

  handleStreamClose() {
    this.setState({
      granted: false
    });
  }

  saveBlob(blob) {
    const reader = new FileReader();
    const $this = this;
    reader.onload = function () {
      if (reader.readyState == 2) {
        const buffer = new Buffer(reader.result);
        const fileName = `${Date.now()}.webm`;

        const file = {};
        file.path = '';
        file.name = fileName;
        $this.setState({ postFileInfo: file });

        ipcRenderer.send(SAVE_AUDIO_REQUEST, fileName, buffer);
        console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`);
      }
    };
    reader.readAsArrayBuffer(blob);
  }

  render() {
    const {
      description, granted, rejectedReason, recording, paused
    } = this.state;
    return (
      <div className={styles.recordAudio}>
        <div ref="app">
          <div className={styles.header}>
            <div className={styles.backButton} data-tid="backButton">
              <Link to="/">
                <img src={backImg} />
              </Link>
            </div>
            <div className={styles.title}>
                Record Audio
            </div>
          </div>

          <MediaCapturer
            constraints={{ audio: true }}
            mimeType="audio/webm"
            timeSlice={10}
            onGranted={this.handleGranted}
            onDenied={this.handleDenied}
            onStart={this.handleStart}
            onStop={this.handleStop}
            onPause={this.handlePause}
            onResume={this.handleResume}
            onError={this.handleError}
            onStreamClosed={this.handleStreamClose}
            render={({
              request, start, stop, pause, resume
              }) =>
                (<div className={styles.recordContainer}>
                  <div className={styles.videoContainer}>
                    <div className={styles.voicebox}>
                      <img src={recordVoice} />
                    </div>
                    <div className={styles.btnContainer}>
                      {/*  {!granted && <button onClick={request}>Get Permission</button>} */}
                      { recording ? <button onClick={stop}>Stop</button> : <button onClick={start}>Start</button> }
                      { paused ? <button onClick={resume}>Resume</button> : <button onClick={pause}>Pause</button>}
                    </div>
                  </div>
                 </div>)
                      }
            />

          <Dialog
            open={this.state.open_dialog}
            onClose={this.handleDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Post Detail</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Please input post description and date.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="description"
                id="name"
                label="Description"
                type="text"
                value={description}
                onChange={this._handleDialogValueChange}
                fullWidth
                margin="normal"
                multiline
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
              Cancel
              </Button>
              <Button onClick={this.handleDialogSubmit} color="primary">
              Save
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { timeline } = state;
  return { mediaLists: timeline.mediaLists };
}

export default connect(mapStateToProps)(RecordAudioPage);
