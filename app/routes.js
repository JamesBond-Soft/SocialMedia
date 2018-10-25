/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import DocumentPage from './containers/DocumentPage';
import AudioPage from './containers/AudioPage';
import VideoPage from './containers/VideoPage';
import ImagePage from './containers/ImagePage';

export default () => (
  <App>
    <Switch>
      <Route path="/document" component={DocumentPage} />
      <Route path="/audio" component={AudioPage} />
      <Route path="/video" component={VideoPage} />
      <Route path="/image" component={ImagePage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
