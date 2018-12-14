// @flow
import React, { Component } from 'react';
import Styles from './index.scss';
import Profile from '../../components/Profile';
import Timeline from '../../components/Timeline';
import Media from '../../components/Media';
import Facts from '../../components/Facts';

export default class HomePage extends Component<Props> {
  render() {
    return (
      <div className={Styles.homepageContainer}>
        <div className={Styles.container}>
          <div className={Styles.timeline}>
            <Timeline />
          </div>
          <div className={Styles.facts} >
            <Facts />
          </div>
          <div className={Styles.media} >
            <Media />
          </div>
          <div className={Styles.profile} >
            <Profile />
          </div>
        </div>
      </div>
    );
  }
}
