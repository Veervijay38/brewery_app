import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import AutoSearchDropDown from "./AutoSearch";
import Table from "./PaginatedTable";

export default function SearchBrewery({ navigation }) {
  return (
    <SafeAreaView style={styles.container} >
      <StatusBar style="auto" />
      {/* AutoSearch component  */}
      <AutoSearchDropDown navigation={navigation} />
      {/* Table component  */}
      <Table navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,251,236)",
    alignItems: "center",
    justifyContent: "center",
  },
});
