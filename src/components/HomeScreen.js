import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import * as firebase from 'firebase';

import { determineStatus, determineReligiousContent } from '../actions';
import { Spinner, resetAction, BodyText } from './common';
import styles from '../styles';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBb2Jr5ZoOtOupbuex6W0u-RzYya100ADM",
      authDomain: "mcguffey-10ab2.firebaseapp.com",
      databaseURL: "https://mcguffey-10ab2.firebaseio.com",
      projectId: "mcguffey-10ab2",
      storageBucket: "mcguffey-10ab2.appspot.com",
      messagingSenderId: "706003180656"
    };

    firebase.initializeApp(firebaseConfig);
  }

  componentDidMount() {
    //this.props.navigation.navigate('upload');
    this.props.determineStatus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status == this.props.status) {
      return;
    }
    const { lesson, status, navigation } = nextProps;
    console.log('status', status)
    switch(status) {
      case 'testing':
        navigation.dispatch(resetAction('test'));
        return;
      case 'words':
        navigation.dispatch(resetAction('word', { lesson }));
        return;
      case 'story':
        navigation.dispatch(resetAction('story'));
        return;
      case 'initial':
        this.props.determineReligiousContent(lesson)
        navigation.dispatch(resetAction('download', { lesson }));
        return;
      case 'download':
        this.props.determineReligiousContent(lesson)
        navigation.dispatch(resetAction('download', { lesson }));
        return;
      case 'unavailable':
        navigation.dispatch(resetAction('unavailable'));
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner size="large" />
      </View>
    );
  }
}

const mapStateToProps = ({ user, words, story }) => {
  const { status, lesson } = user;
  return { status, lesson };
}

export default connect(mapStateToProps, { determineStatus, determineReligiousContent })(HomeScreen);
