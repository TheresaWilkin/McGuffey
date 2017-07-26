import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';

import { setupWords, answerWord, replaceWord } from '../actions';
import { Spinner, resetAction, CardText, Card, BodyText, CardSection } from './common';
import styles from '../styles';

import YesNoButton from './YesNoButton';

class ReadinessScreen extends Component {
  static navigationOptions = () => ({
    title: `Readiness Assessment`,
    headerStyle: {backgroundColor: '#81D4FA'}
  });

  state = {
    assessment: true
  }

  render() {
    return (
      <View style={styles.container}>
          {this.state.assessment ?
            <Card>
              <CardText>
                Does the student know all or most of the letters in the alphabet, in both lowercase and capital?
              </CardText>
            </Card> :
            <Card>
              <CardText>
                The student must learn the alphabet before beginning "McGuffey's Eclectic Primer."
              </CardText>
              <CardText>
                "McGuffey's Pictorial Alphabet" is not yet supported by this application.
              </CardText>
              <CardText>
                If you would like to request "McGuffey's Pictorial Alphabet", please contact Theresa Wilkin at:
                TheresaWilkin@yahoo.com
              </CardText>
            </Card>}
        {this.state.assessment ?
        <Card>
          <CardSection>
            <YesNoButton
              text="Yes"
              image={require('../images/Correct.png')}
              onPress={() => this.props.navigation.dispatch(resetAction('question'))}
            />
            <YesNoButton
              text="No"
              image={require('../images/Incorrect.png')}
              onPress={() => this.setState({ assessment: false })}
            />
          </CardSection>
        </Card> :
        null}
      </View>
    );
  }
}


export default ReadinessScreen;
