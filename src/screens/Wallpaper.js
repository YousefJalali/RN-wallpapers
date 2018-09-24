import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions } from "react-native";

import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import PhotoView from "react-native-photo-view";
import {
  addFavoriteStorage,
  shareDialogInvisible,
  moreOptionsInvisible,
  moreOptionsVisible
} from "../store/actions/index";
import Backdrop from "../components/Backdrop";
import MoreOptions from "../components/MoreOptions";
import ShareDialog from "../components/ShareDialog";
import ModalBox from "../components/ModalBox";
import Spinner from "../components/Spinner";

class Wallpaper extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      hidden: false,
      wallpaper: this.props.wallpaper,
      source: this.props.source
    };
  }

  static navigatorStyle = {
    navBarTextColor: "#ededed",
    navBarTransparent: true,
    drawUnderNavBar: true,
    navBarComponentAlignment: "center",
    // navBarBackgroundColor: "#23293180",
    // statusBarColor: "#232931",
    topBarElevationShadowEnabled: false,
    statusBarHidden: true,
    screenBackgroundColor: "transparent"
  };
  static navigatorButtons = {
    leftButtons: [
      {
        id: "back",
        buttonColor: "#ededed"
      }
    ]
  };

  onNavigatorEvent = event => {
    console.log(event);
    if (event.type === "NavBarButtonPress") {
      if (event.id === "favorite") {
        this.props.onAddFavorite(this.state.wallpaper.key);
        setTimeout(() => this.changeFavIcon(), 150);
      }
    }
    if (event.type === "NavBarButtonPress") {
      if (event.id === "options") {
        this.props.onMoreOptionsVisible();
      }
    }
    if (event.type === "ScreenChangedEvent") {
      if (event.id === "willAppear") {
        this.changeFavIcon();
      }
    }
  };

  checkFav = () => {
    let isFav;
    const fv = this.props.favorites.find(
      wallpaper => wallpaper.key === this.state.wallpaper.key
    );
    if (fv) {
      console.log("favorite:", fv.key);
      console.log("wallpaper:", this.state.wallpaper.key);
      if (this.state.wallpaper.key === fv.key) {
        isFav = true;
      } else {
        isFav = false;
      }
    } else {
      console.log("not in fav");
      isFav = false;
    }
    return isFav;
  };

  changeFavIcon = () => {
    const favIcon = this.checkFav()
      ? this.props.iconsMap[2]
      : this.props.iconsMap[1];
    this.props.navigator.setButtons({
      rightButtons: [
        {
          id: "options",
          disableIconTint: true,
          icon: this.props.iconsMap[0]
        },
        {
          id: "favorite",
          icon: favIcon
        }
      ]
    });
  };

  onTapImageHandler = () => {
    this.setState(prevState => {
      return {
        hidden: !prevState.hidden
      };
    });
    this.props.navigator.toggleNavBar({
      to: this.state.hidden ? "shown" : "hidden",
      animated: true
    });
  };

  // onOptionsCloseHandler = () => {
  //   this.props.onMoreOptionsInvisible();
  // };

  onSwipe = gestureName => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    let wallpapers = null;

    if (this.state.source === "wallpapers") {
      wallpapers = this.props.wallpapers;
    } else {
      wallpapers = this.props.favorites;
    }

    const currentWallpaperIndex = wallpapers.indexOf(
      wallpapers.find(wallpaper => wallpaper === this.state.wallpaper)
    );
    switch (gestureName) {
      case SWIPE_LEFT:
        if (currentWallpaperIndex < wallpapers.length - 1) {
          const newWallpaper = wallpapers[currentWallpaperIndex + 1];
          this.setState(
            {
              wallpaper: newWallpaper
            },
            () => this.changeFavIcon()
          );
        }
        break;

      case SWIPE_RIGHT:
        if (currentWallpaperIndex > 0) {
          const newWallpaper = wallpapers[currentWallpaperIndex - 1];
          this.setState(
            {
              wallpaper: newWallpaper
            },
            () => this.changeFavIcon()
          );
        }
        console.log("right");
        break;
    }
  };

  render() {
    let options = null;
    let modalBox = null;
    let spinner = null;
    let shareDialog = null;

    // More Options
    if (this.props.moreOptionsVisible) {
      options = (
        <Backdrop
          closeBackdrop={this.props.onMoreOptionsInvisible}
          visible={this.props.moreOptionsVisible}
        >
          <MoreOptions wallpaper={this.state.wallpaper.wallpaper} />
        </Backdrop>
      );
    }

    // Modal Box
    if (this.props.modalBoxVisible) {
      modalBox = (
        <Backdrop visible={this.props.modalBoxVisible}>
          <ModalBox message={"Saved to Your Library"} />
        </Backdrop>
      );
    }

    // Spinner
    if (this.props.loading) {
      spinner = (
        <Backdrop visible={this.props.loading}>
          <Spinner />
        </Backdrop>
      );
    }

    if (this.props.shareDialogVisible) {
      shareDialog = (
        <Backdrop
          visible={this.props.shareDialogVisible}
          closeBackdrop={this.props.onShareDialogInvisible}
        >
          <ShareDialog
            visible={this.props.shareDialogVisible}
            url={this.state.wallpaper.wallpaper.uri}
          />
        </Backdrop>
      );
    }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <View style={styles.container}>
        {/* {this.props.shareDialogVisible ? shareDialog : null} */}
        {shareDialog}
        {options}
        {modalBox}
        {spinner}
        <GestureRecognizer
          onSwipe={gestureName => this.onSwipe(gestureName)}
          config={config}
        >
          <PhotoView
            source={this.state.wallpaper.wallpaper}
            minimumZoomScale={1}
            maximumZoomScale={3}
            androidScaleType="centerCrop"
            style={styles.img}
            onTap={this.onTapImageHandler}
          />
        </GestureRecognizer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232931"
    // position: "absolute",
    // zIndex: 500
  },
  img: {
    height: "100%",
    width: "100%"
    // height: Dimensions.get("window").height,
    // width: Dimensions.get("window").width,
    // position: "absolute",
    // zIndex: 10
  },
  abs: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 20
  }
});

const mapStateToProps = state => {
  return {
    wallpapers: state.wallpaper.wallpapers,
    favorites: state.wallpaper.favorites,
    iconsMap: state.icons.icons,
    shareDialogVisible: state.ui.shareDialogVisible,
    moreOptionsVisible: state.ui.moreOptionsVisible,
    modalBoxVisible: state.ui.modalBoxVisible,
    loading: state.ui.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddFavorite: wallpaperKey => dispatch(addFavoriteStorage(wallpaperKey)),
    onShareDialogInvisible: () => dispatch(shareDialogInvisible()),
    onMoreOptionsVisible: () => dispatch(moreOptionsVisible()),
    onMoreOptionsInvisible: () => dispatch(moreOptionsInvisible())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallpaper);
