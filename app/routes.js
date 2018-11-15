/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import DocumentPage from './containers/DocumentPage';
import AudioPage from './containers/AudioPage';
import VideoPage from './containers/VideoPage';
import ImagePage from './containers/ImagePage';
import RecordVideoPage from './containers/RecordVideoPage';
import RecordAudioPage from './containers/RecordAudioPage';
import CaptureImagePage from './containers/CaptureImagePage';
import ProfilePage from './containers/ProfilePage';
import MediaPage from './containers/MediaPage';
import JournalPage from './containers/JournalPage';

export default () => (
  <App>
    <Switch>
      <Route path="/document" component={DocumentPage} />
      <Route path="/audio" component={AudioPage} />
      <Route path="/video" component={VideoPage} />
      <Route path="/image" component={ImagePage} />
      <Route path="/recordvideo" component={RecordVideoPage} />
      <Route path="/recordaudio" component={RecordAudioPage} />
      <Route path="/captureimage" component={CaptureImagePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/media" component={MediaPage} />
      <Route path="/journal" component={JournalPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
