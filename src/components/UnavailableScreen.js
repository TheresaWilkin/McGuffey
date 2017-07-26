import React from 'react';
import { View } from 'react-native';
import { BodyText, TitleText } from './common';
import styles from '../styles';

const UnavailableScreen = () => (
  <View style={{ flex: 1, justifyContent: 'space-around', padding: 20 }}>
    <TitleText>Lesson Unavailable</TitleText>
    <BodyText size="small">Please try again later, or contact theresawilkin@yahoo.com to request this lesson.</BodyText>
  </View>
);

export default UnavailableScreen;
