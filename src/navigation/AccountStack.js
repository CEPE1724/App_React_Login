import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import { AccountScreen } from "../screens/Account/AccountScreen"; // Asegúrate de que la ruta sea correcta

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.account.accounts}
        component={AccountScreen}
        options={{ title: "Configuraciones" }} // Aquí defines el título que debe mostrarse en la pantalla
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
