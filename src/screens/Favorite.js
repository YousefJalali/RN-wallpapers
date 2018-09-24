import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  FlatList
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import hero from "../assets/hero.jpg";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

class Favorite extends Component {
  state = {
    source: "favorites"
  };

  static navigatorStyle = {
    navBarTransparent: true,
    drawUnderNavBar: true,
    statusBarHidden: true,
    navBarComponentAlignment: "center",
    topBarElevationShadowEnabled: false,
    navBarButtonColor: "#ededed"
  };

  wallpaperPressedHandler = key => {
    this.props.navigator.push({
      screen: "skull.Wallpaper",
      // title: "Wallpaper",
      passProps: {
        wallpaper: this.props.favorites.find(
          wallpaper => wallpaper.key === key
        ),
        source: this.state.source
      },
      animated: true,
      animationType: "fade"
    });
  };

  render() {
    let favWallpapers = (
      <View>
        <Header title="FAVORITE" />
        <Text style={styles.noFavText}>No favorite wallpapers :\</Text>
      </View>
    );

    if (this.props.favorites.length !== 0) {
      favWallpapers = (
        <FlatList
          data={this.props.favorites}
          numColumns={2}
          getItemLayout={(data, index) => ({
            length: 250,
            offset: 250 * index,
            index
          })}
          ListHeaderComponent={() => <Header title="FAVORITE" />}
          renderItem={info => {
            console.log(info === true)
            return (
            <TouchableOpacity
              key={info.item.key}
              style={styles.imgLink}
              onPress={() => this.wallpaperPressedHandler(info.item.key)}
            >
              <Image source={info.item.wallpaper} style={styles.img} />
            </TouchableOpacity>
          )}}
        />
      );
    }
    return <View style={styles.container}>{favWallpapers}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232931"
    // backgroundColor: "#ededed",
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
  },
  noFavText: {
    textAlign: "center",
    color: "#ededed30",
    fontSize: 20,
    fontFamily: "Raleway-Bold",
    marginTop: "20%"
  }
});

const mapStateToProps = state => {
  return {
    wallpapers: state.wallpaper.wallpapers,
    favorites: state.wallpaper.favorites
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onFetchFavorite: wallpapers => dispatch(fetchFavorite(wallpapers))
//   };
// };

export default connect(mapStateToProps)(Favorite);
