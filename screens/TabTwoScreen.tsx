import * as React from "react";
import { Component } from "react";
import { Animated, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SvgUri } from "react-native-svg";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default class TabTwoScreen extends Component {
  _onPressButton() {
    alert("Test");
  }
  state = {
    inText: "ssssss",
    url: "https://www.flaticon.com/svg/static/icons/svg/188/188993.svg",
  };
  render() {
    const { inText } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPressButton}>
          <SvgUri style={styles.poke} uri={this.state.url} />
        </TouchableOpacity>

        <TextInput
          placeholder="Durumun nedir?"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          autoCapitalize="characters"
          onChangeText={(h) => {
            if (h.toUpperCase() == "ÜZGÜN") {
              this.setState({
                url:
                  "https://www.flaticon.com/svg/static/icons/svg/188/188939.svg",
              });
            } else {
              this.setState({
                url:
                  "https://www.flaticon.com/svg/static/icons/svg/188/188993.svg",
              });
            }
          }}
          style={styles.textInput}
        ></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  poke: {
    width : "75",
    height : "75",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textInput: {
    borderRadius: 8,
    width: 250,
    padding: 5,
    fontFamily: "sans-serif-light",
    fontWeight: "700",
    height: 33,
    color: "#fff",
    backgroundColor: "#2c3e50",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    
    elevation: 23,
  },
});
