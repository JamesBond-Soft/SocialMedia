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
import uploadIcon from '../../../resources/assets/images/uploadIcon.png';
import { deleteRow, addRow, updateProfile } from '../../redux/actions/profile';
import AlertDialog from '../../components/Alert';
import {
  findWithAttr } from '../../utils/common';
import {
  DELETE_MESSAGE } from '../../utils/constants';
import { updateJournalList, addJournal, deleteJournal } from '../../redux/actions/journal';

class JournalPage extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      row: {},
      editMode: false,
      journalList: [],
      openDeleteConfirmDialog: false,
      deleteItemId: 0
    };
  }

  componentDidMount() {
    console.log('componentDidMount : ', this.props.journalList);
    const { journalList } = this.props;
    this.setState({ journalList });
  }
  /**
   *
   */
  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      const { journalList } = newProps;
      this.setState({ journalList });
    }
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
   * Change handler of Table cell
   */
  onChangeTableCell = (id, e) => {
    const newVal = e.target.value;
    const { journalList } = this.state;
    const index = findWithAttr(journalList, 'id', id);
    journalList[index].content = newVal;
    this.setState({
      journalList
    });
  }
  /**
   * This Method aims to update new Profile
   */

  saveJournal = () => {
    const { journalList } = this.state;
    this.props.dispatch(updateJournalList(journalList));
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  /**
   *  New Message dialog handlers
   *  Method hanlder to show New Message Dialog
   */
  showAddJournalDialog = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false, row: {} });
  };

  handleSave = () => {
    const item = this.state.row;
    item.created = new Date().toLocaleString();
    this.props.dispatch(addJournal(item));
    this.setState({ open: false, row: {} });
  }

  _handleContentChange = (e) => {
    const row = Object.assign({}, this.state.row);
    row.content = e.target.value;
    this.setState({ row });
  }

  /**
   * Open Alert to confirm delete Message item
   */
  showDeletJournalAlert = (rowId) => {
    this.setState({ deleteItemId: rowId });
    this.setState({
      openDeleteConfirmDialog: true
    });
  }

  closeAlert = () => {
    this.setState({
      openDeleteConfirmDialog: false
    });
  }

  deleteJournalItem = () => {
    console.log('delete id : ', this.state.deleteItemId);
    const { deleteItemId } = this.state;
    this.props.dispatch(deleteJournal(deleteItemId));
    this.setState({
      openDeleteConfirmDialog: false
    });
  }

  render() {
    const {
      rowsPerPage, page, editMode, journalList
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, journalList.length - page * rowsPerPage);
    return (
      <div className={styles.JournalContainer}>
        <div className={styles.content} >
          <div className={styles.tableContainer}>

            <div className={styles.sub_title}>
              { this.state.editMode ?
                (<div className={styles.editBtn} onClick={this.saveJournal.bind(this)}>
                  <i className="fa fa-save fa-x" />
                  <span>Save</span>
                </div>) :
                (<div className={styles.editBtn} onClick={this.switchEditMode.bind(this)}>
                  <i className="fa fa-edit fa-x" />
                  <span>Edit</span>
                </div>)
              }
              <span className={styles.title}>Journal</span>
              <div className={styles.addBtn} onClick={this.showAddJournalDialog.bind(this)} >
                {/* <i className="fa fa-plus-circle fa-2x" /> */}
                ADD
              </div>
            </div>
            <div className={styles.journalListContainer}>
              <Paper >
                <Table>
                  <TableBody>
                    {journalList.map(row => (
                    <TableRow key={row.id}>
                      {/*  <TableCell padding="none" style={{ textAlign: 'center', width: '20%'}}>
                        <input disabled type="text" value={row.created} />
                      </TableCell> */}
                      <TableCell padding="none" style={{ textAlign: 'center' }}>
                        {
                          editMode ?
                            <textarea type="text" value={row.content} onChange={this.onChangeTableCell.bind(this, row.id)} /> :
                            <textarea disabled type="text" value={row.content} />
                        }
                      </TableCell>
                      <TableCell padding="none" style={{ textAlign: 'center' }}>
                        <IconButton
                          onClick={this.showDeletJournalAlert.bind(this, row.id)}
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
              label="Content"
              name="Content"
              type="text"
              value={this.state.row.content}
              onChange={this._handleContentChange}
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
        <AlertDialog isOpen={this.state.openDeleteConfirmDialog} closeAlert={this.closeAlert.bind(this)} deleteItems={this.deleteJournalItem.bind(this)} message={DELETE_MESSAGE} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { journal } = state;
  return { journalList: journal.journals };
}

export default connect(mapStateToProps)(JournalPage);
