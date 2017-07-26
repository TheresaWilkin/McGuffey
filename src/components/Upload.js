import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Image, TextInput, Text, Keyboard } from 'react-native';

import { submitLesson } from '../actions';
import { Spinner, resetAction, CardText, Card, BodyText, CardSection, Button } from './common';
import styles from '../styles';

class Upload extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Upload',
    headerStyle: {backgroundColor: '#81D4FA'},
    headerRight: <Button onPress={() => Keyboard.dismiss()}>Done</Button>
  });

  state = {
    lesson: null,
    words: {},
    story: {},
    wordCount: 1,
    storyCount: 0,
    currentWords: '',
    currentStory: '',
    imageHeight: '',
    religious: ''
  }

  onSubmit() {
    const { religious, story, storyCount, wordCount, lesson, words } = this.state;
    this.props.submitLesson({ religious, story, storycount: storyCount - 1, wordcount: wordCount - 1, lesson, words });
    this.setState({
      lesson: null,
      words: {},
      story: {},
      wordCount: 1,
      storyCount: 0,
      currentWords: '',
      currentStory: '',
      imageHeight: '',
      religious: ''
    });
  }

  addWords() {
    let index = this.state.wordCount;
    let currentWords = this.state.currentWords.split(' ');
    let words = this.state.words;
    currentWords.forEach(word => {
      words[index] = word;
      index++;
    });
    this.setState({ wordCount: index, words, currentWords: '' });
  }

  addSentences() {
    let index = this.state.wordCount;
    let currentWords = this.state.currentWords.match( /[^\.!\?]+[\.!\?]+/g );
    let words = this.state.words;
    currentWords.forEach(word => {
      words[index] = word;
      index++;
    });
    this.setState({ wordCount: index, words, currentWords: '' });
  }

  addImage()  {
    let image = {
      type: 'image',
      height: parseInt(this.state.imageHeight, 10),
      source: this.state.currentStory
    };
    let index = this.state.storyCount;
    let story = this.state.story;
    story[index] = image;
    index++;
    this.setState({ story, storyCount: index, imageHeight: '', currentStory: '' });
  }

  addStory() {
    let text = {
      type: 'text',
      text: this.state.currentStory
    };
    let index = this.state.storyCount;
    let story = this.state.story;
    story[index] = text;
    index++;
    this.setState({ story, storyCount: index, currentStory: '' });
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView>
      <View style={styles.container}>
        <Card>
            <CardSection>
              <TextInput
                style={{ height: 40, flex: 1 }}
                keyboardType="numeric"
                placeholder="lesson number"
                onChangeText={(lesson) => this.setState({lesson})}
                value={this.state.lesson}
              />
              </CardSection>

              <CardSection>
                <TextInput
                  style={{ height: 40, flex: 1 }}
                  placeholder="religious?"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(religious) => this.setState({religious})}
                  value={this.state.religious}
                />
                </CardSection>

              <CardSection>
                <TextInput
                  style={{ height: 40, flex: 1 }}
                  placeholder="letters and words"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(currentWords) => this.setState({currentWords})}
                  value={this.state.currentWords}
                />
                <Button onPress={this.addWords.bind(this)}>Add Words</Button>
                </CardSection>

                <CardSection>
                  <TextInput
                    style={{ height: 40, flex: 1 }}
                    placeholder="sentences"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(currentWords) => this.setState({currentWords})}
                    value={this.state.currentWords}
                  />
                  <Button onPress={this.addSentences.bind(this)}>Add Sentences</Button>
                  </CardSection>

                  <CardSection>
                    <TextInput
                      style={{ height: 40, flex: 1 }}
                      placeholder="story text"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(currentStory) => this.setState({currentStory})}
                      value={this.state.currentStory}
                    />
                    <Button onPress={this.addStory.bind(this)}>Add Story</Button>
                    </CardSection>

                    <CardSection>
                      <TextInput
                        style={{ height: 40, flex: 1 }}
                        placeholder="story image"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(currentStory) => this.setState({currentStory})}
                        value={this.state.currentStory}
                      />
                      <TextInput
                        style={{ height: 40, flex: 1 }}
                        placeholder="story image height"
                        keyboardType="numeric"
                        onChangeText={(imageHeight) => this.setState({imageHeight})}
                        value={this.state.imageHeight}
                      />
                      <Button onPress={this.addImage.bind(this)}>Add Image</Button>
                    </CardSection>
              <CardSection>
              <Button onPress={() => this.onSubmit()}>
                Submit
              </Button>
            </CardSection>
          </Card>
      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ user, testing }) => {
  const { loading, status } = user;
  const { text, test } = testing;
  return { loading, status, text, test };
}

export default connect(mapStateToProps, { submitLesson })(Upload);
