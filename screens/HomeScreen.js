import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  const [cryptos, setCryptos] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  const fetchData = async () => {
    const res = await fetch(`${url}`);
    const data = await res.json();
    data ? setCryptos(data) : console.log(data);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const listingCrypto = cryptos.map((crypt, index) => {
    return (
      <View
        key={index}
        style={{
          padding: 5,
          height: 120,
          width: 120,
          marginTop: 10,
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor:
            crypt.price_change_percentage_24h > 0 ? "#6DB76B" : "#E7595D",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
          {crypt.name.slice(0, 3).toUpperCase()}
        </Text>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          {crypt.current_price}$
        </Text>
        <Image
          source={{ uri: crypt.image }}
          style={{ height: 40, width: 40 }}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "50%",
          width: "90%",
          flexWrap: "wrap",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        {listingCrypto ? listingCrypto : "Aucune données récuperées"}
      </View>
      <View>
        <TouchableOpacity>
          <FontAwesome
            name="refresh"
            size={36}
            color="black"
            onPress={() => fetchData()}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
