// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
import backImg from '../../../resources/assets/images/back.png';
import searchImg from '../../../resources/assets/images/search.png';
type Props = {};

export default class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className={styles.headerContainer}>
            <div className={styles.container} data-tid="container">
                <div className={styles.left}>
                    <div className={styles.backButton} data-tid="backButton">
                        <Link to="/">
                        <img src={backImg}></img>
                        </Link>
                    </div>

                    <div className={styles.searchBox}>
                        <img src={searchImg}></img>
                        <input type='text' ></input>
                    </div>
                </div>

                <div className={styles.title}>
                    <span>{title}</span>
                </div>

                <div className={styles.featureBtnContainer}>
                    <input className={styles.sortByNameBtn} type="button" value="SORTBY NAME"/>
                    <input className={styles.sortByDateBtn} type="button" value="SORTBY DATE"/>
                    <input className={styles.sortBySizeBtn} type="button" value="SORTBY SIZE"/>
                </div>
            </div>
      </div>
    );
  }
}
