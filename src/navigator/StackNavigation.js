import React from "react";
import SearchBrewery from "../screens/SearchBrewery";
import BreweryDetail from "../screens/BreweryDetails";
import AutoSearchDropDown from "../screens/AutoSearch";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
//  Stack Screens Function -----
export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchBrewery"
        component={SearchBrewery}
        options={{
          title: "Open Brewery",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "rgb(255,251,236)",
          },
        }}
      />
      <Stack.Screen
        name="BreweryDetail"
        component={BreweryDetail}
        options={{
          title: "Brewery Detail",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "rgb(255,251,236)",
          },
        }}
      />
    </Stack.Navigator>
  );
}
