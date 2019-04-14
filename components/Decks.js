import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';

const Decks = ({ decks, navigation }) => (
  <View style={{ flex: 1 }}>
    {Object.keys(decks).map(key =>
      <TouchableOpacity key={key} onPress={() => navigation.navigate(
        "DeckDetail",
        { title: key })}>
        <Deck title={key} />
      </TouchableOpacity>)}
    {Object.keys(decks).length === 0
      && <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
        {"There are no decks added yet \u{1F61E}"}
      </Text>}
  </View>
);

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps)(Decks);
