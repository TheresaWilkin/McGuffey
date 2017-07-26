import store from 'react-native-simple-store';
import firebase from 'firebase';
import { Alert } from 'react-native';

import {
  SETUP_INITIAL_LAUNCH,
  SETUP_TESTING,
  DETERMINE_RELIGIOUS_CONTENT,
  SET_RELIGIOUS_CONTENT,
  RELIGIOUS_CONTENT_ERROR,
  DOWNLOAD_LESSON,
  DOWNLOAD_LESSON_SUCCESS,
  DOWNLOAD_LESSON_FAILURE,
  SETUP_WORDS,
  ANSWER_WORD,
  FALSE_ANSWER,
  TRUE_ANSWER,
  FETCH_NEW_WORD,
  SETUP_STORY,
  START_STORY_SETUP,
  SET_PAGE,
  SET_LEVEL,
  SET_TESTING_TEXT,
  GET_TESTING_TEXT,
  IMPORT_TESTING_DATA,
  SET_TESTING,
  SET_STATUS,
} from './types';

export const determineStatus = () => {
  return dispatch => {
    //store.save('@mcguffey-test', null);
    //store.save('@mcguffey', null);
    store.get('@mcguffey-test')
      .then(value => {
        if (!value || !value.frustration) {
          dispatch(setupTesting());
        } else {
          store.get('@mcguffey')
          .then((value) => {
            if (!value) {
              dispatch({ type: SETUP_INITIAL_LAUNCH });
            } else {
              console.log('store', value);
              const { user, words, story } = value;
              if (words.currentWordList && words.currentWordList.length > 0) {
                dispatch(setupWords());
              } else if (story.current < story.length) {
                dispatch(setupStory());
              } else {
                console.log('downloadLesson');
                downloadLesson();
              }
            }
          })
          .catch(error => console.log(error))
        }
      })
    .catch(error => {
      console.log(error);
      Alert.alert('Error', 'Error loading data. Please try again.');
    });
  }
}

export const initialLaunch = () => ({
  type: SETUP_INITIAL_LAUNCH
})

