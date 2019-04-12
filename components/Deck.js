import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';

const Deck = ({ title, numOfCards }) => (
  <View style={styles.item}>
    <Text>{title}</Text>
    <Text>{numOfCards} cards</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
});

const mapStateToProps = (state, { title }) => ({
  numOfCards: state[title].questions.length
});

export default connect(mapStateToProps)(Deck);