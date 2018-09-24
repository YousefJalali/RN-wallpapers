import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import hero from "../assets/hero.jpg";

const header = props => (
  <View style={props.style}>
    <View style={styles.heroContainer}>
      <Image source={hero} style={styles.hero} />
      <LinearGradient colors={["#23293100", "#232931"]} style={styles.gradient}>
        <Text style={styles.heroText}>{props.title}</Text>
      </LinearGradient>
    </View>
  </View>
);

const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.6,
    position: "relative"
  },
  hero: {
    height: "100%",
    width: "100%"
  },
  gradient: {
    height: "30%",
    width: "100%",
    position: "absolute",
    top: "70%",
    justifyContent: "flex-end"
    // alignItems: "center"
  },
  heroText: {
    color: "#ededed",
    fontSize: 35,
    fontFamily: "Raleway-Bold",
    textAlign: "center",
    letterSpacing: 10,
    paddingBottom: 20
  }
});

export default header;
