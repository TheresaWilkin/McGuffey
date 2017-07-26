import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  resetAction,
  BodyText,
  TitleText,
  Card,
  CardSection
} from './common';
import styles from '../styles';
import { setIndependent, setInstructional, setFrustration, setTestingText } from '../actions';
class FeedbackScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Assessment',
    headerStyle: {backgroundColor: '#81D4FA'}
  });

  state = {
    difficulty: '',
    percentage: 0
  }

  componentWillMount() {
    const percentage = parseInt(this.props.navigation.state.params.percentage, 10);
    const { test, lesson, levels } = this.props;
    let difficulty;
    if (percentage < 90) {
      difficulty = 'too difficult';
      this.props.setFrustration({ test, lesson });
    } else if (percentage < 95) {
      difficulty = 'challenging';
      this.props.setInstructional({ test, lesson });
      this.props.setTestingText(levels[this.props.test + 1]);
    } else {
      difficulty = 'easy';
      this.props.setIndependent({ test, lesson });
      this.props.setTestingText(levels[this.props.test + 1]);
    }
    this.setState({ difficulty, percentage });
  }

  onPress() {
    if(this.props.status === 'testing') {
      this.props.navigation.dispatch(resetAction('question'));
    } else {
      this.props.navigation.dispatch(resetAction('levels'));
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Card>
            <View>
              <BodyText size="medium">This text was {this.state.difficulty}.</BodyText>
              <BodyText size="small">The student read the text with {this.state.percentage}% accuracy.</BodyText>
            </View>
            <View>
              <CardSection>
                <Button onPress={this.onPress.bind(this)}>
                  Continue
                </Button>
              </CardSection>
            </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ user, testing }) => {
  const { loading, status } = user;
  const { test, levels } = testing;
  const lesson = levels[test];
  console.log(testing)
  return { loading, status, lesson, test, levels };
}

export default connect(mapStateToProps, { setTestingText, setIndependent, setInstructional, setFrustration })(FeedbackScreen);
