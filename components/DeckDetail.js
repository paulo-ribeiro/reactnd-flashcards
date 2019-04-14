import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { grey, black, white } from '../utils/colors';
import Button from './Button';
import ErrorMsg from './ErrorMsg';

class DeckDetail extends Component {
  state = {
    error: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  onAddCard = () => {
    const { navigation, title } = this.props;

    this.setState({ error: false });

    navigation.navigate(
      "NewCard",
      { title: title });
  };

  onStartQuiz = () => {
    const { numOfCards, navigation, title } = this.props;

    if (numOfCards === 0) {
      this.setState({ error: true });
      return;
    }

    navigation.navigate(
      "Quiz",
      { title: title });
  };

  render() {
    const { title, numOfCards } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.cards}>{numOfCards} cards</Text>
        <View style={styles.btnContainer}>
          <Button
            text={"Add Card"}
            onPress={this.onAddCard}
            btnStyle={{ backgroundColor: white, borderWidth: 1, borderColor: black }}
            txtStyle={{ color: black }} />
          <Button
            text={"Start Quiz"}
            onPress={this.onStartQuiz}
            btnStyle={{ backgroundColor: black, marginTop: 20 }}
            txtStyle={{ color: white }} />
          {this.state.error
            && <ErrorMsg text={"You dont have any cards \u{1F61E}"} txtStyle={{ textAlign: "center" }} />}
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