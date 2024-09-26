import React, { useContext, useEffect, useState } from "react";
import { View, Alert, StyleSheet, Dimensions } from "react-native";
import { Button, Icon } from "react-native-elements";
import { screen } from "../../utils";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { API_URLS } from "../../config/apiConfig";
import { LinearGradient } from "expo-linear-gradient";

export function RestaurantScreen(props) {
  const { navigation } = props;
  const { idUsuario, idEmpresa } = useContext(AppContext);
  const [empresaData, setEmpresaData] = useState([]);

  // Obtener la altura de la pantalla
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API_URLS.getEmpresaBodegas(idUsuario, idEmpresa)
        );
        const data = response.data;

        if (data.data && data.data.datos && data.data.datos.length > 0) {
          setEmpresaData(data.data.datos);
        } else {
          setEmpresaData([]);
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Hubo un problema al cargar los datos de la empresa");
      }
    };

    if (idUsuario && idEmpresa) {
      fetchData();
      const interval = setInterval(fetchData, 120000);
      return () => clearInterval(interval);
    }
  }, [idUsuario, idEmpresa]);

  const handleButtonPress = (nombreEmpresa) => {
    const empresaSeleccionada = empresaData.find(
      (empresa) => empresa.Nombre === nombreEmpresa
    );
    if (empresaSeleccionada) {
      navigation.navigate(screen.restaurant.AddRestaurants, {
        selectedEmpresa: nombreEmpresa,
        selectedBodega: empresaSeleccionada.Bodega,
        emoji: empresaSeleccionada.Emoji,
      });
    } else {
      Alert.alert("Error", "No se encontró información para esta empresa");
    }
  };

  // Altura del botón restando el 20% de la altura total
  const buttonHeight = (screenHeight * 0.6) / (empresaData.length || 1);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#0f172a", "#115e59"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.buttonContainer}>
        {empresaData.map((empresa, index) => {
          const iconName = empresa.Emoji || "home-account";
          let iconColor = "white"; // Default color

          switch (iconName) {
            case "fire":
              iconColor = "#c9021f";
              break;
            case "water":
              iconColor = "#00a8f7";
              break;
            case "google-earth":
              iconColor = "#7dad1f";
              break;
            case "air":
              iconColor = "gray";
              break;
          }

          return (
            <Button
              key={index}
              onPress={() => handleButtonPress(empresa.Nombre)}
              buttonStyle={[styles.button, { height: buttonHeight }]} // Ajustar altura
              icon={
                <Icon
                  type="material-community"
                  name={iconName}
                  iconStyle={{ color: iconColor, fontSize: 50 }} // Tamaño del ícono
                />
              }
              title={empresa.Nombre}
              titleStyle={styles.title}
              containerStyle={styles.buttonWrapper}
              iconContainerStyle={styles.iconContainer} // Agregar estilo para el contenedor del ícono
            />
          );
        })}
      </View>
    </LinearGradient>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column', // Cambiar a columna para que los botones estén uno debajo del otro
    justifyContent: 'space-around', // Espacio entre botones
    alignItems: 'center', // Centrar el contenido
  },
  button: {
    backgroundColor: "#1d2222",
    borderRadius: 50,
    flexDirection: 'column', // Cambiar a columna para que el ícono esté encima del texto
    alignItems: 'center', // Centra el contenido
    justifyContent: 'center', // Centra el contenido
    marginVertical: 5, // Espacio entre botones
    width: '98%', // Ajustar el ancho del botón
  },
  buttonWrapper: {
    width: '100%', // Ocupa todo el ancho
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5, // Espacio entre ícono y texto
  },
  iconContainer: {
    marginBottom: 5, // Espacio entre ícono y título
  },
});
