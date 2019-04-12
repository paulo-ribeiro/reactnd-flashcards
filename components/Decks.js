import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';

const Decks = ({ decks }) => (
  <View style={{ flex: 1 }}>
    {Object.keys(decks).map(key => <Deck key={key} title={key} />)}
  </View>
);

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps)(Decks);
