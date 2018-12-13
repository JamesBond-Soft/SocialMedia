// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import timeline from './timeline';
import facts from './facts';
import profile from './profile';
import journal from './journal';
import user from './user';

export default function createRootReducer(history: {}) {
  const routerReducer = connectRouter(history)(() => {});
  return connectRouter(history)(combineReducers({
    router: routerReducer, timeline, facts, profile, journal, user
  }));
}
