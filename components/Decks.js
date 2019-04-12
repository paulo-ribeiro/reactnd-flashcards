import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';

const Decks = ({ decks, ...props }) => (
  <View style={{ flex: 1 }}>
    {Object.keys(decks).map(key =>
      <TouchableOpacity key={key} onPress={() => props.navigation.navigate(
        "DeckDetail",
        { title: key })}>
        <Deck title={key} />
      </TouchableOpacity>)}
  </View>
);

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps)(Decks);
