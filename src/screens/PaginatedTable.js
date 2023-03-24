import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
  Linking,
  RefreshControl,
  Keyboard,
  ScrollView,
} from "react-native";
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from "../themes/Metrics";
import {
  getbyNamebreweries,
  getbyCitybreweries,
  getAllbreweries,
} from "../api/getAllBrewey";
import Feather from "@expo/vector-icons/Feather";

const Table = ({ navigation }) => {
  const [breweryData, setbreweryData] = useState([]);
  const [filter, setfilter] = useState(false);
  const [byName, setbyName] = useState("");
  const [byCity, setbyCity] = useState("");
  const [refreshing, setRefreshing] = useState(true);
  const effectRan = useRef(false);

  const onChangebyName = async (text) => {
    setbyName(text);
  };
  const onChangebyCity = async (text) => {
    setbyCity(text);
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getAllbreweries().then((data) => {
        setbreweryData(data);
        setRefreshing(false);
      });
    }
    return () => {
      effectRan.current = true;
    };
  });
  const onRefresh = () => {
    setbreweryData([]);
    getAllbreweries().then((data) => {
      setbreweryData(data);
      setRefreshing(false);
    });
  };
  const filterByName = async () => {
    getbyNamebreweries(byName).then((data) => {
      setbyName("");
      Keyboard.dismiss();
      setbreweryData(data);
    });
  };

  const filterByCity = async () => {
    getbyCitybreweries(byCity).then((data) => {
      setbyCity("");
      Keyboard.dismiss();
      setbreweryData(data);
    });
  };

  const navigateToDetail = async (item) => {
    navigation.navigate("BreweryDetail", { selected: item });
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.rows}
      onPress={() => navigateToDetail(item)}
    >
      <View style={[styles.cellwidth]}>
        <Text style={styles.rowtext}>{item.name}</Text>
      </View>
      <View style={styles.cellwidth}>
        <Text style={styles.rowtext}>{item.brewery_type}</Text>
      </View>
      <View style={styles.cellwidth}>
        <Text style={styles.rowtext}>{item.city}</Text>
      </View>
      <View style={styles.cellwidth}>
        <Text style={styles.rowtext}>{item.country}</Text>
      </View>
      <View style={styles.cellwidth}>
        <Text
          style={[
            styles.rowtext,
            { color: "blue", textDecorationLine: "underline" },
          ]}
          onPress={() => {
            Linking.openURL(item.website_url);
          }}
        >
          {item.website_url}
        </Text>
      </View>
      <View style={styles.cellwidth}>
        <Text style={styles.rowtext}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setfilter(!filter)}
        style={styles.filtericon}
      >
        <Feather name="filter" size={32} color="rgb(202,138,3)" />
      </TouchableOpacity>
      {filter ? (
        <View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.input}
              placeholder="Filter by Name"
              placeholderTextColor={"rgb(202,138,3)"}
              onChangeText={onChangebyName}
              value={byName}
            />
            <View style={styles.button}>
              <Button
                onPress={() => filterByName()}
                disabled={byName.length === 0 ? true : false}
                title="Go"
                color="rgb(202,138,3)"
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.input}
              placeholder="Filter by City"
              placeholderTextColor={"rgb(202,138,3)"}
              onChangeText={onChangebyCity}
              value={byCity}
            />
            <View style={styles.button}>
              <Button
                onPress={() => filterByCity()}
                disabled={byCity.length === 0 ? true : false}
                title="Go"
                color="rgb(202,138,3)"
              />
            </View>
          </View>
        </View>
      ) : null}

      <View style={styles.titleRows}>
        <View style={styles.titleCellwidth}>
          <Text style={styles.rowtext}>Brewery Name</Text>
        </View>
        <View style={styles.titleCellwidth}>
          <Text style={styles.rowtext}>Type</Text>
        </View>
        <View style={styles.titleCellwidth}>
          <Text style={styles.rowtext}>City</Text>
        </View>
        <View style={styles.titleCellwidth}>
          <Text style={styles.rowtext}>Country</Text>
        </View>
        <View style={styles.titleCellwidth}>
          <Text style={styles.rowtext}>Website</Text>
        </View>
        <View style={[styles.titleCellwidth, { borderRightWidth: 0 }]}>
          <Text style={styles.rowtext}>Phone</Text>
        </View>
      </View>
      <FlatList
        data={breweryData}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptylist}>No Data Found</Text>}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(10),
    marginBottom: 20,
  },
  input: {
    height: verticalScale(40),
    width: horizontalScale(300),
    marginHorizontal: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: moderateScale(5),
    alignSelf: "center",
    marginTop: verticalScale(15),
  },
  titleRows: {
    flexDirection: "row",
    backgroundColor: "rgb(253,230,138)",
    width: horizontalScale(360),
    marginTop: verticalScale(15),
    borderWidth: moderateScale(2),
    // borderColor: "rgb(202,138,3)",
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  rows: {
    flexDirection: "row",
    backgroundColor: "rgb(253,230,138)",
    width: horizontalScale(360),
    borderBottomWidth: moderateScale(1),
    // borderColor: "rgb(202,138,3)",
    borderLeftWidth: moderateScale(2),
    borderRightWidth: moderateScale(2),
  },
  rowtext: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    textAlign: "center",
  },
  filtericon: {
    position: "absolute",
    top: verticalScale(-45),
    right: horizontalScale(10),
  },
  button: {
    marginTop: horizontalScale(20),
    height: verticalScale(40),
    width: horizontalScale(40),
  },
  titleCellwidth: {
    width: horizontalScale(60),
    height: verticalScale(70),
    justifyContent: "center",
    borderRightWidth: moderateScale(2),
    // borderColor: "rgb(202,138,3)",
  },
  emptylist: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginTop: verticalScale(25),
  },
  cellwidth: { width: horizontalScale(59) },
});
export default Table;
