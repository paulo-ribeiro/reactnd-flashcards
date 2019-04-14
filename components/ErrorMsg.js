import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { red } from '../utils/colors';

export default ErrorMsg = ({ text, txtStyle }) =>
  <Text style={[styles.errMsg, txtStyle]}>{text}</Text>;

const styles = StyleSheet.create({
  errMsg: {
    fontSize: 16,
    color: red,
    padding: 10
  }
});
