import React, { Component } from 'react';
import { Text } from 'react-native';

const determineFontSize = (length) => {

  if (!length) {
    return 'huge';
  } else if (length < 5) {
    return 'huge';
  } else if (length < 30) {
    return 'large';
  } else if (length < 60) {
    return 'medium';
  } else {
    return 'small';
  }
}

const CardText = ({ children }) => {
  const size = determineFontSize(children.length);
  return (
    <Text style={styles[size]}>
      {children}
    </Text>
  );
};

const styles = {
  small: {
    fontSize: 20,
    padding: 10,
    lineHeight: 40,
    textAlign: 'center'
  },
  medium: {
    fontSize: 30,
    padding: 10,
    lineHeight: 60,
    textAlign: 'center'
  },
  large: {
    fontSize: 50,
    padding: 10,
    lineHeight: 100,
    textAlign: 'center'
  },
  huge: {
    fontSize: 100,
    padding: 10,
    lineHeight: 200,
    textAlign: 'center'
  },
}

export { CardText };
