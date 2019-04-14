import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { black, white } from '../utils/colors';
import { connect } from 'react-redux';
import { addCard } from '../actions'
import { saveCard } from '../utils/api';
import CustomInput from './CustomInput';
import Button from './Button';
import ErrMsg from './ErrorMsg';

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
    error: false
  };

  onSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch, navigation } = this.props;

    if (question.trim() === "" || answer.trim() === "") {
      this.setState({ error: true });
      return;
    }

    const card = {
      question,
      answer
    };

    dispatch(addCard(navigation.state.params.title, card));

    saveCard(navigation.state.params.title, card);

    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomInput
          inputStyle={{ marginTop: 10, marginBottom: 10 }}
          onChange={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder={"Question"} />
        <CustomInput
          inputStyle={{ marginTop: 10, marginBottom: 10 }}
          onChange={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder={"Answer"} />
        {this.state.error
          && <ErrMsg text={"Question and answer can't be blank."} />}
        <Button
          text={"Submit"}
          onPress={this.onSubmit}
          btnStyle={{ backgroundColor: black }}
          txtStyle={{ color: white }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20
  }
});

export default connect()(NewCard);