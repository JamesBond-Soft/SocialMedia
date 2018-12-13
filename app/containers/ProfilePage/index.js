import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import avatarImg from '../../../resources/assets/images/avatar.jpg';
import { updateProfile } from '../../redux/actions/profile';
import ImageCarousel from '../../components/ImageCarousel';
import styles from './index.scss';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      profileName: null,
      avatar: null,
      birthday: null
    };
  }

  componentDidMount() {
    const {
      profileName, avatar, birthday
    } = this.props;
    this.setState({
      profileName, avatar, birthday
    });
  }

  /**
   *
   */
  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      const {
        rows, profileName, avatar, birthday
      } = newProps;
      this.setState({
        messages: rows, profileName, avatar, birthday
      });
    }
  }


  defaultImg(e) {
    e.target.src = avatarImg;
  }

  /**
   * Switch View to Edit Mode
   */
  switchEditMode() {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  /**
   * Change event handler for Profile name
   */
  onChangeProfileName = (e) => {
    this.setState({
      profileName: e.target.value
    });
  }

  /**
   * This Method aims to update new Profile
   */

  saveProfile = () => {
    const {
      avatar, profileName, messages, birthday
    } = this.state;
    const newProfile = {};
    newProfile.avatar = avatar;
    newProfile.profileName = profileName;
    newProfile.messages = messages;
    newProfile.birthday = birthday;
    this.props.dispatch(updateProfile(newProfile));
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  /**
   * Birthday Date Picker Change hanlder
   */
  onChangeBirthday = (e) => {
    const value = e.target.value;
    this.setState({ birthday: value });
  }

  render() {
    const {
      editMode, birthday
    } = this.state;
    const photo = this.state.avatar ? this.state.avatar : avatarImg;
    console.log();
    return (
      <div className={styles.profileContainer}>
        <div className={styles.toolbar}>
          <div className={styles.info}>
            <div className={styles.nameContainer}>
              {
                        editMode ?
                          <input type="text" style={{ border: '1px solid grey' }} value={this.state.profileName} onChange={this.onChangeProfileName.bind(this)} placeholder="Name" /> :
                          <input disabled type="text" value={this.state.profileName} placeholder="Name" />
                      }
            </div>
            <div className={styles.birthdayContainer}>
              {
                      editMode ?
                        <TextField
                          id="date"
                          label="Birthday"
                          type="date"
                          className={styles.picker}
                          InputLabelProps={{
                          shrink: true,
                        }}
                          value={birthday}
                          onChange={this.onChangeBirthday.bind(this)}
                      /> :
                        <TextField
                          id="date"
                          label="Birthday"
                          type="date"
                          className={styles.picker}
                          value={birthday}
                          InputLabelProps={{
                          shrink: true,
                        }}
                          disabled
                      />
                    }
            </div>
          </div>
        </div>

        <div className={styles.header}>
          <div className={styles.title}>
                Profile
          </div>
        </div>
        <div className={styles.content} >
          <div className={styles.userInfo}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                <ImageCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { profile, timeline, facts } = state;
  return {
    profileName: profile.profileName, birthday: profile.birthday, timelineMediaList: timeline.mediaList, factsMediaList: facts.mediaList
  };
}

export default connect(mapStateToProps)(ProfilePage);
