import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RestaurantStack } from "./RestaurantStack";
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import AccountStack from "./AccountStack"; // Asegúrate de que la ruta y la importación sean correctas
import { Text, StyleSheet, View } from "react-native"; // Asegúrate de importar Text y StyleSheet

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ffffff", // Color del ícono activo
        tabBarInactiveTintColor: "#ffffff", // Color del ícono inactivo
        tabBarStyle: {
          backgroundColor: "#1d2222", // Color de fondo de la barra de pestañas
          borderTopWidth: 0, // Elimina el borde superior
          borderTopLeftRadius: 1, // Radio de esquina superior izquierda
          borderTopRightRadius: 1, // Radio de esquina superior derecha
          overflow: "hidden", // Asegura que el contenido no se desborde
        },
        tabBarIcon: ({ color, size, focused }) =>
          renderIcon(route, color, size, focused),
        tabBarLabel: ({ focused }) =>
          focused ? <Text style={styles.label}>{renderLabel(route)}</Text> : null, // Mostrar título solo cuando está seleccionado
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

function renderIcon(route, color, size, focused) {
  let iconName;
  if (route.name === screen.restaurant.tab) {
    iconName = "office-building-cog";
  } else if (route.name === screen.account.tab) {
    iconName = "account";
  }

  return (
    <View
      style={[
        styles.iconContainer,
        focused && styles.focusedIconContainer, // Aplica el estilo si está seleccionado
      ]}
    >
      <Icon type="material-community" name={iconName} size={size} color={focused ? "#ffffff" : color} />
    </View>
  );
}

function renderLabel(route) {
  // Retorna el título basado en el nombre de la ruta
  switch (route.name) {
    case screen.restaurant.tab:
      return "Bodega";
    case screen.account.tab:
      return "Cuenta";
    default:
      return "";
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  focusedIconContainer: {
    backgroundColor: "#1c2463", // Color de fondo cuando está seleccionado
    borderRadius: 10, // Bordes redondeados para el contenedor del ícono
    padding: 5, // Espaciado adicional para un mejor aspecto
  },
  label: {
    color: "#ffffff", // Color del texto del título
    fontSize: 12, // Tamaño de fuente del texto
  },
});
