import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text } from 'react-native';

import { setPage, determineReligiousContent, setLevel } from '../actions';
import { Spinner, resetAction, BodyText, Button, CardSection, Card, CardText } from './common';
import styles from '../styles';

class StoryScreen extends Component {
  static navigationOptions = () => ({
    title: `Story`,
    headerStyle: {backgroundColor: '#81D4FA'}
  });

  onPress() {
    if (this.props.currentStory >= this.props.storyLength) {
      const lesson = this.props.lesson + 1;
      this.props.setLevel(lesson);
      this.props.determineReligiousContent(lesson)
      this.props.navigation.dispatch(resetAction('download', { lesson }));
      return;
    }
    this.props.setPage(this.props.currentStory + 1)
  }

  render() {
    const { loading, page } = this.props
    console.log(this.props)
    return (
      <View style={styles.container}>
        {this.props.loading ?
          <Spinner size="large" /> :
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <CardSection isColor>
            {page.type === 'text' ? <CardText>{page.text}</CardText> : <Image style={{ height: page.height, width: 300 }} source={{ uri: page.source}} />}
            </CardSection>
            <CardSection isColor>
              <Button onPress={this.onPress.bind(this)}>Next</Button>
            </CardSection>
            </View>
        }
      </View>
    );
  }
}

const mapStateToProps = ({ user, words, story }) => {
  const { status, lesson, loading } = user;
  const { dictionary, currentStory, storyLength } = story;
  const page = dictionary[currentStory];
  return { user, page, status, lesson, loading, currentStory, storyLength };
}

export default connect(mapStateToProps, { setPage, determineReligiousContent, setLevel })(StoryScreen);
