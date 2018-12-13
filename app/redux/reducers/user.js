import { userConstants } from '../constants';

const initialState = {
  user: null,
  token: null,
  loggingIn: false,
  loggingOut: false,
  loginError: null,
  loading: false
};


export default function user(state = initialState, action = {}) {
  switch (action.type) {
    /**
     * Login Reducer
     */
    case userConstants.LOGIN_REQUEST:
      return Object.assign({}, state, {
        loggingIn: true,
      });
    case userConstants.LOGIN_SUCCESS:
      alert('Login Success!');
      return Object.assign({}, state, {
        loggingIn: false,
        token: action.token,
        loginError: action.error,
        user: action.user
      });
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case userConstants.LOGIN_ERROR:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };

    /**
      Register part
    */
    case userConstants.REGISTER_REQUEST:
      return Object.assign({}, state, {
        loggingIn: true,
      });
    case userConstants.REGISTER_SUCCESS:
      alert('Register Success!');
      return Object.assign({}, state, {
        loggingIn: false,
        token: action.token,
        loginError: action.error,
        user: action.user
      });
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case userConstants.REGISTER_ERROR:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    /**
     * Logout Reducer
    */
    case userConstants.LOGOUT_REQUEST:
      return Object.assign({}, state, {
        ...state,
        loggingOut: true
      });
    case userConstants.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        token: null,
        user: null,
        loggingOut: false
      });
    case userConstants.LOGOUT_FAILURE:
    case userConstants.LOGOUT_ERROR:
      return Object.assign({}, state, {
        ...state,
        loggingOut: false
      });
    /**
     Get user when app refresh
     */
    case userConstants.GET_USER_REQUEST:
      return Object.assign({}, state, {
        ...state,
        loading: true
      });
    case userConstants.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        token: action.token,
        user: action.user
      });
    case userConstants.GET_USER_ERROR:
    case userConstants.GET_USER_FAILURE:
      return Object.assign({}, state, {
        ...state,
        loading: false
      });
    default:
      return state;
  }
}
