// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ipcRenderer, shell } from 'electron';
import styles from './index.scss';
import { addVideo } from '../../redux/actions/media';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class VideoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postFileInfo: null
    };
    this.postVideo = this.postVideo.bind(this);
  }


  postVideo(postFileInfo) {
    if (postFileInfo) {
      this.props.dispatch(addVideo(postFileInfo));
    }
  }

  openVideo(item) {
    shell.openItem(item.path);
  }

  componentDidMount() {

  }

  recordVideo() {
    this.props.history.push('/recordvideo');
  }

  render() {
    const { videoInfos } = this.props;
    return (
      <div className={styles.videopage}>
        <Header title="Video" />
        <div className={styles.container}>
          <div className={styles.content}>
            { videoInfos &&
                  videoInfos.map((item, index) => (
                    <div key={index} className={styles.item} onClick={() => this.openVideo(item)}>
                      <i className="fa fa-play-circle-o fa-3x" />
                      <div className={styles.title}> <span>{item.name}</span></div>
                    </div>)) }
          </div>
        </div>
        <Footer postMedia={this.postVideo} acceptFileTypes=".avi, .mp4, .mov" create={this.recordVideo.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { media } = state;
  return { videoInfos: media.videoInfos };
}

export default connect(mapStateToProps)(VideoPage);
