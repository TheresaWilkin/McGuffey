import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Image, Text } from 'react-native';

import { setLevel, initialLaunch, determineReligiousContent } from '../actions';
import { Spinner, resetAction, BodyText, Button, CardSection, Card, CardText } from './common';
import styles from '../styles';

class LevelScreen extends Component {
  static navigationOptions = () => ({
    title: `Difficulty Level`,
    headerStyle: {backgroundColor: '#81D4FA'}
  });

  onPress(level) {
    this.props.initialLaunch();
    this.props.setLevel(level);
    this.props.determineReligiousContent(level)
    this.props.navigation.dispatch(resetAction('download', { lesson: level }));
  }

  renderLessonTitle(number) {
    let lesson;
    if (number > 115) {
      lesson = '';
    } else if (number > 52) {
      lesson = `First Reader, Lesson ${number - 52}`;
    } else {
      lesson = `Primer, Lesson ${number}`;
    }
    return lesson;
  }

  render() {
    const { loading } = this.props;
    const independent = this.renderLessonTitle(this.props.independent);
    const instructional = this.renderLessonTitle(this.props.instructional);
    const frustration = this.renderLessonTitle(this.props.frustration);
    return (
      <ScrollView>
      <View style={styles.container}>
      {this.props.independent === 0 ? null :
        <Card>
          <CardSection isBorder>
              <BodyText size="small">{independent}: The student can read the lessons at this level with little or no assistance. Choose this level to increase confidence.</BodyText>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.onPress(this.props.independent)}>Independent</Button>
          </CardSection>
        </Card>}
        {this.props.instructional === 0 ? null :
        <Card>
          <CardSection isBorder>
              <BodyText size="small">{instructional}: The student can read the lessons at this level with guidance and practice. The student will experience the most academic growth at this level.</BodyText>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.onPress(this.props.instructional)}>Instructional</Button>
          </CardSection>
        </Card>}
        {this.props.frustrational === 0 ? null :
        <Card>
          <CardSection isBorder>
              <BodyText size="small">{frustration}: The student will be frustrated by lessons at this level, even with assistance. Begin this level only if you believe this test has misjudged his reading abilities.</BodyText>
          </CardSection>
          <CardSection>
              <Button onPress={() => this.onPress(this.props.frustration)}>Frustration</Button>
          </CardSection>
        </Card>}
      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ testing }) => {
  const { frustration, independent, instructional } = testing;
  return { frustration, independent, instructional };
}

export default connect(mapStateToProps, { setLevel, initialLaunch, determineReligiousContent })(LevelScreen);
