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

  render() {
    const { title } = this.props;
    return (
      <div className={styles.headerContainer}>
        <div className={styles.container} data-tid="container">
          <div className={styles.left}>
            <div className={styles.searchBox}>
              <img src={searchImg} />
              <input type="text" />
            </div>
          </div>

          <div className={styles.title}>
            <span>{title}</span>
          </div>

          <div className={styles.featureBtnContainer}>
            <i className="fa fa-eye fa-2x" onClick={this.props.openItem} />
            <i className="fa fa-trash fa-2x" onClick={this.props.showAlert} />
            <i className="fa fa-share-alt fa-2x" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
