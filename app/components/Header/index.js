// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import styles from './index.scss';
import backImg from '../../../resources/assets/images/back.png';
import searchImg from '../../../resources/assets/images/search.png';

type Props = {};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  openItem = (param) => (e) => {
    console.log(' open Item : ', param);
    console.log(' event : ', e);
  }

  render() {
    const { title } = this.props;
    return (
      <div className={styles.headerContainer}>
        <div className={styles.container} data-tid="container">
          <div className={styles.toolbar} />
          <div className={styles.featureContainer}>
            <div className={styles.title}>
              <span>{title}</span>
            </div>

            <div className={styles.featureBtnContainer}>
              <span className={styles.viewIcon} onClick={this.props.openItem}>VIEW</span>
              <i className="fa fa-trash fa-2x" onClick={this.props.showAlert} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
