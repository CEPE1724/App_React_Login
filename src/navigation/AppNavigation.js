import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantStack } from "./RestaurantStack";
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import AccountStack from "./AccountStack"; // Asegúrate de que la ruta y la importación sean correctas

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Ocultamos el título del header para evitar duplicados
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.restaurant.tab}
        component={RestaurantStack}
        options={{ title: "Bodega" }}
      />
      <Tab.Screen
        name={screen.account.tab}
        component={AccountStack}
        options={{ title: "Cuenta" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;
  if (route.name === screen.restaurant.tab) {
    iconName = "office-building-cog";
  } else if (route.name === screen.favorite.tab) {
    iconName = "heart-outline";
  } else if (route.name === screen.ranking.tab) {
    iconName = "star-outline"; // Define el ícono que deseas para la pestaña Ranking
  } else if (route.name === screen.account.tab) {
    iconName = "home";
  }
  return (
    <Icon type="material-community" name={iconName} size={size} color={color} />
  );
}
