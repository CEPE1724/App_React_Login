import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { AppContext } from "../../context/AppContext"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements"; // Asegúrate de tener react-native-elements instalado

export function AccountScreen() {
  const { setIsLoggedIn, username } = useContext(AppContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => {
            setIsLoggedIn(false);
            console.log("Cerrar sesión");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileIconContainer}>
        <Icon
          name="account-circle"
          type="material-community"
          size={150}
          color="#115e59"
        />
      </View>
      <Text style={styles.username}>{username}</Text>

      <Button title="Cerrar sesión" onPress={handleLogout} style={styles.logoutButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  profileIconContainer: {
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    color: "#fff",
  },
});

export default AccountScreen;
