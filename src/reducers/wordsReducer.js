import {
  SETUP_WORDS,
  ANSWER_WORD,
  FALSE_ANSWER,
  TRUE_ANSWER,
  FETCH_NEW_WORD
} from '../actions/types';

const INITIAL_STATE = {
  dictionary: {},
  wordCount: 0,
  nextWord: 0,
  currentWordList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETUP_WORDS:
      return { ...state, ...action.words };
    case FALSE_ANSWER:
      return { ...state, currentWordList: action.payload };
    case TRUE_ANSWER:
      return { ...state, currentWordList: action.list, dictionary: action.dictionary };
    case FETCH_NEW_WORD:
      return { ...state, currentWordList: action.list, nextWord: action.nextWord };
    default:
      return state;
  }
};
