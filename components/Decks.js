import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import Deck from './Deck';

class Decks extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState({ ready: true }));
  }

  render() {
    if (!this.state.ready)
      return <AppLoading />;

    const { decks, navigation } = this.props;
    return (
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
  }
}

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps)(Decks);
