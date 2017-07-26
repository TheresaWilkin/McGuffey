import React, { Component } from 'react';
import { Text } from 'react-native';

const TitleText = ({ children }) => (
  <Text style={styles.textStyle}>
    {children}
  </Text>
);

const styles = {
  textStyle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  }
}

export { TitleText };
