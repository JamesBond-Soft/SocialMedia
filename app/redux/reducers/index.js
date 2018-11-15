// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import media from './media';
import profile from './profile';
import journal from './journal';


export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});

  return connectRouter(history)(combineReducers({ router: routerReducer, media, profile, journal }));
}
