import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import fetchIp from "../fetchIp.json";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";

export default function Signin({ setIsVisible, navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const res = await fetch(`http://${fetchIp.myIp}:3000/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (data.result) {
      dispatch(
        login({
          username: data.user.username,
          email: data.user.email,
          password: data.user.password,
          token: data.user.token,
        })
      );
      navigation.navigate("Home");
      setEmail("");
      setPassword("");
      setUsername("");
    } else if (data.error === "Missing or empty fields") {
      setMsgError("Missing or empty fields");
    } else if (data.error === "User already exists") {
      setMsgError("User already exists");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "80%" }}>
        <Text style={{ paddingBottom: 10, color: "#414141" }}>Username</Text>
        <TextInput
          autoCapitalize={false}
          style={styles.input}
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
      </View>

      <View style={{ width: "80%" }}>
        <Text style={{ paddingBottom: 10, color: "#414141" }}>Email</Text>
        <TextInput
          autoCapitalize={false}
          style={styles.input}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={{ width: "80%" }}>
        <Text style={{ paddingBottom: 10, color: "#414141" }}>Password</Text>
        <TextInput
          autoCapitalize={false}
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View>
        <Text>{msgError}</Text>
      </View>
      <TouchableOpacity style={styles.touchable} onPress={() => handleSubmit()}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>SIGN UP</Text>
      </TouchableOpacity>
      <View
        style={{
          height: 30,
          width: "70%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#414141", fontSize: 18 }}>
          Already a user ?{" "}
        </Text>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "#414141",
              fontSize: 18,
            }}
          >
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
    padding: 5,
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
