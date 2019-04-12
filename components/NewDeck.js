import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { black, white, red } from '../utils/colors';

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
        <TextInput
          style={styles.txtInput}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title} />
        {this.state.error
          && <Text style={styles.errMsg}>{this.state.msg}</Text>}
        <TouchableOpacity
          style={styles.btn}
          onPress={this.onSubmit}>
          <Text style={styles.btnText}>SUBMIT</Text>
        </TouchableOpacity>
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
  txtInput: {
    height: 40,
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },
  errMsg: {
    fontSize: 16,
    color: red,
    padding: 10
  },
  btn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  decks: state
});

export default connect(mapStateToProps)(NewDeck);