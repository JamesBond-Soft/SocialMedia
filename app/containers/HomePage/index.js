// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './index.scss';
import { shell } from 'electron';
import avatarImg from '../../../resources/assets/images/avatar.png';
import uploadIcon from '../../../resources/assets/images/uploadIcon.png';
import { setAvatar } from '../../redux/actions/profile';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ProfilePage from '../ProfilePage';
import JournalPage from '../JournalPage';
import { addMedia, deleteMedia } from '../../redux/actions/media';
import {
  VIDEO_FILE,
  AUDIO_FILE,
  DOCUMENT_FILE,
  IMAGE_FILE,
  DELETE_ITEM_MSG
} from '../../utils/constants';

import AlertDialog from '../../components/Alert';

const MediaItem = (Props) => {
  let mediaStyle,
    backIcon;
  switch (Props.item.fileType) {
    case VIDEO_FILE:
      mediaStyle = Styles.VideoItem;
      backIcon = 'fa fa-play-circle-o fa-3x';
      break;
    case AUDIO_FILE:
      mediaStyle = Styles.AudioItem;
      backIcon = 'fa fa-music fa-3x';
      break;
    case DOCUMENT_FILE:
      mediaStyle = Styles.DocumentItem;
      backIcon = 'fa fa-file-o fa-3x';
      break;
    case IMAGE_FILE:
      mediaStyle = Styles.ImageItem;
      break;
    default:
      mediaStyle = Styles.OtherItem;
      break;
  }
  return (<div className={mediaStyle} onClick={Props.customClickEvent}>
    { Props.item.fileType !== IMAGE_FILE ? <i className={backIcon} /> : <img src={Props.item.path} alt="image" />}
    { Props.selectedItemIds.includes(Props.item.id) &&
    <div className={Styles.selectBox} >
      <i className="fa fa-check fa-3x" />
    </div>
    }
    <div className={Styles.title}> <span>{Props.item.name}</span></div>
  </div>);
};


class HomePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectionMode: false,
      selectedItemIds: [],
      selectedItem: null,
      open_alert: false
    };
    this.postMedia = this.postMedia.bind(this);
    this.switchSelectMode = this.switchSelectMode.bind(this);
  }

  postMedia(postFileInfo) {
    if (postFileInfo) {
      this.props.dispatch(addMedia(postFileInfo));
    }
  }

  switchSelectMode() {
    this.setState(prevState => ({
      selectionMode: !prevState.selectionMode
    }));
  }

  openMedia = (params) => {
    console.log(params);
  }

  /**
   * This method aims to store selected ids into State selectedItemIds.
   */
  selectItem = (item, e) => {
    const selectedItemIds = this.state.selectedItemIds;
    /**
     * Remove selected item id from List if exists, Add if not exists
     */
    const index = selectedItemIds.indexOf(item.id);
    if (index !== -1) selectedItemIds.splice(index, 1);
    else selectedItemIds.push(item.id);

    this.setState({ selectedItemIds, selectedItem: item });
  }

  /**
   * This method aims to delete selected items
   */
  deleteItems = () => {
    this.props.dispatch(deleteMedia(this.state.selectedItemIds));
    this.setState({
      open_alert: false,
      selectedItemIds: []
    });
  }

  /**
   * Open Confirm Alert for delete item
   */
  showAlert = () => {
    if (this.state.selectedItemIds.length === 0) { return; }
    this.setState({
      open_alert: true
    });
  }

  closeAlert = () => {
    this.setState({
      open_alert: false
    });
  }

  /**
   * Open Selected Item
   */
  openItem = () => {
    const selectedItem = this.state.selectedItem;
    if (selectedItem) {
      shell.openItem(selectedItem.path);
      this.setState({ selectedItem: null, selectedItemIds: [] });
    }
  }

  /**
   * Avatar Hanlders
   */

  onChange(e) {
    e.preventDefault();
    const path = e.target.files[0].path;
    this.setState({ photo: path });
    this.props.dispatch(setAvatar(path));
  }

  defaultImg(e) {
    e.target.src = avatarImg;
  }

  renderItems = () => {
    const { mediaList } = this.props;
    if (mediaList) {
      return (
        mediaList.map((item, index) => (
          <MediaItem {...this.state} customClickEvent={this.selectItem.bind(this, item)} key={index} item={item} />
        ))
      );
    }
  }

  render() {
    const photo = this.props.avatarImage ? this.props.avatarImage : avatarImg;
    return (
      <div className={Styles.homepageContainer}>
        <div className={Styles.container}>
          <div className={Styles.left_side} >
            <Header title="Media" showAlert={this.showAlert.bind(this)} openItem={this.openItem.bind(this)} />
            <div className={Styles.content}>
              {
                 this.renderItems()
              }
            </div>
            <Footer switchSelectMode={this.switchSelectMode} postMedia={this.postMedia} />
            <AlertDialog isOpen={this.state.open_alert} closeAlert={this.closeAlert.bind(this)} deleteItems={this.deleteItems.bind(this)} message={DELETE_ITEM_MSG} />
          </div>
          <div className={Styles.right_side} >
            <div className={Styles.profileContainer}>
              <ProfilePage />
            </div>
            <JournalPage />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { media, profile } = state;
  return { mediaList: media.mediaList, avatarImage: profile.avatarImage, messages: profile.rows, };
}

export default connect(mapStateToProps)(HomePage);
