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

export default function CryptoScreen({ navigation }) {
  const [colorIcon, setColorIcon] = useState(false);
  const route = useRoute();
  const { crypto } = route.params;

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
          <TouchableOpacity onPress={() => setColorIcon(!colorIcon)}>
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
                color={colorIcon ? "#fff" : "#939494"}
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
