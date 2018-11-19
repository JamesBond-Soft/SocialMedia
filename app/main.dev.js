/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';

const path = require('path');

const fs = require('fs');

const {
  POST_TEXT,
  POST_SUCCESS,
  SAVE_VIDEO_REQUEST,
  SAVE_VIDEO_SUCCESS,
  SAVE_VIDEO_FAILURE,
  SAVE_AUDIO_REQUEST,
  SAVE_AUDIO_SUCCESS,
  SAVE_AUDIO_FAILURE,

  SAVE_IMAGE_REQUEST,
  SAVE_IMAGE_SUCCESS,
  SAVE_IMAGE_FAILURE,

  RECORD_VIDEO_PATH,
  RECORD_AUDIO_PATH,
  SAVE_IMAGE_PATH,
  RECORD_MEDIA_BASIC_PATH
} = require('./utils/constants');


let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

// handle sqlite3 db
/* const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../resources/db/database.sqlite'
  }
});   */

/**
 * Add event listeners...
 */
/*  ipcMain.on('mainWindowLoaded', () => {
  const result = knex.select('FirstName').from('User');
  result.then((rows) => {
    mainWindow.send('resultSent', rows);
  }).catch((Error) => {
    console.log('DB Error');
  });
}); */

if (!fs.existsSync(RECORD_MEDIA_BASIC_PATH)) {
  fs.mkdir(RECORD_MEDIA_BASIC_PATH);
}

ipcMain.on(POST_TEXT, (event, arg) => {
  mainWindow.send(POST_SUCCESS, arg);
});

ipcMain.on(SAVE_VIDEO_REQUEST, (event, filename, buffer) => {
  if (!fs.existsSync(RECORD_VIDEO_PATH)) {
    fs.mkdir(RECORD_VIDEO_PATH);
  }
  const filePath = `${RECORD_VIDEO_PATH}/${filename}`;
  fs.writeFile(filePath, buffer, err => {
    if (err) {
      event.sender.send(SAVE_VIDEO_FAILURE, err.message);
    }
    event.sender.send(SAVE_VIDEO_SUCCESS, filePath);
  });
});

ipcMain.on(SAVE_AUDIO_REQUEST, (event, filename, buffer) => {
  if (!fs.existsSync(RECORD_AUDIO_PATH)) {
    fs.mkdir(RECORD_AUDIO_PATH);
  }
  const filePath = `${RECORD_AUDIO_PATH}/${filename}`;
  fs.writeFile(filePath, buffer, err => {
    if (err) {
      event.sender.send(SAVE_AUDIO_FAILURE, err.message);
    }
    event.sender.send(SAVE_AUDIO_SUCCESS, filePath);
  });
});

ipcMain.on(SAVE_IMAGE_REQUEST, (event, filename, buffer) => {
  if (!fs.existsSync(SAVE_IMAGE_PATH)) {
    fs.mkdir(SAVE_IMAGE_PATH);
  }
  const filePath = `${SAVE_IMAGE_PATH}/${filename}`;
  const base64Data = buffer.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  fs.writeFile(filePath, base64Data, 'base64', err => {
    if (err) {
      event.sender.send(SAVE_IMAGE_FAILURE, err.message);
    }
    // const absolutePath = path.join(__dirname, filePath);
    event.sender.send(SAVE_IMAGE_SUCCESS, filePath);
  });
});


app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1300,
    height: 1100
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
