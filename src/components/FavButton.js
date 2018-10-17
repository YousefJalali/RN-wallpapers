import React, { Component } from "react";
import { Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class FavButton extends Component {
  state = {
    fadeAnim: new Animated.Value(1)
  };

  onPressHandler = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0.5,
      duration: 100
    }).start();
  };
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
        <Animated.View
          style={[
            styles.button,
            {
              ...this.props.style,
              opacity: fadeAnim
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
    alignItems: "center"
  }
});

export default FavButton;
