import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import fetchIp from "../fetchIp.json";
import { AntDesign } from "@expo/vector-icons";
import { deleteCrypto } from "../reducers/users";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { printToFileAAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

export default function FavoritesScreen({ navigation }) {
  const [list, setList] = useState([]);
  const users = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const route = useRoute();
  const { crypto } = route.params;

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
    return crypto.map((e) => {
      if (elmt === e.name) {
        return (
          <View
            key={index}
            style={{
              marginTop: 10,
              flexDirection: "row",
              height: 30,
              width: "60%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{ uri: e.image }}
              style={{ height: 30, width: 30 }}
            />
            <Text style={{ color: "#fff", fontSize: 22 }}>{elmt}</Text>
            <Text style={{ color: "#fff", fontSize: 16 }}>
              ${e.current_price}
            </Text>
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
      }
    });
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
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          style={{ backgroundColor: "tomato", padding: 10, borderRadius: 5 }}
        >
          <Text>Generate PDF</Text>
        </TouchableOpacity>
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
