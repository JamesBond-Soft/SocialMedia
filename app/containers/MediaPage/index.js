// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.scss';
// import Assets from '../../resources/assets';
import document from '../../../resources/assets/images/document.png';
import audio from '../../../resources/assets/images/audio.png';
import video from '../../../resources/assets/images/video.png';
import picture from '../../../resources/assets/images/picture.png';
import backImg from '../../../resources/assets/images/back.png';

type Props = {};

export default class MediaPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={Styles.mediaContainer}>
        
        <div className={Styles.header}>
          <div className={Styles.backButton} data-tid="backButton">
            <Link to="/">
              <img src={backImg} />
            </Link>
          </div>
          <div className={Styles.title}>
                Media
          </div>
        </div>

        <div className={Styles.container}>
          <div className={Styles.column}>

            <div>
              <Link to="/document">
                <div className={Styles.item} style={{ backgroundColor: 'red' }}>
                  <i className="fa fa-file-o fa-3x" />
                  <div className={Styles.title}> <span >Document</span> </div>
                </div>
              </Link>
            </div>

            <div>
              <Link to="/audio">
                <div className={Styles.item} style={{ backgroundColor: 'rgb(170,0,254)' }}>
                  <i className="fa fa-music fa-3x" />
                  <div className={Styles.title}> <span >Music</span> </div>
                </div>
              </Link>
            </div>

          </div>
          <div className={Styles.column}>
            <div>
              <Link to="/image">
                <div className={Styles.item} style={{ backgroundColor: 'rgb(146,225,9)' }}>
                  <i className="fa fa-picture-o fa-3x" />
                  <div className={Styles.title}> <span >Picture</span> </div>
                </div>
              </Link>
            </div>

            <div>
              <Link to="/video">
                <div className={Styles.item} style={{ backgroundColor: 'rgb(250, 186, 69)' }}>
                  <i className="fa fa-play-circle-o fa-3x" />
                  <div className={Styles.title}> <span >Video</span> </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
