import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import storyReducer from './storyReducer';
import wordsReducer from './wordsReducer';
import userReducer from './userReducer';
import testingReducer from './testingReducer';

export default createStore(
  combineReducers({
    story: storyReducer,
    words: wordsReducer,
    user: userReducer,
    testing: testingReducer,
  }),
  applyMiddleware(thunk),
);
