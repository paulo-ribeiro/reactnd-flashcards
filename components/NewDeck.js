import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { black, white, red } from '../utils/colors';
import Button from './Button';
import CustomInput from './CustomInput';

class NewDeck extends Component {
  state = {
    title: "",
    error: false,
    msg: ""
  };

  onSubmit = () => {
    const { title } = this.state;

    if (title.trim() === "") {
      this.setState({
        error: true,
        msg: "Title cant be blank."
      });
      return;
    }

    if (this.props.decks[title]) {
      this.setState({
        error: true,
        msg: "A deck with this title already exists."
      });
      return;
    }

    this.props.dispatch(addDeck({
      title,
      questions: []
    }));

    this.setState({ title: "", error: false, msg: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <CustomInput
          inputStyle={{ marginTop: 10, marginBottom: 10 }}
          onChange={(title) => this.setState({ title })}
          value={this.state.title} />
        {this.state.error
          && <Text style={styles.errMsg}>{this.state.msg}</Text>}
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
    marginTop: 10
  },
  question: {
    fontSize: 26,
    textAlign: "center"
  },
  errMsg: {
    fontSize: 16,
    color: red,
    padding: 10
  }
});

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps)(NewDeck);