import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {
  Button,
  resetAction,
  BodyText,
  TitleText,
  Card,
  CardSection
} from './common';
import styles from '../styles';

class TestScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Assessment',
    headerStyle: {backgroundColor: '#81D4FA'}
  });

  render() {
    return (
      <View style={styles.container}>
      <Card>
            <View>
              <BodyText size="medium">Welcome to "McGuffey's Eclectic Readers".</BodyText>
              <BodyText size="small">The following is a teacher-led test. The student is to read the provided words or sentences, and the teacher is to tally the number of errors made by the student.</BodyText>
              <BodyText size="small">Errors include repeating, skipping, adding or mispronouncing a word. An error is still tallied if the student self-corrects the error.</BodyText>
              <BodyText size="small">The teacher is not to prompt or guide the student, beyond directing him to read the text on the page.</BodyText>
            </View>
            <View>
              <CardSection>
                <Button onPress={() =>
                  this.props.navigation.dispatch(resetAction('readiness'))
                }>
                  Begin
                </Button>
              </CardSection>
            </View>
        </Card>
      </View>
    );
  }
}

export default TestScreen;
