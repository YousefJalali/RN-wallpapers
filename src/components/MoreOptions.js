import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  shareDialogVisible,
  moreOptionsInvisible,
  saveToCameraRoll
} from "../store/actions/index";
import WallPaperManager from "react-native-wallpaper-manager";

class MoreOptions extends Component {
  state = {
    scaleAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.scaleAnim, {
      toValue: 184,
      duration: 500
    }).start();
  }

  onDownloadHandler = () => {
    this.props.onMoreOptionsInvisible();
    this.props.onSaveToCameraRoll(this.props.wallpaper);
  };
  onShareHandler = () => {
    this.props.onMoreOptionsInvisible();
    this.props.onShareDialogVisible();
  };
  onSetWallpaperHandler = () => {
    this.props.onMoreOptionsInvisible();
    console.log(this.props.wallpaper.uri);
    WallPaperManager.setWallPaper({ uri: "https://i.redd.it/f0ujrjilatj01.jpg" }, res =>
    // WallPaperManager.setWallPaper({ uri: this.props.wallpaper.uri }, res =>
      console.log(res)
    );
  };
  render() {
    return (
        <Animated.View
          style={[
            styles.moreOptions,
            { height: this.state.scaleAnim,
              width: this.state.scaleAnim.interpolate({
                inputRange: [0, 184],
                outputRange: [0, 200]
              }) }
          ]}
        >
          <TouchableOpacity
            onPress={this.onDownloadHandler}
            style={styles.rowContainer}
          >
            <View style={styles.row}>
              <Icon
                name="md-download"
                size={24}
                color="#232931"
                style={styles.icon}
              />
              <Text style={styles.text}>Save</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onShareHandler}
            style={styles.rowContainer}
          >
            <View style={styles.row}>
              <Icon
                name="md-share"
                size={24}
                color="#232931"
                style={styles.icon}
              />
              <Text style={styles.text}>Share</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onSetWallpaperHandler}
            style={styles.rowContainer}
          >
            <View style={styles.row}>
              <Icon
                name="md-image"
                size={24}
                color="#232931"
                style={styles.icon}
              />
              <Text style={styles.text}>Set as wallpaper</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  moreOptions: {
    height: 184,
    width: 200,
    position: "absolute",
    right: 10,
    top: 45,
    backgroundColor: "#ededed",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 8,
    borderRadius: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  text: {
    color: "#232931",
    fontSize: 16,
    fontFamily: "Roboto"
  },
  rowContainer: {
    width: "100%",
    paddingHorizontal: 16
  },
  row: {
    height: 56,
    // marginBottom: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  icon: {
    marginRight: 24
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onShareDialogVisible: () => dispatch(shareDialogVisible()),
    onMoreOptionsInvisible: () => dispatch(moreOptionsInvisible()),
    onSaveToCameraRoll: wallpaper => dispatch(saveToCameraRoll(wallpaper))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MoreOptions);
