import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

class About extends Component {
  static navigatorStyle = {
    navBarTransparent: true,
    drawUnderNavBar: true,
    statusBarHidden: true,
    navBarComponentAlignment: "center",
    topBarElevationShadowEnabled: false,
    navBarButtonColor: "#ededed"
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="ABOUT" />
        <ScrollView style={styles.about}>
          <Text style={styles.p}>
            Made with&nbsp;
            <Icon name="md-heart" size={20} color="#f73859" /> from a Skull Art
            lover. All these beautiful wallpapers are gathered from different
            sources so you can style your phone with it. We are going to add
            more wallpapers weekly. If you like this app please
          </Text>
          <TouchableOpacity style={styles.btnContainer}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>RATE THIS APP</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.p}>
            If you have any suggestion to improve this app please leave a
            comment. Looking forward to your feedback.
          </Text>
          <Text style={styles.header}>CREDITS</Text>
          <Text style={styles.p}>Background vector created by Freepik</Text>
          <Text style={styles.link}>
            https://www.freepik.com/free-photos-vectors/background
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232931",
    position: "relative"
  },
  hero: {
    position: "absolute",
    top: 0
  },
  about: {
    paddingHorizontal: 17,
    marginBottom: 20
  },
  header: {
    color: "#ededed",
    fontSize: 35,
    fontFamily: "Raleway-Bold",
    textAlign: "center",
    letterSpacing: 10,
    paddingBottom: 20,
    paddingTop: 50
  },
  p: {
    fontSize: 18,
    color: "#ededed95",
    textAlign: "center"
  },
  link: {
    fontStyle: "italic",
    color: "#ededed",
    textAlign: "center"
  },
  btnContainer: {
    alignItems: "center"
  },
  btn: {
    backgroundColor: "#f73859",
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 20
  },
  btnText: {
    color: "#ededed",
    textAlign: "center"
  },
  icon: {
    paddingHorizontal: 20
  }
});

export default About;
