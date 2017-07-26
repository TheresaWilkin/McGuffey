import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Spinner } from './Spinner';

const Button = ({ onPress, children, loading }) => {
  const { buttonStyle, textStyle } = styles;
  return loading ?
      <Spinner size="small" /> :
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>
          {children}
        </Text>
      </TouchableOpacity>
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#29B6F6',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#03A9F4',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
