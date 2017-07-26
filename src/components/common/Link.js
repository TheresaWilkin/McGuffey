import React, { Component } from 'react';
import { Button } from 'react-native';

const Link = ({ onPress, title }) => (
  <Button
    onPress={onPress}
    title={title}
    style={styles.linkStyle}
  />
);

const styles = {
  linkStyle: {
    fontSize: 18
  }
}

export { Link };
