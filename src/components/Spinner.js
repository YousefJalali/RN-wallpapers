import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import LottieView from "lottie-react-native";

class Spinner extends Component {
  componentDidMount() {
    this.animation.play();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spinner}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={styles.container}
            source="spinner.json"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    height: 150,
    width: 150,
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 75,
    left: Dimensions.get("window").width / 2 - 75,
    backgroundColor: "#00000090",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Spinner;
