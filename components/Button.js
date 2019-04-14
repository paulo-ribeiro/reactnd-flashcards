import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ text, btnStyle, txtStyle, onPress }) => (
  <TouchableOpacity
    style={[styles.btn, btnStyle]}
    onPress={onPress}>
    <Text style={[styles.btnText, txtStyle]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  btnText: {
    fontSize: 22,
    textAlign: "center",
  }
});

export default Button;