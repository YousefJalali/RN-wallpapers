import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class ModalBox extends Component {
  state = {
    modalBoxAnim: new Animated.Value(0)
  };
  componentDidMount() {
    Animated.timing(this.state.modalBoxAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: this.state.modalBoxAnim,
            transform: [
              {
                scale: this.state.modalBoxAnim
              }
            ]
          }
        ]}
      >
        <View style={styles.modalBox}>
          <Icon name="md-checkmark" size={50} color="#ededed" />
          <Text style={styles.text}>{this.props.message}</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalBox: {
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
  },
  text: {
    color: "#ededed",
    fontSize: 18,
    textAlign: "center"
  }
});

export default ModalBox;
