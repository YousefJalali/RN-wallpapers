import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import logo from "../assets/logo.png";
import Icon from "react-native-vector-icons/Ionicons";

class SideDrawer extends Component {
  favoritePressedHandler = () => {
    this.props.navigator.push({
      screen: "skull.Favorite",
      // title: "Favorite",
      animated: true,
      animationType: "fade"
    });
    this.props.navigator.toggleDrawer({
      side: "left"
    });
  };

  aboutPressedHandler = () => {
    this.props.navigator.push({
      screen: "skull.About",
      // title: "Favorite",
      animated: true,
      animationType: "fade"
    });
    this.props.navigator.toggleDrawer({
      side: "left"
    });
  };

  render() {
    return (
      <View style={styles.sideDrawer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={this.favoritePressedHandler}
          >
            <Icon
              name="md-heart"
              size={25}
              color="#f73859"
              style={styles.icon}
            />
            <Text style={styles.link}>FAVORITE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkContainer}
            onPress={this.aboutPressedHandler}
          >
            <Icon
              name="md-information-circle-outline"
              size={25}
              color="#ededed"
              style={styles.icon}
            />
            <Text style={styles.link}>ABOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideDrawer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width * 0.7,
    backgroundColor: "#232931",
    justifyContent: "flex-start"
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 40,
    opacity: 0.7
  },
  nav: {
    paddingLeft: 16
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 48
  },
  link: {
    color: "#ededed",
    fontSize: 20,
    fontFamily: "Raleway-Medium"
  },
  icon: {
    marginRight: 24
  }
});

export default SideDrawer;
