import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={{ width: "80%" }}>
        <Text style={{ paddingBottom: 10, color: "#414141" }}>Username</Text>
        <TextInput autoCapitalize={false} style={styles.input} />
      </View>

      <View style={{ width: "80%" }}>
        <Text style={{ paddingBottom: 10, color: "#414141" }}>Password</Text>
        <TextInput
          autoCapitalize={false}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.touchable}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#CACACA",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 24,
  },
  touchable: {
    backgroundColor: "#E73C71",
    width: "80%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
