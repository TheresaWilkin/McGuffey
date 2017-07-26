import {
  SETUP_TESTING,
  IMPORT_TESTING_DATA,
  SET_TESTING_TEXT,
  SET_TESTING,
} from '../actions/types';

const INITIAL_STATE = {
  test: 0,
  independent: 0,
  instructional: 0,
  frustration: 0,
  text: '',
  levels: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETUP_TESTING:
      return { ...state };
    case IMPORT_TESTING_DATA:
      return { ...state, levels: action.payload.levels, test: action.payload.current };
    case SET_TESTING_TEXT:
      return { ...state, text: action.payload };
    case SET_TESTING:
      return { ...state, [action.key]: action.value, test: action.test };
    default:
      return state;
  }
};
