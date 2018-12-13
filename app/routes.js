/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
// import { BrowserRouter, Route, Switch,  Link, Redirect } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import RecordVideoPage from './containers/RecordVideoPage';
import RecordAudioPage from './containers/RecordAudioPage';
import CaptureImagePage from './containers/CaptureImagePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

export default () => (
  <App>
    <Switch>
      <Route path="/recordvideo" component={RecordVideoPage} />
      <Route path="/recordaudio" component={RecordAudioPage} />
      <Route path="/captureimage" component={CaptureImagePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route exact path="/" render={() => (<Redirect to="/home" />)} />
    </Switch>
  </App>
);
