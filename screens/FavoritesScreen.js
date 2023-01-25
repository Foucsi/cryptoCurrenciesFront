import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import fetchIp from "../fetchIp.json";

export default function FavoritesScreen({ navigation }) {
  const [list, setList] = useState([]);
  const users = useSelector((state) => state.user.value);
  const allCryptoFavorites = list.map((elmt, index) => {
    return (
      <View
        key={index}
        style={{
          height: 30,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22 }}>{elmt}</Text>
      </View>
    );
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://${fetchIp.myIp}:3000/users/getUserByToken/${users.token}`
      );
      const data = await res.json();
      const listCryptos = data.cryptosList.map((elmt) => elmt.cryptos);
      setList(listCryptos);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ fontSize: 28, color: "#D4D4D4" }}>COIN360</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20, alignItems: "center" }}>
        {allCryptoFavorites}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161817",
    alignItems: "center",
    justifyContent: "center",
  },
});
