import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { green, red, white, black } from '../utils/colors';
import Button from './Button';
import { clearLocalNotification, setLocalNotification } from '../utils/api';

class Quiz extends Component {
  state = {
    toggleAnswer: false,
    correct: 0,
    position: 0
  };

  nextQuestion = () => {
    this.setState(
      prevState => ({ position: prevState.position + 1 }),
      () => this.state.position === this.props.deck.questions.length 
        && clearLocalNotification().then(setLocalNotification));
  };

  onCorrect = () => {
    this.nextQuestion();
    this.setState(prevState => ({ correct: prevState.correct + 1 }));
  };

  onRestart = () => this.setState({
    toggleAnswer: false,
    correct: 0,
    position: 0
  });

  render() {
    const { deck, navigation } = this.props;
    const { position, toggleAnswer, correct } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {(position + 1) <= deck.questions.length
          && <Text style={styles.tracker}>
            {`${position + 1}/${deck.questions.length}`}
          </Text>}
        <View style={styles.questionContainer}>
          {position === deck.questions.length
            ? <Fragment>
              <Text style={styles.scoreLabel}>Score:</Text>
              <Text style={styles.scoreValue}>{`${correct} out of ${deck.questions.length}`}</Text>
            </Fragment>
            : <Fragment>
              <Text style={styles.questionAnswer}>
                {toggleAnswer ? deck.questions[position].answer : deck.questions[position].question}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState(prevState =>
                    ({ toggleAnswer: !prevState.toggleAnswer }))}>
                <Text style={styles.toggleAnswer}>{toggleAnswer ? "Question" : "Answer"}</Text>
              </TouchableOpacity>
            </Fragment>}
        </View>
        <View style={styles.btnContainer}>
          {position === deck.questions.length
            ? <Fragment>
              <Button
                text={"Restart Quiz"}
                onPress={this.onRestart}
                btnStyle={{ backgroundColor: white, borderWidth: 1, borderColor: black }}
                txtStyle={{ color: black }} />
              <Button
                text={"Back to Deck"}
                onPress={() => navigation.goBack()}
                btnStyle={{ backgroundColor: black, marginTop: 20 }}
                txtStyle={{ color: white }} />
            </Fragment>
            : <Fragment>
              <Button
                text={"Correct"}
                onPress={this.onCorrect}
                btnStyle={{ backgroundColor: green }}
                txtStyle={{ color: white }} />
              <Button
                text={"Incorrect"}
                onPress={this.nextQuestion}
                btnStyle={{ backgroundColor: red, marginTop: 20 }}
                txtStyle={{ color: white }} />
            </Fragment>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tracker: {
    fontSize: 24,
    textAlign: "left",
    padding: 5
  },
  questionContainer: {
    flex: 1,
    marginTop: 50
  },
  btnContainer: {
    flex: 1,
    marginTop: 20
  },
  questionAnswer: {
    fontSize: 28,
    textAlign: "center"
  },
  toggleAnswer: {
    fontSize: 24,
    textAlign: "center",
    color: red,
    marginTop: 10
  },
  scoreLabel: {
    fontSize: 30,
    textAlign: "center"
  },
  scoreValue: {
    fontSize: 28,
    textAlign: "center",
    color: red
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params;
  return {
    deck: state[title]
  };
};

export default connect(mapStateToProps)(Quiz);