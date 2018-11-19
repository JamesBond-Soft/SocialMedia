/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import RecordVideoPage from './containers/RecordVideoPage';
import RecordAudioPage from './containers/RecordAudioPage';
import CaptureImagePage from './containers/CaptureImagePage';

export default () => (
  <App>
    <Switch>
      <Route path="/recordvideo" component={RecordVideoPage} />
      <Route path="/recordaudio" component={RecordAudioPage} />
      <Route path="/captureimage" component={CaptureImagePage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
