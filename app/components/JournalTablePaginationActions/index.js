import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/add';
import IconButton from '@material-ui/core/IconButton';
import styles from './index.scss';
import { addJournal } from '../../redux/actions/journal';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class JournalTablePaginationActions extends React.Component {
    state = {
      open: false,
      row: { date: '', content: '' }
    };

    handleFirstPageButtonClick = event => {
      this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
      this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
      this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleSave = () => {
      const item = this.state.row;
      console.log('item: ', item);
      this.props.dispatch(addJournal(item));
      this.setState({ open: false, row: {} });
    }

    _handleContentChange = (e) => {
      const row = Object.assign({}, this.state.row);
      row.content = e.target.value;
      row.date = new Date().toLocaleString();
      this.setState({ row });
    }


    render() {
      const {
        classes, count, page, rowsPerPage, theme
      } = this.props;
      return (
        <div className={classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleClickOpen.bind(this)}
            aria-label="Add"
           >
            <AddIcon />
          </IconButton>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                multiline
                margin="dense"
                id="name"
                label="Content"
                name="content"
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
        </div>
      );
    }
}

JournalTablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { profile } = state;
  return { rows: profile.rows };
}

const JournalTablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  JournalTablePaginationActions,
);

export default connect(mapStateToProps)(JournalTablePaginationActionsWrapped);

