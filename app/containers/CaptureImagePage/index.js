import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ipcRenderer, shell } from 'electron';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import backImg from '../../../resources/assets/images/back.png';
import { addMedia } from '../../redux/actions/timeline';
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
      postFileInfo: null,
      description: null,
      postDate: new Date().toISOString().slice(0, 10),
      filePath: null
    };
  }

  componentDidMount() {
    ipcRenderer.on(SAVE_IMAGE_SUCCESS, (event, path) => {
      this.setState({ open_dialog: true, filePath: path });
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners([SAVE_IMAGE_SUCCESS]);
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
      postFileInfo.fileType = IMAGE_FILE;
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
    const { description } = this.state;
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
    );
  }
}

function mapStateToProps(state) {
  const { timeline } = state;
  return { imageInfos: timeline.imageInfos };
}

export default connect(mapStateToProps)(CaptureImagePage);
