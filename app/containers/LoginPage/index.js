import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './index.scss';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { login } from '../../redux/actions/user';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'jordan0122',
      password: '123456',
      usernameErrorMsg: null,
      psdErrorMsg: null,
      isValid: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Login Handler
  submit = () => {
    this.setState({
      usernameErrorMsg: null,
      psdErrorMsg: null,
    });
    /* Validation Process */
    const {
      username, password
    } = this.state;
    if (username === '') {
      this.setState({ usernameErrorMsg: 'Ussername or Email is required!', isValid: false });
      return;
    }
    if (password === '') {
      this.setState({ psdErrorMsg: 'Password is required!', isValid: false });
      return;
    }
    this.props.dispatch(login(username, password));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token == null && this.props.token !== null) {
      this.props.history.push('/home');
    }
  }

  componentDidMount() {
    if (this.props.token !== null)
    { this.props.history.push('/home'); }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={Styles.container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.content}>
            <div className={Styles.titleContainer}>
              <p> SOCIAL MEDIA </p>
            </div>
            <div className={Styles.formContainer}>
              <TextField
                label="Username/Email"
                type="text"
                margin="dense"
                name="username"
                onChange={this.handleChange}
                />
              <TextField
                label="Password"
                type="password"
                margin="dense"
                name="password"
                onChange={this.handleChange}
                />
              <Button onClick={this.submit} className={Styles.btn} variant="contained" color="secondary">
                    LOGIN
              </Button>
            </div>
            <div className={Styles.linkContainer}>
              <p>Create a new account? <span onClick={() => { this.props.history.push('/register'); }}>Register</span></p>
            </div>
          </div>
        </div>
        <div className={Styles.rightContainer} />
      </div>
    );
  }
}

function mapStateToProps(store) {
  const { user } = store;
  return {
    token: user.token,
    loginError: user.loginError
  };
}

export default connect(mapStateToProps)(LoginPage);

