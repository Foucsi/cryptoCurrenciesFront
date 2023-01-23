import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function SignScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerSign}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C87B7",
  },
  containerSign: {
    height: "60%",
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
});
