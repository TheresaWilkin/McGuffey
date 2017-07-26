import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import * as firebase from 'firebase';

import { downloadLesson, setLevel, determineReligiousContent } from '../actions';
import {
  Spinner,
  Button,
  resetAction,
  BodyText,
  TitleText,
  Card,
  CardSection,
  Link,
} from './common';
import styles from '../styles';

class DownloadScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Lesson ${navigation.state.params.lesson}`,
    headerStyle: {backgroundColor: '#81D4FA'}
  });

  onPress() {
    if (this.props.status === 'unavailable') {
      this.props.navigation.dispatch(resetAction('unavailable'));
    }
    this.props.downloadLesson(this.props.lesson);
  }

  onSkip() {
    const lesson = this.props.lesson + 1;
    this.props.setLevel(lesson);
    this.props.determineReligiousContent(lesson)
    this.props.navigation.dispatch(resetAction('download', { lesson }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status != this.props.status) {
      if (nextProps.status === 'words') {
        this.props.navigation.dispatch(resetAction('word'));
      } else if (nextProps.status === 'unavailable'){
        this.props.navigation.dispatch(resetAction('unavailable'));
      }
    }
  }

  render() {
    const { lesson, status, religiousContent, loading } = this.props;
    return (
      <View style={styles.container}>
      <Card>
          {status === 'initial' ?
            <View>
              <BodyText size="medium">Welcome to "McGuffey's Eclectic Primer".</BodyText>
              <BodyText size="small">The student should read each card aloud as it is presented.</BodyText>
              <BodyText size="small">The teacher should mark whether the card was read correctly.</BodyText>
              <BodyText size="small">Lessons are not intended to be completed in one sitting.</BodyText>
            </View> :
            <BodyText size="medium">Congratulations on completing Lesson {lesson - 1}</BodyText>}
          {loading ?
            <CardSection>
              <Spinner size="large" />
            </CardSection>
             :
            <View>
              <CardSection>
                <Button
                  onPress={() => this.onPress()}
                  loading={false}
                >Download Lesson {lesson}</Button>
              </CardSection>
              <CardSection>
                {(!religiousContent || religiousContent === 'false') ? null : <BodyText size="small">Warning: This lesson contains religious content.</BodyText>}
              </CardSection>
              <CardSection>
                <Link
                  onPress={this.onSkip.bind(this)}
                  title={`Skip Lesson ${lesson}`}
                />
              </CardSection>
            </View>}
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ user, words, story }) => {
  const { lesson, status, loading, religiousContent } = user;
  return { user, words, story, lesson, loading, status, religiousContent };
}

export default connect(mapStateToProps, { determineReligiousContent, downloadLesson, setLevel })(DownloadScreen);
