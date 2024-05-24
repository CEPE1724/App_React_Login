import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantStack } from "./RestaurantStack";
import { Icon } from "react-native-elements";
import { screen } from "../utils";

import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import { RankingScreen } from "../screens/RankingScreen";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // ocultamos el titulo o vamos a tener dos
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.ranking.tab}
        component={RankingScreen}
        options={{ title: "Ranking" }}
      />
      <Tab.Screen
        name={screen.restaurant.tab}
        component={RestaurantStack}
        options={{ title: "Bodega" }}
      />
      <Tab.Screen
        name={screen.favorite.tab}
        component={FavoriteScreen}
        options={{ title: "Favorite" }}
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
  }
  return (
    <Icon type="material-community" name={iconName} size={size} color={color} />
  );
}
