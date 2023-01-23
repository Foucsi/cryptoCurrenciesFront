import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { useState } from "react";

export default function SignScreen({ navigation }) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.upSign}>
        <View
          style={{
            height: "100%",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isVisible ? "#E73C71" : "#fff",
          }}
        >
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Text
              style={{
                color: isVisible ? "#fff" : "#373737",
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: "100%",
            width: "50%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isVisible ? "#fff" : "#E73C71",
          }}
        >
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Text
              style={{
                color: "#373737",
                fontWeight: "bold",
                fontSize: 24,
                color: isVisible ? "#373737" : "#fff",
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerSign}>
        {isVisible ? (
          <Signin setIsVisible={setIsVisible} />
        ) : (
          <Signup setIsVisible={setIsVisible} />
        )}
      </View>
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  upSign: {
    width: "90%",
    height: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});
