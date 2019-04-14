import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { grey, black, white } from '../utils/colors';
import Button from './Button';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    const { title, numOfCards, navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cards}>{numOfCards} cards</Text>
        <View style={styles.btnContainer}>
          <Button
            text={"Add Card"}
            onPress={() => navigation.navigate(
              "NewCard",
              { title: title })}
            btnStyle={{ backgroundColor: white, borderWidth: 1, borderColor: black }}
            txtStyle={{ color: black }} />
          <Button
            text={"Start Quiz"}
            onPress={() => navigation.navigate(
              "Quiz",
              { title: title })}
            btnStyle={{ backgroundColor: black, marginTop: 20 }}
            txtStyle={{ color: white }} />
          <Button />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: "center",
    marginTop: 40
  },
  cards: {
    fontSize: 22,
    textAlign: "center",
    color: grey
  },
  btnContainer: {
    flex: 1,
    marginTop: 40
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params;
  return {
    title,
    numOfCards: state[title].questions.length
  };
};

export default connect(mapStateToProps)(DeckDetail);