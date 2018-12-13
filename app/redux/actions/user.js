import { userConstants } from '../constants';

import {
  callApi } from '../../utils/apiUtils';

import { setIdToken, saveUserProfile, loadIdToken, removeUserProfile, removeIdToken } from '../../utils/common';
import { LOGIN, LOGOUT, GET_LOGINED_USER, REGISTER } from '../../utils/endpoints';

// ---------------- Login -----------------------
function loginRequest(user) {
  return {
    type: userConstants.LOGIN_REQUEST,
    user
  };
}

function loginSuccess(data) {
  const idToken = data.token;
  setIdToken(idToken);
  saveUserProfile(data);
  return {
    type: userConstants.LOGIN_SUCCESS,
    error: null,
    token: idToken,
    user: data
  };
}

function loginError(errorMsg) {
  return {
    type: userConstants.LOGIN_ERROR,
    error: errorMsg
  };
}

function loginFailure(error) {
  const errMsg = 'Connection failed!';
  return {
    type: userConstants.LOGIN_FAILURE,
    error: errMsg
  };
}

export function login(username, password) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      username,
      password,
    })
  };

  return callApi(
    LOGIN,
    config,
    loginRequest(username),
    loginSuccess,
    loginError,
    loginFailure
  );
}


// ------------ Register -----------------
function registerRequest(user) {
  return {
    type: userConstants.REGISTER_REQUEST,
    user
  };
}

function registerSuccess(data) {
  const idToken = data.token;
  setIdToken(idToken);
  saveUserProfile(data);
  return {
    type: userConstants.REGISTER_SUCCESS,
    error: null,
    token: idToken,
    user: data
  };
}

function registerError(errorMsg) {
  return {
    type: userConstants.REGISTER_ERROR,
    error: errorMsg
  };
}

function registerFailure(error) {
  const errMsg = 'Connection failed!';
  return {
    type: userConstants.REGISTER_FAILURE,
    error: errMsg
  };
}

export function register(user) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      password: user.password,
    })
  };

  return callApi(
    REGISTER,
    config,
    registerRequest(user.username),
    registerSuccess,
    registerError,
    registerFailure
  );
}

// ------------------ Logout Actions ----------------------


function logoutRequest() {
  return {
    type: userConstants.LOGOUT_REQUEST
  };
}

function logoutSuccess(payload) {
  removeUserProfile();
  removeIdToken();

  return {
    type: userConstants.LOGOUT_SUCCESS
  };
}

function logoutError(errMsg) {
  return {
    type: userConstants.LOGOUT_ERROR,
    errMsg
  };
}
function logoutFailure(error) {
  const message = 'Connection failed!';
  return {
    type: userConstants.LOGOUT_FAILURE,
    message
  };
}

export function logout() {
  const token = loadIdToken();
  // console.log("logout token is:",token);
  const config = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token
    }
  };

  return callApi(
    LOGOUT,
    config,
    logoutRequest,
    logoutSuccess,
    logoutError,
    logoutFailure
  );
}

/**
 * Get Logined user by localstorage token
 */


function getUserRequest() {
  return {
    type: userConstants.GET_USER_REQUEST
  };
}

function getUserSuccess(payload) {
  const token = payload.token;
  return {
    type: userConstants.GET_USER_SUCCESS,
    user: payload,
    token
  };
}

function getUserError(errMsg) {
  return {
    type: userConstants.GET_USER_ERROR,
    errMsg
  };
}
function getUserFailure(error) {
  const message = 'Connection failed!';
  return {
    type: userConstants.GET_USER_FAILURE,
    message
  };
}

export function getUser() {
  const token = loadIdToken();
  // console.log("logout token is:",token);
  const config = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token
    }
  };

  return callApi(
    GET_LOGINED_USER,
    config,
    getUserRequest,
    getUserSuccess,
    getUserError,
    getUserFailure
  );
}
