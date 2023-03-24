import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from "../themes/Metrics";
import { getSearchbreweries } from "../api/getAllBrewey";

const AutoSearchDropDown = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [Data, setData] = useState([]);

  const onChangeText = async (search) => {
    setSearch(search);
    if (search.length > 2) {
      getSearchbreweries(search).then((data) => {
        if (data.length > 0) {
          setData(data);
        }
      });
    }
  };

  const getItemText = (item) => {
    return (
      <Pressable
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        onPress={() => navigation.navigate("BreweryDetail", { selected: item })}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 15 }}
        >
          <Ionicons name={"beer"} color={"rgb(202,138,3)"} size={30} />
          <View style={{ marginLeft: 10, flexShrink: 1 }}>
            <Text style={{ fontWeight: "700" }}>{item.id}</Text>
            <Text style={{ fontSize: 12 }}>{item.name}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholderTextColor={"rgb(202,138,3)"}
          placeholder="Search Brewery"
          onChangeText={onChangeText}
          value={search}
        />
        {search.length > 1 && Data.length > 0 ? (
          <FlatList
            style={styles.dropdown}
            data={Data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => getItemText(item)}
            keyExtractor={(item, index) => item.id.toString() + index}
          />
        ) : null}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  input: {
    marginTop: verticalScale(10),
    height: verticalScale(40),
    width: horizontalScale(300),
    marginLeft: horizontalScale(-25),
    marginHorizontal: moderateScale(12),
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: moderateScale(5),
  },
  dropdown: { width: horizontalScale(300) },
  titleRows: {
    flexDirection: "row",
    width: horizontalScale(360),
    borderWidth: moderateScale(2),
  },
  rows: {
    flexDirection: "row",
    borderBottomWidth: moderateScale(1),
  },
  rowtext: {
    fontSize: moderateScale(10),
  },
  titleCellwidth: {
    width: horizontalScale(60),
    height: verticalScale(70),
    justifyContent: "center",
    borderRightWidth: moderateScale(2),
  },
  cellwidth: { marginLeft: 10, alignItems: "center" },
});

export default AutoSearchDropDown;
