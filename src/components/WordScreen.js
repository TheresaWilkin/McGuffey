import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Animated } from 'react-native';

import { setupWords, answerWord, replaceWord } from '../actions';
import { Spinner, resetAction, CardText, Card, BodyText, CardSection } from './common';
import styles from '../styles';

import GoldStar from './GoldStar';
import YesNoButton from './YesNoButton';

class WordScreen extends Component {
  static navigationOptions = () => ({
    title: `Practice`,
    headerStyle: {backgroundColor: '#81D4FA'}
  });

  componentWillMount() {
    this.props.setupWords();
  }

  answerFlashcard(answer) {
    this.props.answerWord({
      answer,
      list: this.props.currentWordList,
      dictionary: this.props.dictionary,
      nextWord: this.props.nextWord,
      points: this.props.points
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'story') {
      this.props.navigation.dispatch(resetAction('story'));
    }
  }

  render() {
    const { points, pointsNeeded, word, loading } = this.props;
    let text = word ? word.text : '';
    return (
      <View style={styles.container}>
        <Card>
          <View style={{ padding: 10, alignItems: 'center'}}>
            <GoldStar points={points} />
          <BodyText size="small">{points}/{pointsNeeded}</BodyText>
          </View>
        </Card>
        <Card>
          <CardText>{text}</CardText>
        </Card>
        <Card>
          {loading ?
            <CardSection>
              <Spinner size="small" />
            </CardSection> :
          <CardSection>
            <YesNoButton
              text="Correct"
              image={require('../images/Correct.png')}
              onPress={() => this.answerFlashcard(true)}
            />
            <YesNoButton
              text="Incorrect"
              image={require('../images/Incorrect.png')}
              onPress={() => this.answerFlashcard(false)}
            />
          </CardSection>}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ user, words, story }) => {
  const { points, pointsNeeded, loading, status } = user;
  const { dictionary, wordCount, nextWord, currentWordList } = words;
  const word = dictionary[currentWordList[0]];
  return { points, pointsNeeded, word, nextWord, currentWordList, dictionary, loading, status };
}

export default connect(mapStateToProps, { setupWords, answerWord, replaceWord })(WordScreen);
