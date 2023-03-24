import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from "../themes/Metrics";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function BreweryDetail({ route, navigation }) {
  const {
    name,
    street,
    city,
    website_url,
    country,
    latitude,
    longitude,
    state,
    postal_code,
  } = route.params.selected;
  const [mapRegion, setmapRegion] = useState({
    latitude: Number(latitude),
    longitude: Number(longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.rowtitle}>{name}</Text>
          <Ionicons name={"beer"} color={"rgb(202,138,3)"} size={30} />
        </View>

        <Text style={styles.rowtext}>
          Brewery Website:{" "}
          {website_url ? (
            <Text
              style={[
                styles.normalfont,
                { color: "blue", textDecorationLine: "underline" },
              ]}
              onPress={() => {
                Linking.openURL(website_url);
              }}
            >
              {website_url ? website_url : "No Website"}
            </Text>
          ) : (
            <Text style={styles.normalfont}>No Website</Text>
          )}
        </Text>
        <Text style={styles.rowtext}>
          Street: <Text style={styles.normalfont}>{street}</Text>
        </Text>
        <Text style={styles.rowtext}>
          City: <Text style={styles.normalfont}>{city}</Text>
        </Text>
        <Text style={styles.rowtext}>
          State/Province: <Text style={styles.normalfont}>{state}</Text>
        </Text>
        <Text style={styles.rowtext}>
          Postal Code: <Text style={styles.normalfont}>{postal_code}</Text>
        </Text>
        <Text style={styles.rowtext}>
          Country: <Text style={styles.normalfont}>{country}</Text>
        </Text>

        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,251,236)",
  },
  card: {
    width: horizontalScale(340),
    backgroundColor: "rgb(253,230,138)",
    borderRadius: moderateScale(10),
    margin: 20,
    padding: 20,
  },
  rowtitle: {
    fontSize: moderateScale(20),
    marginBottom: verticalScale(20),
    fontWeight: "bold",
  },
  rowtext: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
  },
  normalfont: { fontWeight: "normal" },
  map: {
    marginTop: verticalScale(20),
    width: "100%",
    height: verticalScale(400),
  },
});
