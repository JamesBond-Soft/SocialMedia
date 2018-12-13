import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shell } from 'electron';
import Styles from './index.scss';
import {
  VIDEO_FILE,
  AUDIO_FILE,
  DOCUMENT_FILE,
  IMAGE_FILE,
  DELETE_ITEM_MSG
} from '../../utils/constants';
import Header from '../../components/Header';

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
      backIcon = 'fa fa-file-o fa-3x';
      break;
  }
  return (<div className={mediaStyle} >
    { Props.item.fileType !== IMAGE_FILE ?
      <div className={Styles.thumbnail} onClick={Props.customClickEvent}>
        <i className={backIcon} />
        <div className={Styles.title}> <span>{Props.item.name}</span></div>
      </div> :
      <div className={Styles.thumbnail} onClick={Props.customClickEvent}>
        <img src={Props.item.path} alt="image" />
        <div className={Styles.title}> <span>{Props.item.name}</span></div>
      </div>
    }
    { Props.selectedItemIds.includes(Props.item.id) &&
      <div className={Styles.selectBox} >
        <i className="fa fa-check fa-3x" />
      </div>
      }
    <div className={Styles.mediaInfo} >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={Styles.mediaDate}>{Props.item.postDate}</div>
      </div>
      <div>
        <div className={Styles.description}>
          {Props.item.description}
        </div>
      </div>
    </div>
  </div>);
};

class Facts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionMode: false,
      selectedItemIds: [],
      selectedItem: null,
      open_alert: false,
      open_dialog: false,
      description: null,
      postDate: new Date().toISOString().slice(0, 10),
      postFileInfo: {},
    };
  }

  switchSelectMode = () => {
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
  selectItem = (item) => (e) => {
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
   * Open Selected Item
   */
  openItem = () => {
    const selectedItem = this.state.selectedItem;
    if (selectedItem) {
      shell.openItem(selectedItem.path);
      this.setState({ selectedItem: null, selectedItemIds: [] });
    }
  }

  renderItems = () => {
    const { factsMediaList, timelineMediaList } = this.props;
    let filterList = factsMediaList.concat(timelineMediaList);
    console.log('filtered List: ', filterList);
    // sort mediaList by Date
    filterList = filterList.sort((a, b) => b.postDate - a.postDate);
    if (filterList) {
      return (
        filterList.map((item, index) => (
          <MediaItem {...this.state} customClickEvent={this.selectItem(item)} key={index} item={item} />
        ))
      );
    }
  }

  render() {
    const { description, postDate } = this.state;
    return (
      <div className={Styles.mediaContainer}>
        <Header openItem={this.openItem.bind(this)} logout={this.logout} />
        <div className={Styles.content}>
          {
            this.renderItems()
          }
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { facts, timeline } = state;
  return {
    factsMediaList: facts.mediaList,
    timelineMediaList: timeline.mediaList
  };
}

export default connect(mapStateToProps)(Facts);
