// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ipcRenderer, shell } from 'electron';
import styles from './index.scss';
import { addImage } from '../../redux/actions/media';

import Header from '../../components/Header';
import Footer from '../../components/Footer';



type Props = {};

class ImagePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postFileInfo:null 
    };
    this.postImage = this.postImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
       console.log('changed');
  }

  postImage(postFileInfo) {
    // ipcRenderer.send(POST_TEXT, this.state.postText);
    if (postFileInfo) { 
      this.props.dispatch(addImage(postFileInfo));
    }
  }

  openImage(item) {
    shell.openItem(item.path);
  }


  render() {
    const { imageInfos } = this.props;
    return (
      <div className={styles.imagePage}>
         <Header title='Image'/>
          <div className={styles.container}>
              <div className={styles.content}>
              {
                imageInfos && 
                imageInfos.map((item, index) => {
                  return (
                  <div key={index} className = {styles.item}  onClick={() => this.openImage(item)}>
                      <img src={item.path}/>
                      <div className={styles.title}> <span>{item.name}</span></div>
                  </div> );
                })
              }
              </div>
          </div>
          <Footer  postMedia={this.postImage} acceptFileTypes=".png, .jpg, .jpeg"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { media } = state;
  return { imageInfos: media.imageInfos, count: media.count };
}

export default connect(mapStateToProps)(ImagePage);
