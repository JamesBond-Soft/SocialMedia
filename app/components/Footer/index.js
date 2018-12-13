// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
import getFileType from '../../utils/common';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import MediaSelectionModal from '../MediaSelectionModal';
import {
  VIDEO_FILE,
  AUDIO_FILE,
  DOCUMENT_FILE,
  IMAGE_FILE
} from '../../utils/constants';

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

        <MediaSelectionModal
          open={this.state.open}
          onClose={this.handleClose}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default withRouter(Footer);
