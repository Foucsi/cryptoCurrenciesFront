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
import { AntDesign } from "@expo/vector-icons";
import { deleteCrypto } from "../reducers/users";
import { useDispatch } from "react-redux";

export default function FavoritesScreen({ navigation }) {
  const [list, setList] = useState([]);
  const users = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const removeCrypto = async (cry) => {
    const res = await fetch(
      `http://${fetchIp.myIp}:3000/users/removeCrypto/${users.token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crypto: cry }),
      }
    );
    const data = await res.json();
    if (data.result) {
      setList([...list.filter((e) => e !== cry)]);
      dispatch(deleteCrypto(cry));
      console.log(users.crypto.length);
      console.log(users.crypto);
    }
  };

  const allCryptoFavorites = list.map((elmt, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          height: 30,
          width: "50%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22 }}>{elmt}</Text>
        <TouchableOpacity>
          <AntDesign
            name="delete"
            size={24}
            color="#fff"
            onPress={() => removeCrypto(elmt)}
          />
        </TouchableOpacity>
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
      <View style={{ marginTop: 20, alignItems: "center", width: "100%" }}>
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
