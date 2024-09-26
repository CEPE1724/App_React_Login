import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, Alert, Image } from "react-native";
import { AppContext } from "../../context/AppContext"; 
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements"; 
import logo from "../../../assets/logo.webp";

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
      
      {/* Información de la persona que realizó la llamada */}
      <View style={styles.infoContainer}>
      <Text style={styles.infoText}>Versión 1.0.3.0</Text>
        <Text style={styles.infoText}>Desarrollado por:</Text>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.contactPerson}>E.B.C</Text>
        <Text style={styles.contactPhone}>Teléfono: (02)-255 5212 Ext: 803</Text>
        
        {/* Inserción de la imagen */}

      </View>
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
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    color: "#fff",
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  infoText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
  contactPerson: {
    fontSize: 10,
    color: "#666",
  },
  contactPhone: {
    fontSize: 10,
    color: "#666",
  },
  logo: {
    width: 100, // Ajusta el tamaño del logo
    height: 80, // Ajusta el tamaño del logo
    marginTop: 10, // Espacio entre la información y la imagen
    marginBottom: 20, // Espacio adicional en la parte inferior
    resizeMode: 'contain', // Asegura que el logo se ajuste sin distorsionarse
  },
});

export default AccountScreen;
