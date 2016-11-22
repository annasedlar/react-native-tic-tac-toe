import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import devToolsEnhancer from 'remote-redux-devtools';
import moveReducer from './reducers';

const rootReducer = combineReducers({
  game: moveReducer
  // other: otherReducer
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    devToolsEnhancer()
  )
);
/* eslint-enable */

export default store;
