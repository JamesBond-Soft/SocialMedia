// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
type Props = {};

export default class Footer extends Component {

  constructor(props) {
        super(props);
        this.state = {
            postFileInfo: null 
        };
  }

  handleChange(e) {
        var file = {};
        file.path = e.target.files[0].path; 
        file.name = e.target.files[0].name; 
        //var path = e.target.files[0].path;
        //console.log(e.target.files[0].name);
        this.setState({ postFileInfo: file });
  }

  post() {
    if (this.state.postFileInfo) { 
        //this.props.dispatch(addDcoument(this.state.postFileInfo));
        this.props.postMedia(this.state.postFileInfo);
        this.setState({postFileInfo: null});
    }
  }

  render() {
    const { acceptFileTypes }= this.props;
    return (
      <div className={styles.footerContainer}>
                 <div className={styles.BtnContainer}>
                       <div className={styles.previewTitle}>{this.state.postFileInfo? this.state.postFileInfo.name: 'Attached File Name'}</div> 
                        <label className={styles.fileContainer}>
                          <span>...</span>
                        <input type="file" accept={this.props.acceptFileTypes} onChange ={this.handleChange.bind(this)} />
                        </label>
                        <span className={styles.postBtn}  onClick={this.post.bind(this)} >Post</span>
                  </div>  
      </div>
    );
  }
}
