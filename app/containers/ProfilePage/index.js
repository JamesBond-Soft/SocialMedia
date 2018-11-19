import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/edit';
import DeleteIcon from '@material-ui/icons/delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import backImg from '../../../resources/assets/images/back.png';
import avatarImg from '../../../resources/assets/images/avatar.jpg';
import uploadIcon from '../../../resources/assets/images/uploadIcon.png';
import { deleteRow, addRow, updateProfile } from '../../redux/actions/profile';
import AlertDialog from '../../components/Alert';
import {
  findWithAttr } from '../../utils/common';
import {
  DELETE_MESSAGE } from '../../utils/constants';

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      row: {},
      editMode: false,
      profileName: null,
      avatar: null,
      messages: [],
      openDeleteConfirmDialog: false,
      deleteMessageId: 0,
      birthday: null
    };
  }

  componentDidMount() {
    const {
      rows, profileName, avatar, birthday
    } = this.props;
    this.setState({
      messages: rows, profileName, avatar, birthday
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

  /**
   * Event handlers for Avatar change
   */
  onChange(e) {
    e.preventDefault();
    const path = e.target.files[0].path;
    this.setState({ avatar: path });
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
   * Change handler of Table cell
   */
  onChangeTableCell = (id, e) => {
    const newVal = e.target.value;
    const { messages } = this.state;
    const index = findWithAttr(messages, 'id', id);
    messages[index].message = newVal;
    this.setState({
      messages
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
   *  New Message dialog handlers
   *  Method hanlder to show New Message Dialog
   */
  showAddMessageDialog = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false, row: {} });
  };

  handleSave = () => {
    const item = this.state.row;
    item.created = new Date().toLocaleString();
    this.props.dispatch(addRow(item));
    this.setState({ open: false, row: {} });
  }

  _handleMessageChange = (e) => {
    const row = Object.assign({}, this.state.row);
    row.message = e.target.value;
    this.setState({ row });
  }

  /**
   * Open Alert to confirm delete Message item
   */
  showDeleteMessageAlert = (rowId) => {
    this.setState({ deleteMessageId: rowId });
    this.setState({
      openDeleteConfirmDialog: true
    });
  }

  closeAlert = () => {
    this.setState({
      openDeleteConfirmDialog: false
    });
  }

  deleteMessageItem = () => {
    this.props.dispatch(deleteRow(this.state.deleteMessageId));
    this.setState({
      openDeleteConfirmDialog: false
    });
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
      editMode, messages, birthday
    } = this.state;
    console.log('birthday : ', birthday);
    console.log('profilename : ', this.state.profileName);
    const photo = this.state.avatar ? this.state.avatar : avatarImg;
    console.log();
    return (
      <div className={styles.profileContainer}>
        <div className={styles.header}>
          <div className={styles.title}>
                Profile
          </div>
        </div>
        <div className={styles.content} >
          <div className={styles.userInfo}>
            <div className={styles.avatarContainer}>
              <div className={styles.info}>
                <div className={styles.nameContainer}>
                  {
                    editMode ?
                      <input type="text" value={this.state.profileName} onChange={this.onChangeProfileName.bind(this)} placeholder="ProfileName" /> :
                      <input disabled type="text" value={this.state.profileName} placeholder="ProfileName" />
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

              <div className={styles.avatar}>
                <img className={styles.myImg} src={photo} onError={this.defaultImg} />
                {
                  editMode &&
                  <label className={styles.uploadIcon}>
                    <input type="file" onChange={this.onChange.bind(this)} />
                  </label>
                }
              </div>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <div className={styles.sub_title}>
              { this.state.editMode ?
                (<div className={styles.editBtn} onClick={this.saveProfile.bind(this)}>
                  <i className="fa fa-save fa-x" />
                  <span>Save</span>
                </div>) :
                (<div className={styles.editBtn} onClick={this.switchEditMode.bind(this)}>
                  <i className="fa fa-edit fa-x" />
                  <span>Edit</span>
                </div>)
              }
              <span className={styles.title}>Messages</span>
              <div className={styles.addBtn} onClick={this.showAddMessageDialog.bind(this)} >
                {/* <i className="fa fa-plus-circle fa-2x" /> */}
                ADD
              </div>
            </div>
            <div className={styles.messageListContainer}>
              <Paper >
                <Table>
                  <TableBody>
                    {messages.map(row => (
                    <TableRow key={row.id}>
                  {/*     <TableCell padding="none" style={{ textAlign: 'center', width: '20%' }}>
                        <input disabled type="text" value={row.created} />
                      </TableCell> */}
                      <TableCell padding="none" style={{ textAlign: 'center' }}>
                        {
                          editMode ?
                            <textarea type="text" value={row.message} onChange={this.onChangeTableCell.bind(this, row.id)} /> :
                            <textarea disabled type="text" value={row.message} />
                        }
                      </TableCell>
                      <TableCell padding="none" style={{ textAlign: 'center' }}>
                        <IconButton
                          onClick={this.showDeleteMessageAlert.bind(this, row.id)}
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          >
          <DialogTitle id="form-dialog-title">Add</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Message"
              name="message"
              type="text"
              value={this.state.row.message}
              onChange={this._handleMessageChange}
              fullWidth
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
                Save
            </Button>
          </DialogActions>
        </Dialog>
        <AlertDialog isOpen={this.state.openDeleteConfirmDialog} closeAlert={this.closeAlert.bind(this)} deleteItems={this.deleteMessageItem.bind(this)} message={DELETE_MESSAGE} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { profile } = state;
  return {
 rows: profile.rows, avatar: profile.avatarImage, profileName: profile.profileName, birthday: profile.birthday 
};
}

export default connect(mapStateToProps)(ProfilePage);
