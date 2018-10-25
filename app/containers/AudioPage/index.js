// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ipcRenderer, shell } from 'electron';
import styles from './index.scss';
import { addAudio } from '../../redux/actions/media';

import Header from '../../components/Header';
import Footer from '../../components/Footer';



class AudioPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postFileInfo:null 
    };
    this.postAudio = this.postAudio.bind(this);
  }


  postAudio(postFileInfo) {
    if (postFileInfo) { 
      this.props.dispatch(addAudio(postFileInfo));
    }
  }

  openAudio(item) {
    shell.openItem(item.path);
  }

  render() {
    const { audioInfos } = this.props;
    return (
      <div className={styles.audioPage}>
         <Header title='Audio' />
          <div className={styles.container}>
              <div className={styles.content}>
              {
                audioInfos && 
                audioInfos.map((item, index) => {
                  return (
                  <div key={index} className = {styles.item}  onClick={() => this.openAudio(item)}>
                      <i className="fa fa-music fa-3x" /> 
                      <div className={styles.title}> <span>{item.name}</span></div>
                  </div> );
                })
              }
              </div>
          </div>
          <Footer  postMedia={this.postAudio} acceptFileTypes = ".mp3, .wav, .ogg, .wma"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { media } = state;
  return { audioInfos: media.audioInfos };
}

export default connect(mapStateToProps)(AudioPage);
