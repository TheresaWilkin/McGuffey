import {
  SETUP_INITIAL_LAUNCH,
  SETUP_TESTING,
  DETERMINE_RELIGIOUS_CONTENT,
  SET_RELIGIOUS_CONTENT,
  DOWNLOAD_LESSON,
  DOWNLOAD_LESSON_SUCCESS,
  DOWNLOAD_LESSON_FAILURE,
  SETUP_WORDS,
  ANSWER_WORD,
  FALSE_ANSWER,
  TRUE_ANSWER,
  SETUP_STORY,
  START_STORY_SETUP,
  SET_LEVEL,
  RELIGIOUS_CONTENT_ERROR,
  GET_TESTING_TEXT,
  SET_TESTING_TEXT,
  SET_STATUS
} from '../actions/types';

const INITIAL_STATE = {
  lesson: null,
  status: null,
  points: 0,
  pointsNeeded: null,
  loading: true,
  religiousContent: null
};

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case SETUP_TESTING:
      return { ...state, status: 'testing', loading: false };
    case SETUP_INITIAL_LAUNCH:
      return { ...state, lesson: 1, status: 'initial', loading: false };
      break;
    case DETERMINE_RELIGIOUS_CONTENT:
      return { ...state, loading: true };
      break;
    case SET_RELIGIOUS_CONTENT:
      return { ...state, loading: false, religiousContent: action.payload };
      break;
    case DOWNLOAD_LESSON:
      return { ...state, loading: true };
      break;
    case DOWNLOAD_LESSON_SUCCESS:
      return { ...state, loading: false, status: 'words' };
      break;
    case DOWNLOAD_LESSON_FAILURE:
      return { ...state, loading: false };
      break;
    case SETUP_WORDS:
      let { lesson, points, pointsNeeded } = action.user;
      return { ...state, lesson, points, pointsNeeded, status: 'words', loading: false };
      break;
    case ANSWER_WORD:
      return { ...state, loading: true };
      break;
    case FALSE_ANSWER:
      return { ...state, loading: false };
      break;
    case TRUE_ANSWER:
      return { ...state, loading: false, points: action.points };
      break;
    case START_STORY_SETUP:
      return { ...state, loading: true, status: 'story' };
    case SETUP_STORY:
      return { ...state, lesson: action.user.lesson, points: 0, pointsNeeded: null, loading: false };
      break;
    case SET_LEVEL:
      return { ...state, lesson: action.payload };
    case RELIGIOUS_CONTENT_ERROR:
      return { ...state, loading: false, status: 'unavailable' };
    case GET_TESTING_TEXT:
      return { ...state, loading: true };
    case SET_TESTING_TEXT:
      return { ...state, loading: false };
    case SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
