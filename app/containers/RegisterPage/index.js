import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styles from './index.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { register } from '../../redux/actions/user';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      psd: '',
      confirmPsd: '',
      emailErrorMsg: null,
      usernameErrorMsg: null,
      psdErrorMsg: null,
      confirmPsdErrorMsg: null,
      isValid: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(' ---------------------------- ', this.props.token);
    if (nextProps.token !== null) {
      this.props.history.push('/home');
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submit = () => {
    // Form Validation
    this.setState({
      emailErrorMsg: null,
      usernameErrorMsg: null,
      psdErrorMsg: null,
      confirmPsdErrorMsg: null,
      isValid: true
    });

    /* Validation Process */
    const {
      email, psd, username, confirmPsd
    } = this.state;
    if (email === '') {
      this.setState({ emailErrorMsg: 'Email is required!', isValid: false });
    }
    if (username === '') {
      this.setState({ usernameErrorMsg: 'Username is required!', isValid: false });
    }
    if (psd === '') {
      this.setState({ psdErrorMsg: 'Password is required!', isValid: false });
    } else if (confirmPsd === '') {
      this.setState({ confirmPsdErrorMsg: 'Confirm Password is required!', isValid: false });
    } else if (psd !== confirmPsd) {
      this.setState({ confirmPsdErrorMsg: 'Password does not matched', isValid: false });
    }
    const { isValid } = this.state;
    if (!isValid)
    { return; }
    // Dispatch Register Action
    const user = {
      email, username, password: psd,
    };
    console.log('register information: ', user);
    this.props.dispatch(register(user));
  }

  render() {
    const error = this.props.loginError;
    return (
      <div className={Styles.container}>
        <div className={Styles.leftContainer}>
          <div className={Styles.content}>
            <div className={Styles.titleContainer}>
              <p> SOCIAL MEDIA </p>
            </div>
            <div className={Styles.formContainer}>
              <TextField
                label="Email"
                type="text"
                margin="dense"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
                />
              { this.state.emailErrorMsg ? <FormHelperText error id="component-helper-text">{this.state.emailErrorMsg}</FormHelperText> : null }
              <TextField
                label="Username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                margin="dense"
                required
                />
              { this.state.usernameErrorMsg ? <FormHelperText error id="component-helper-text">{this.state.usernameErrorMsg}</FormHelperText> : null }
              <TextField
                name="psd"
                value={this.state.psd}
                onChange={this.handleChange}
                label="Password"
                type="password"
                margin="dense"
                required
                />
              { this.state.psdErrorMsg ? <FormHelperText error id="component-helper-text">{this.state.psdErrorMsg}</FormHelperText> : null }
              <TextField
                name="confirmPsd"
                value={this.state.confirmPsd}
                onChange={this.handleChange}
                label="ConfirmPassword"
                type="password"
                margin="dense"
                required
                />
              { this.state.confirmPsdErrorMsg ? <FormHelperText error id="component-helper-text">{this.state.confirmPsdErrorMsg}</FormHelperText> : null }
              <div className={Styles.error}>
                <p>{error}</p>
              </div>
              <Button onClick={this.submit} className={Styles.btn} variant="contained" color="secondary">
                    REGISTER
              </Button>
            </div>
            <div className={Styles.linkContainer}>
              <p>Already have an account? <span onClick={() => { this.props.history.push('/login'); }}>Login</span></p>
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

export default connect(mapStateToProps)(RegisterPage);
