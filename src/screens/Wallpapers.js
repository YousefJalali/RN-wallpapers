import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { fetchWallpapers, getIcons } from "../store/actions/index";
import Header from '../components/Header';

class Wallpapers extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      source: "wallpapers"
    };
  }

  static navigatorStyle = {
    navBarTextFontFamily: "Poppins-SemiBold",
    topBarElevationShadowEnabled: false
  };

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  };

  componentDidMount() {
    this.props.onFetchWallpapers();
    this.props.onGetIcons();
  }

  wallpaperPressedHandler = key => {
    const wallpaper = this.props.wallpapers.find(
      wallpaper => wallpaper.key === key
    );
    this.props.navigator.push({
      screen: "skull.Wallpaper",
      // title: "Wallpaper",
      passProps: {
        wallpaper: wallpaper,
        source: this.state.source
      },
      animated: true,
      animationType: "fade"
    });
  };

  render() {
    let wallpapers = null;
    if (this.props.wallpapers && this.props.favorites) {
      wallpapers = (
        <FlatList
          data={this.props.wallpapers}
          numColumns={2}
          getItemLayout={(data, index) => ({
            length: 250,
            offset: 250 * index,
            index
          })}
          ListHeaderComponent={() => <Header title="SKULL WALLPAPERS" />}
          renderItem={info => {
            let likesNumber = info.item.likes * 10;
            if (likesNumber.toString().length > 3) {
              likesNumber = likesNumber / 1000 + "k";
            }

            let favIcon = (
              <Icon name="md-heart-empty" size={25} color="#ededed" />
            );
            if (
              this.props.favorites.find(
                wallpaper => wallpaper.key === info.item.key
              )
            ) {
              favIcon = <Icon name="md-heart" size={25} color="#f73859" />;
            }

            return (
              <TouchableOpacity
                key={info.item.key}
                style={styles.imgLink}
                onPress={() => this.wallpaperPressedHandler(info.item.key)}
              >
                <Image source={info.item.wallpaper} style={styles.img} />
                <LinearGradient
                  colors={["#23293100", "#232931"]}
                  style={styles.gradient}
                >
                  <View style={styles.imgLikes}>
                    {favIcon}
                    <Text style={styles.imgText}>{likesNumber}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
        />
      );
    }
    return <View style={styles.container}>{wallpapers}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232931"
    // backgroundColor: "#ededed",
  },
  gradient: {
    height: "30%",
    width: "100%",
    position: "absolute",
    top: "71%",
    justifyContent: "flex-end"
    // alignItems: "center"
  },
  imgLink: {
    width: "50%",
    height: 250
  },
  img: {
    width: "100%",
    height: 250,
    resizeMode: "cover"
  },
  imgLikes: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  imgText: {
    fontSize: 18,
    color: "#ededed",
    marginLeft: 5,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    wallpapers: state.wallpaper.wallpapers,
    favorites: state.wallpaper.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchWallpapers: () => dispatch(fetchWallpapers()),
    onGetIcons: () => dispatch(getIcons())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallpapers);
