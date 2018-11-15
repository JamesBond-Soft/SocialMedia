// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ipcRenderer, shell } from 'electron';
import thumbnailImg from '../../../resources/assets/images/document_thumbnail.png';
import styles from './index.scss';
import { addDcoument } from '../../redux/actions/media';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import {
  POST_TEXT,
  POST_SUCCESS
} from '../../utils/constants';

type Props = {};

class DocumentPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postFileInfo: null
    };
    this.postDocument = this.postDocument.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('changed');
  }

  postDocument(postFileInfo) {
    // ipcRenderer.send(POST_TEXT, this.state.postText);
    if (postFileInfo) {
      this.props.dispatch(addDcoument(postFileInfo));
    }
  }

  openDocument(item) {
    shell.openItem(item.path);
  }

  /*   renderItems() {
      const { documentInfos } = this.props;
      documentInfos &&
      documentInfos.map((item, index) => {
         return (
         <div className = {styles.item}  onClick={() => this.openDocument(item)}>
            <i className="fa fa-file-o fa-3x" />
            <div className={styles.title}> <span>{item.name}</span></div>
         </div> );
      })
  }  */

  render() {
    const { documentInfos } = this.props;
    return (
      <div className={styles.documentpage}>
        <Header title="Document" />
        <div className={styles.container}>
          <div className={styles.content}>
            {
                documentInfos &&
                documentInfos.map((item, index) => (
                  <div key={index} className={styles.item} onClick={() => this.openDocument(item)}>
                    <i className="fa fa-file-o fa-3x" />
                    <div className={styles.title}> <span>{item.name}</span></div>
                  </div>))
              }
          </div>
        </div>
        <Footer postMedia={this.postDocument} acceptFileTypes=".dox, .docx, .txt, .pdf" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { media } = state;
  return { documentInfos: media.documentInfos, count: media.count };
}

export default connect(mapStateToProps)(DocumentPage);