const setupTesting = () => {
  return dispatch => {
    dispatch({ type: SETUP_TESTING });
    store.get('@mcguffey-test')
    .then(value => {
      console.log(value)
      if (!value) {
        firebase.database().ref(`tests`)
        .once('value', snapshot => {
          const tests = snapshot.val();
          const storage = {
            levels: tests.levels.split(', '),
            current: 0,
          }
          dispatch({ type: IMPORT_TESTING_DATA, payload: storage });
          dispatch(setTestingText(1));
        });
      } else {
        dispatch({ type: IMPORT_TESTING_DATA, payload: value });
        dispatch(setTestingText(value.levels[value.current]));
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const setTestingText = (level) => {
  return dispatch => {
    dispatch({ type: GET_TESTING_TEXT });
    console.log(level)
    firebase.database().ref(`tests/${level}`)
    .once('value', snapshot => {
      const payload = snapshot.val();
      if (!payload) {
        dispatch({ type: SET_STATUS, payload: 'level' });
      }
      dispatch({ type: SET_TESTING_TEXT, payload });
    });
  }
}

export const setFrustration = ({ test, lesson }) => {
  return dispatch => {
    const lessonInt = parseInt(lesson, 10);
    const update = {
      current: test + 1,
      frustration: lessonInt
    };
    store.update('@mcguffey-test', update)
      .then(() => {
        dispatch({ type: SET_TESTING, key: 'frustration', value: lessonInt, test: test + 1 });
        dispatch({ type: SET_STATUS, payload: 'level' });
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const setInstructional = ({ test, lesson }) => {
  return dispatch => {
  const lessonInt = parseInt(lesson, 10);
  const update = {
    current: test + 1,
    instructional: lessonInt
  };
  store.update('@mcguffey-test', update)
    .then(() => {
      dispatch({ type: SET_TESTING, key: 'instructional', value: lessonInt, test: test + 1  });
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const setIndependent = ({ test, lesson }) => {
  return dispatch => {
  const lessonInt = parseInt(lesson, 10);
  const update = {
    current: test + 1,
    independent: lessonInt
  };
  store.update('@mcguffey-test', update)
    .then(() => {
      dispatch({ type: SET_TESTING, key: 'independent', value: lessonInt, test: test + 1  });
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export const setupWords = () => {
  return dispatch => {
    store.get('@mcguffey')
    .then((value) => {
    const { user, words } = value;
    const { lesson, points } = user;
    const { dictionary, wordCount, nextWord, currentWordList } = words;
    console.log(points)
    const reduxUser = {
      lesson,
      points,
      pointsNeeded: wordCount * 3,
    };

    const reduxWords = {
      wordCount,
      nextWord,
      currentWordList,
      dictionary
    };

    dispatch({ type: SETUP_WORDS, user: reduxUser, words: reduxWords });
  })
  .catch(error => {
    console.log(error);
    Alert.alert('Error', 'Error loading flashcards.');
  })
  }
}

export const setupStory = () => {
  return dispatch => {
    dispatch({ type: START_STORY_SETUP });
    store.get('@mcguffey')
    .then((value) => {
    const { user, story } = value;
    const { lesson } = user;
    const { current, dictionary, length } = story;

    const reduxUser = {
      lesson
    };

    const reduxStory = {
      dictionary,
      storyLength: length,
      currentStory: current
    };

    store.update('@mcguffey', { words: {
              dictionary: null,
              wordCount: 0,
              nextWord: 1,
              currentWordList: null
            } })
      .then(() => {
      })
      .catch(error => console.log(error));

    dispatch({ type: SETUP_STORY, user: reduxUser, story: reduxStory });
  })
  .catch(error => {
    console.log(error);
    Alert.alert('Error', 'Error loading flashcards.');
  });
  }
}

export const determineReligiousContent = (lesson) => {
  return dispatch => {
    dispatch({ type: DETERMINE_RELIGIOUS_CONTENT });
    firebase.database().ref(`lessons/${lesson}/religious`)
    .once('value', snapshot => {
      const religious = snapshot.val();
      if (religious == null) {
        dispatch({ type: RELIGIOUS_CONTENT_ERROR });
      }
      dispatch({ type: SET_RELIGIOUS_CONTENT, payload: religious });
    });
  }
}

export const downloadLesson = (lessonId) => {
  return dispatch => {
    dispatch({ type: DOWNLOAD_LESSON });
    firebase.database().ref(`lessons/${lessonId}`)
    .once('value', snapshot => {
      const lesson = snapshot.val();
      const dictionary = {};
      for(let i = 1; i <= lesson.wordcount; i++) {
        dictionary[i] = { text: lesson.words[i], answeredCorrectly: 0 };
      };
      const storage = {
        user: {
          lesson: lessonId,
          points: 0
        },
        words: {
          dictionary,
          wordCount: lesson.wordcount,
          nextWord: 6,
          currentWordList: [1, 2, 3, 4, 5]
        },
        story: {
          dictionary: lesson.story,
          length: lesson.storycount,
          current: 0
        }
      };

      store.save('@mcguffey', storage)
      .then(() => {
        dispatch({ type: DOWNLOAD_LESSON_SUCCESS });
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: DOWNLOAD_LESSON_FAILURE });
        Alert.alert('Error', 'Lesson download failed. Please try again.');
      })
    });
  }
}

export const answerWord = ({ answer, list, dictionary, nextWord, points }) => {
  return dispatch => {
    if (!answer) {
      dispatch(handleFalseAnswer({ list }));
    } else {
      dispatch(handleTrueAnswer({ list, dictionary, nextWord, points }));
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const handleFalseAnswer = ({ list }) => {
  return dispatch => {
    const newList = shuffle(list);
    store.get('@mcguffey')
      .then(value => {
        const words = value.words;
        words.currentWordList = list;
        store.update('@mcguffey', { words })
          .then(() => {
            dispatch({
              type: FALSE_ANSWER,
              payload: newList
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

const handleTrueAnswer = ({ list, dictionary, nextWord, points }) => {
  return dispatch => {
    const wordId = list[0];
    let newList = list.slice(1);
    newList.push(wordId);
    newList = shuffle(newList);

    const newWord = dictionary[wordId];
    const answeredCorrectly = parseInt(newWord.answeredCorrectly, 10) + 1;
    newWord.answeredCorrectly = answeredCorrectly;

    const newDictionary = dictionary;
    newDictionary[wordId] = newWord;

    const newPoints = parseInt(points, 10) + 1;

    store.get('@mcguffey')
      .then(value => {

        const words = value.words;
        words.currentWordList = newList;
        words.dictionary = newDictionary;

        const { user } = value;
        user.points = newPoints;
        console.log(user);

        store.update('@mcguffey', { words, user })
          .then(() => {
            dispatch({
              type: TRUE_ANSWER,
              list: newList,
              dictionary: newDictionary,
              points: newPoints
            });
            if (newWord.answeredCorrectly >= 3) {
              dispatch(replaceWord({ nextWord: parseInt(nextWord, 10), currentWordList: newList }))
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export const replaceWord = ({ nextWord, currentWordList }) => {
  return dispatch => {
    const newList = currentWordList;
    newList.pop();
    const newNextWord = nextWord + 1;

    store.get('@mcguffey')
      .then(value => {
        const { words } = value;
        if (nextWord <= parseInt(words.wordCount, 10)) {
          newList.push(nextWord)
          dispatch({ type: FETCH_NEW_WORD, list: newList, nextWord: newNextWord });
        } else if (newList.length < 1) {
          console.log('setupStory');
          dispatch(setupStory());
        } else {
          dispatch({ type: FETCH_NEW_WORD, list: newList, nextWord: newNextWord });
        }
        const newWords = words;
        newWords.currentWordList = newList;
        newWords.nextWord = newNextWord;
        store.update('@mcguffey', { words: newWords })
          .catch(error => {
            console.log(error);
          });
      });
  }
}

export const setLevel = (level) => ({
  type: SET_LEVEL,
  payload: level
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page
});

export const submitLesson = ({ religious, story, storycount, wordcount, lesson, words }) => {
  return dispatch => {
    firebase.database().ref(`lessons/${lesson}`)
    .set({ religious, story, storycount, wordcount, words });
  }
}
