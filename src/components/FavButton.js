import React, { Component } from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class FavButton extends Component {
  state = {
    fadeAnim: new Animated.Value(1) // Initial value for opacity: 0
  };

  onPressHandler = () => {
    Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 0.5, // Animate to opacity: 1 (opaque)
          duration: 100 // Make it take a while
        }
      ).start(); // Starts the animation
  }
  render() {
    let { fadeAnim } = this.state;
    let btnColor = "#ededed";
    if (this.props.isFav) {
      btnColor = "#f73859";
    } else {
      btnColor = "#ededed";
    }
    return (
      <TouchableWithoutFeedback onPress={this.onPressHandler}>
        <Animated.View // Special animatable View
          style={[
            styles.button,
            {
              ...this.props.style,
              opacity: fadeAnim // Bind opacity to animated value
            }
          ]}
        >
          <Icon name="md-heart" size={30} color={btnColor} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
    width: 30,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white"
  }
});

export default FavButton;
