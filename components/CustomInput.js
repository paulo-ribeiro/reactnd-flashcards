import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ inputStyle, onChange, value, placeholder }) => (
  <TextInput
    style={[styles.txtInput, inputStyle]}
    onChangeText={onChange}
    value={value}
    placeholder={placeholder} />
);

const styles = StyleSheet.create({
  txtInput: {
    height: 40,
    fontSize: 20
  }
});

export default CustomInput;