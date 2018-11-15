import React, { Component } from 'react';
import MediaCapturer from 'react-multimedia-capture';
import { ipcRenderer, shell } from 'electron';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMedia } from '../../redux/actions/media';
import backImg from '../../../resources/assets/images/back.png';
import recordVoice from '../../../resources/assets/images/voice_record.png';
import styles from './index.scss';
import {
  SAVE_AUDIO_REQUEST,
  SAVE_AUDIO_SUCCESS,
  SAVE_AUDIO_FAILURE,
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
      postFileInfo: null
    };

    this.handleRequest = this.handleRequest.bind(this);
    this.handleGranted = this.handleGranted.bind(this);
    this.handleDenied = this.handleDenied.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
    this.postAudio = this.postAudio.bind(this);
    this.handleStreamClose = this.handleStreamClose.bind(this);
  }

  componentDidMount() {
    console.log(' ------------ componentDidMount called ------------------------');
    const $this = this;
    ipcRenderer.on(SAVE_AUDIO_SUCCESS, (event, path) => {
      console.log(' -------------------------- SUCCESS ----------------------');
      console.log(`Saved file ${path}`);
      this.postAudio(path);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners([SAVE_AUDIO_SUCCESS]);
  }

  postAudio(path) {
    const postFileInfo = this.state.postFileInfo;
    postFileInfo.path = path;
    postFileInfo.fileType = AUDIO_FILE;
    if (postFileInfo) {
      alert('Audio Successfully Saved');
      this.props.dispatch(addMedia(postFileInfo));
      this.props.history.push('/');
    }
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
    const granted = this.state.granted;
    const rejectedReason = this.state.rejectedReason;
    const recording = this.state.recording;
    const paused = this.state.paused;

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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { media } = state;
  return { audioInfos: media.audioInfos };
}

export default connect(mapStateToProps)(RecordAudioPage);
