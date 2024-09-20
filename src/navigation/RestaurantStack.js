import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";
import { AddRestaurants } from "../screens/Restaurants/AddRestaurants";
import { AppContext } from "./../context/AppContext";
import React, { useContext } from "react";
import axios from "axios";
export function RestaurantStack() {
  const stack = createNativeStackNavigator();
  const { idUsuario, username, empresa, empresaLabel, idEmpresa } =
    useContext(AppContext);
  return (
    <stack.Navigator>
      <stack.Screen
        name={screen.restaurant.restaurants}
        component={RestaurantScreen}
        options={{ title: empresa }}
      />
      <stack.Screen
        name={screen.restaurant.AddRestaurants}
        component={AddRestaurants}
        options={{ title: "Habitaciones" }}
      />
    </stack.Navigator>
  );
}
