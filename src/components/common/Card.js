import React from 'react';
import { View } from 'react-native';

// enhancing style of our application
// any time we pass a compoent that we write
// another compoent, that compoent will show up on
// the props object as props.childeren
// it will render any componet that we passed
// to this card one

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
    {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
