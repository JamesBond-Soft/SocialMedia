import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ipcRenderer, shell } from 'electron';
import Webcam from 'react-webcam';
import backImg from '../../../resources/assets/images/back.png';
import { addMedia } from '../../redux/actions/media';
import styles from './index.scss';
import {
  SAVE_IMAGE_REQUEST,
  SAVE_IMAGE_SUCCESS,
  SAVE_IMAGE_FAILURE,
  IMAGE_FILE
} from '../../utils/constants';

class CaptureImagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postFileInfo: null
    };
    this.postImage = this.postImage.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on(SAVE_IMAGE_SUCCESS, (event, path) => {
      console.log(`Saved file ${path}`);
      this.postImage(path);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners([SAVE_IMAGE_SUCCESS]);
  }

  postImage(path) {
    const postFileInfo = this.state.postFileInfo;
    postFileInfo.path = path;
    postFileInfo.fileType = IMAGE_FILE;
    if (postFileInfo) {
      alert('Image Successfully Saved');
      this.props.dispatch(addMedia(postFileInfo));
      this.props.history.push('/');
    }
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    const fileName = `${Date.now()}.png`;
    const file = {};
    file.path = '';
    file.name = fileName;
    this.setState({ postFileInfo: file });
    ipcRenderer.send(SAVE_IMAGE_REQUEST, fileName, imageSrc);
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };

    return (
      <div className={styles.captureImage}>

        <div className={styles.header}>
          <div className={styles.backButton} data-tid="backButton">
            <Link to="/">
              <img src={backImg} />
            </Link>
          </div>
          <div className={styles.title}>
                Capture Image
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.videoContainer}>
            <Webcam
              audio={false}
              height={480}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={650}
              videoConstraints={videoConstraints}
              />
          </div>
          <div className={styles.btnContainer}>
            <button onClick={this.capture}>Capture photo</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { media } = state;
  return { imageInfos: media.imageInfos };
}

export default connect(mapStateToProps)(CaptureImagePage);
