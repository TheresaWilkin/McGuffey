import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { BodyText } from './common';

const YesNoButton = ({ text, image, onPress }) => (
  <View style={{ padding: 10, alignItems: 'center', flex: 1, borderRightWidth: 1, borderLeftWidth: 1, justifyContent: 'space-around' }}>
    <TouchableOpacity onPress={() => onPress()}>
    <Image
      source={image}
      style={{ height: 70, width: 60, alignSelf: 'center' }}
    />
    <BodyText size="small">{text}</BodyText>
    </TouchableOpacity>
  </View>
);

export default YesNoButton;
