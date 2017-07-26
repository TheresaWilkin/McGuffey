import {
  SETUP_STORY,
  SET_PAGE
} from '../actions/types';

const INITIAL_STATE = {
  dictionary: {},
  storyLength: 0,
  currentStory: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETUP_STORY:
      return { ...state, ...action.story };
    case SET_PAGE:
      return { ...state, currentStory: action.payload };
    default:
      return state;
  }
};
