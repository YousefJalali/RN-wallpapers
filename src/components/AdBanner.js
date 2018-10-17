import React from "react";
import { View, StyleSheet } from "react-native";
import { AdMobBanner } from "react-native-admob";

const adBanner = () => (
  <View style={styles.adContainer}>
    <AdMobBanner
      adSize="banner"
      adUnitID="/6499/example/banner"
      // adUnitID="ca-app-pub-4715507917149846/9325354437"
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
    />
  </View>
);

const styles = StyleSheet.create({
  adContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    alignItems: "center",
    zIndex: 5000
  }
});

export default adBanner;
