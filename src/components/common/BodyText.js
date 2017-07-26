import React, { Component } from 'react';
import { Text } from 'react-native';

const BodyText = ({ size, children }) => (
  <Text style={styles[size]}>
    {children}
  </Text>
);

const styles = {
  small: {
    fontSize: 18,
    padding: 10,
    lineHeight: 30
  },
  medium: {
    fontSize: 22,
    padding: 10,
    lineHeight: 40
  },
  large: {
    fontSize: 26,
    padding: 10,
    lineHeight: 50
  }
}

export { BodyText };
