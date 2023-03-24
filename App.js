import React from "react";
import StackScreens from "./src/navigator/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";

import { registerRootComponent } from "expo";

const querryClient = new QueryClient();

// App entry point----
function BreweryApp() {
  return (
    <QueryClientProvider client={querryClient}>
      <NavigationContainer>
        <StackScreens />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

registerRootComponent(BreweryApp);
export default BreweryApp;
