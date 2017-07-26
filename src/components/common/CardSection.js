import React from 'react';
import { View } from 'react-native';

// functional level component
const CardSection = ({ isBorder, isColor, children }) => {
  var customStyle;
  if(isBorder) {
    if(isColor){
      customStyle = styles.containerStyleColor;
    }
    else {
      customStyle = styles.containerStyleNoColor;
    }
  }
  else {
    if(isColor){
      customStyle = styles.containerStyleColorWithourBorder;
    }
    else {
      customStyle = styles.containerStyleNoColorWithourBorder;
    }
  }
  return (
    <View style={customStyle}>
    {children}
    </View>
  );
};

//style={isBorder ?  customStyle  :  styles.containerStyleWithourBorder  }

const styles = {
  containerStyleColor: {
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFDB',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  containerStyleNoColor: {
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  containerStyleColorWithourBorder: {
    padding: 5,
    backgroundColor: '#FFFFDB',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  containerStyleNoColorWithourBorder: {
    padding: 5,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  }
};

export { CardSection };
