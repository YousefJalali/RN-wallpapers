import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

const backdrop = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        console.log("Modal has been closed.");
      }}
    >
      <TouchableWithoutFeedback
        onPress={props.closeBackdrop}
        style={styles.container}
      >
        <View style={styles.container}>{props.children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000050"
  }
});

export default backdrop;
