import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({
    isLabel,
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType,
    isCustomStyle,
    customStyle,
    multiline,
    isMaxLength,
    maxLength,
    defaultValue
  }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={isCustomStyle ?
    [containerStyle, customStyle]  : containerStyle}>
      {isLabel ? <Text style={labelStyle}>{label}</Text> : null }
      { isMaxLength ?
        <TextInput
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          maxLength={maxLength}
          style={isCustomStyle ? [inputStyle, customStyle] : inputStyle}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          underlineColorAndroid='transparent'
	  defaultValue={defaultValue}
        /> :
        <TextInput
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={isCustomStyle ? [inputStyle, customStyle] : inputStyle}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          underlineColorAndroid='transparent'
	  defaultValue={defaultValue}
        />
      }

    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    textAlignVertical: 'top'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  }
};

export { Input };
