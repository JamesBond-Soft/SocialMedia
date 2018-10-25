// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { persistReducer, persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import createRootReducer from '../reducers';
import type { counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);
const persistConfig = {
  key: 'root',
  storage
};

function configureStore(initialState?: counterStateType) {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  persistStore(store);
  return store;
}

export default { configureStore, history };
