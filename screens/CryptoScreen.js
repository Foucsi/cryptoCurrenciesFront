import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { useState } from "react";
import fetchIp from "../fetchIp.json";
import { useSelector } from "react-redux";
import { moreCrypto } from "../reducers/users";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function CryptoScreen({ navigation }) {
  const [colorIcon, setColorIcon] = useState(false);
  const users = useSelector((state) => state.user.value);
  const route = useRoute();
  const { crypto } = route.params;
  const dispatch = useDispatch();

  // faire un useEffect qui verifie si la crypto est deja dans le document crypto de la db alors on met la couleur en blanc
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://${fetchIp.myIp}:3000/users/getUserByToken/${users.token}`
      );
      const data = await res.json();
      const listCryptos = data.cryptosList.map((elmt) => elmt.cryptos);

      if (listCryptos.includes(crypto.name)) {
        setColorIcon(true);
      }
    };
    fetchData();
  }, []);

  const addCrypto = async () => {
    // si colorIcon et false et que crypto.name n'est pas dans users.crypto
    if (!colorIcon && !users.crypto.includes(crypto.name)) {
      const res = await fetch(
        `http://${fetchIp.myIp}:3000/users/addCrypto/${users.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ crypto: crypto.name }),
        }
      );
      const data = await res.json();
      if (data.result) {
        setColorIcon(true);
        dispatch(moreCrypto(crypto.name));
      } else {
        setColorIcon(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ fontSize: 28, color: "#D4D4D4" }}>COIN360</Text>
      </TouchableOpacity>

      <View style={{ height: "70%", width: "100%", alignItems: "center" }}>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity onPress={() => addCrypto()}>
            <View
              style={{
                height: 70,
                width: 70,
                backgroundColor: "#393B3A",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              <Fontisto
                name="favorite"
                size={32}
                color={colorIcon ? "#E97B16" : "#939494"}
              />
            </View>
          </TouchableOpacity>

          <Image
            source={{ uri: crypto.image }}
            style={{ height: 70, width: 70 }}
          />
          <Text style={{ color: "#fff", fontSize: 38 }}>{crypto.name}</Text>
          <Text style={{ color: "#7B7E7C", fontSize: 22 }}>
            ({crypto.symbol.toUpperCase()})
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 90,
            alignItems: "center",
            paddingLeft: 20,
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 32 }}>
            ${crypto.current_price}
          </Text>
          <Text
            style={{
              paddingLeft: 5,
              fontSize: 32,
              color:
                crypto.market_cap_change_percentage_24h > 0
                  ? "#6DB76B"
                  : "#E7595D",
            }}
          >
            ({crypto.market_cap_change_percentage_24h.toFixed(2)} %)
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 10,
            padding: 10,
            height: "50%",
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              height: "50%",
              width: "50%",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              paddingLeft: 10,
            }}
          >
            <Text style={{ color: "#7B7C7C", fontSize: 20 }}>Market Cap</Text>
            <Text style={{ color: "#fff", fontSize: 24 }}>
              ${crypto.market_cap}
            </Text>
          </View>
          <View
            style={{
              height: "50%",
              width: "50%",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              paddingLeft: 10,
            }}
          >
            <Text style={{ color: "#7B7C7C", fontSize: 20 }}>Ath</Text>
            <Text style={{ color: "#fff", fontSize: 24 }}>${crypto.ath}</Text>
          </View>
          <View
            style={{
              height: "50%",
              width: "50%",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              paddingLeft: 10,
            }}
          >
            <Text style={{ color: "#7B7C7C", fontSize: 20 }}>
              Circulating Supply
            </Text>
            <Text style={{ color: "#fff", fontSize: 24 }}>
              {crypto.circulating_supply}
            </Text>
          </View>
          <View
            style={{
              height: "50%",
              width: "50%",
              alignItems: "flex-start",
              justifyContent: "space-evenly",
              paddingLeft: 10,
            }}
          >
            <Text style={{ color: "#7B7C7C", fontSize: 20 }}>Max Supply</Text>
            <Text style={{ color: "#fff", fontSize: 24 }}>
              {crypto.max_supply === null ? "null" : crypto.max_supply}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#161817",
  },
});
