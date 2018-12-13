import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { shell } from 'electron';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addMedia, deleteMedia } from '../../redux/actions/facts';
import Styles from './index.scss';
import {
  VIDEO_FILE,
  AUDIO_FILE,
  DOCUMENT_FILE,
  IMAGE_FILE,
  DELETE_ITEM_MSG
} from '../../utils/constants';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
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
    this.postMedia = this.postMedia.bind(this);
  }


  postMedia(postFileInfo) {
    console.log(' ---------------- Facts ----------- ');
    // Show Dialog to input Description, Date
    this.setState({ open_dialog: true });
    if (postFileInfo) {
      this.setState({ postFileInfo });
    }
  }

  /**
   * Dialog Event handler
  */
  handleDialogClose = () => {
    this.setState({ open_dialog: false });
  }

  handleDialogSubmit = () => {
    const { description, postDate } = this.state;
    if (this.description === null) {
      alert('Description is required');
    } else {
      const postFileInfo = this.state.postFileInfo;
      postFileInfo.description = description;
      postFileInfo.postDate = postDate;
      postFileInfo.favorited = false;
      this.props.dispatch(addMedia(postFileInfo));
      this.setState({ open_dialog: false });
    }
  }

  _handleDialogValueChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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

  renderItems = () => {
    const { mediaList } = this.props;
    const { showFavoriteLists } = this.state;
    let filterList;
    if (showFavoriteLists) {
      filterList = mediaList.filter(item => item.favorited === true);
    } else {
      filterList = mediaList.slice();
    }
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
      <div className={Styles.factsContainer}>
        <Header showAlert={this.showAlert.bind(this)} openItem={this.openItem.bind(this)} logout={this.logout} />
        <div className={Styles.content}>
          {
            this.renderItems()
          }
        </div>
        <Footer switchSelectMode={this.switchSelectMode} postMedia={this.postMedia} />
        <AlertDialog isOpen={this.state.open_alert} closeAlert={this.closeAlert.bind(this)} deleteItems={this.deleteItems.bind(this)} message={DELETE_ITEM_MSG} />
        <Dialog
          open={this.state.open_dialog}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Post Detail</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please input post description and date.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="description"
              id="name"
              label="Description"
              type="text"
              value={description}
              onChange={this._handleDialogValueChange}
              fullWidth
              margin="normal"
              multiline
            />
            <TextField
              id="date"
              label="Date"
              type="date"
              name="postDate"
              InputLabelProps={{
                          shrink: true,
                        }}
              value={postDate}
              onChange={this._handleDialogValueChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDialogSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { facts } = state;
  return {
    mediaList: facts.mediaList
  };
}

export default connect(mapStateToProps)(Facts);
