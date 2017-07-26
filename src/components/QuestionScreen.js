import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Image, TextInput, Text, Keyboard } from 'react-native';

import { scoreLesson } from '../actions';
import { Spinner, resetAction, CardText, Card, BodyText, CardSection, Button } from './common';
import styles from '../styles';

import GoldStar from './GoldStar';
import YesNoButton from './YesNoButton';

class QuestionScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Assessment',
    headerStyle: {backgroundColor: '#81D4FA'},
    headerRight: <Button onPress={() => Keyboard.dismiss()}>Done</Button>
  });

  state = {
    number: '0'
  }

  onSubmit() {
    const wordCount = this.props.text.split(' ').length;
    const percentage = 100 - ((parseInt(this.state.number, 10) / wordCount) * 100 )
    this.props.navigation.dispatch(resetAction('feedback', { percentage }));
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        {this.props.loading ?
        <Card>
            <CardSection>
              <Spinner size="small" />
            </CardSection>
        </Card> :
          <Card>
          <CardSection isBorder>
            <CardText>{this.props.text}</CardText>
          </CardSection>
            <CardSection>
              <TextInput
                style={{ height: 40, flex: 1 }}
                keyboardType="numeric"
                placeholder="errors"
                onChangeText={(number) => this.setState({number})}
                value={this.state.number}
              />
              <Button onPress={() => this.onSubmit()}>
                Submit
              </Button>
            </CardSection>
          </Card>
        }
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

export default connect(mapStateToProps, { scoreLesson })(QuestionScreen);
