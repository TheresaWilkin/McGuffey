import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'

import store from './src/reducers'

import HomeScreen from './src/components/HomeScreen';
import DownloadScreen from './src/components/DownloadScreen';
import StoryScreen from './src/components/StoryScreen';
import WordScreen from './src/components/WordScreen';
import UnavailableScreen from './src/components/UnavailableScreen';
import TestScreen from './src/components/TestScreen';
import ReadinessScreen from './src/components/ReadinessScreen';
import QuestionScreen from './src/components/QuestionScreen';
import FeedbackScreen from './src/components/FeedbackScreen';
import LevelScreen from './src/components/LevelScreen';
import Upload from './src/components/Upload';

const StackNavigation = StackNavigator({
  home: { screen: HomeScreen },
  download: { screen: DownloadScreen },
  word: { screen: WordScreen },
  story: { screen: StoryScreen },
  unavailable: { screen: UnavailableScreen },
  test: { screen: TestScreen },
  readiness: { screen: ReadinessScreen },
  question: { screen: QuestionScreen },
  feedback: { screen: FeedbackScreen },
  levels: { screen: LevelScreen },
  upload: { screen: Upload },
}, {
  navigationOptions: {
    headerStyle: {backgroundColor: '#81D4FA'}
  }
});

class McGuffey extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <StackNavigation />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('McGuffey', () => McGuffey);
