import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  ToastAndroid,
  AlertIOS,
  Platform,
  Animated
} from "react-native";
import Share, { ShareSheet, Button } from "react-native-share";
import { shareDialogInvisible } from "../store/actions/index";
import Icon from "react-native-vector-icons/Ionicons";

class ShareDialog extends Component {
  state = {
    slideAnim: new Animated.Value(-226)
  };

  componentDidMount() {
    Animated.timing(this.state.slideAnim, {
      toValue: 0,
      duration: 500
    }).start();
  }

  onCancel() {
    this.props.onShareDialogInvisible();
  }

  render() {
    let shareOptions = {
      title: "Skull Wallpaper",
      message: "Hello",
      url: this.props.url,
      subject: "Share Link" //  for email
    };

    let shareImageBase64 = {
      title: "React Native",
      message: "Hola mundo",
      url: this.props.iconsMap[1],
      subject: "Share Link" //  for email
    };
    return (
      <Animated.View
        style={[styles.container, { bottom: this.state.slideAnim }]}
      >
        <ShareSheet
          visible={this.props.visible}
          onCancel={this.onCancel.bind(this)}
        >
          <Button
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "facebook"
                  })
                );
              }, 300);
            }}
          >
            <Icon
              name="logo-facebook"
              size={24}
              color="#232931"
              style={styles.icon}
            />
            <Text style={styles.text}>Facebook</Text>
          </Button>
          <Button
            iconSrc={this.props.iconsMap[4]}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "whatsapp"
                  })
                );
              }, 300);
            }}
          >
            <Icon
              name="logo-whatsapp"
              size={24}
              color="#232931"
              style={styles.icon}
            />
            <Text style={styles.text}>Whatsapp</Text>
          </Button>

          <Button
            iconSrc={this.props.iconsMap[5]}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(
                  Object.assign(shareOptions, {
                    social: "email"
                  })
                );
              }, 300);
            }}
          >
            <Icon
              name="md-mail"
              size={24}
              color="#232931"
              style={styles.icon}
            />
            <Text style={styles.text}>Email</Text>
          </Button>
          <Button
            iconSrc={this.props.iconsMap[6]}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                if (typeof shareOptions["url"] !== undefined) {
                  Clipboard.setString(shareOptions["url"]);
                  if (Platform.OS === "android") {
                    ToastAndroid.show("Link copied", ToastAndroid.SHORT);
                  } else if (Platform.OS === "ios") {
                    AlertIOS.alert("Link copied");
                  }
                }
              }, 300);
            }}
          >
            <Icon
              name="md-link"
              size={24}
              color="#232931"
              style={styles.icon}
            />
            <Text style={styles.text}>Copy Link</Text>
          </Button>
        </ShareSheet>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ededed",
    position: "absolute",
    width: "100%"
  },
  instructions: {
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    color: "#232931",
    fontSize: 16,
    fontFamily: "Roboto"
  },
  icon: {
    marginRight: 24
  }
});

const mapStateToProps = state => {
  return {
    iconsMap: state.icons.icons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onShareDialogInvisible: () => dispatch(shareDialogInvisible())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareDialog);
