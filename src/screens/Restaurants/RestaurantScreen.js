import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert, FlatList, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { screen } from "../../utils";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { API_URLS } from "../../config/apiConfig";
import { LinearGradient } from "expo-linear-gradient";

export function RestaurantScreen(props) {
  const { navigation } = props;
  const { idUsuario, username, empresa, idEmpresa } = useContext(AppContext);

  const [empresaName, setEmpresaName] = useState([]);
  const [selectedBodega, setSelectedBodega] = useState("");
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [dataResponse, setDataResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API_URLS.getEmpresaBodegas(idUsuario, idEmpresa)
        );
        const data = response.data;
        setDataResponse(data); // Establecer dataResponse como el objeto data
        if (data.data && data.data.datos && data.data.datos.length > 0) {
          const fetchedEmpresas = data.data.datos.map(
            (empresa) => empresa.Nombre
          );
          setEmpresaName(fetchedEmpresas);
        } else {
          setEmpresaName([]);
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Error",
          "Hubo un problema al cargar los datos de la empresa"
        );
      }
    };

    if (idUsuario && idEmpresa) {
      fetchData();

      const interval = setInterval(fetchData, 120000);

      return () => clearInterval(interval);
    }
  }, [idUsuario, idEmpresa]);

  const handleButtonPress = (nombreEmpresa) => {
    if (dataResponse && dataResponse.data && dataResponse.data.datos) {
      const empresaSeleccionada = dataResponse.data.datos.find(
        (empresa) => empresa.Nombre === nombreEmpresa
      );
      if (empresaSeleccionada) {
        setSelectedEmpresa(nombreEmpresa);
        setSelectedBodega(empresaSeleccionada.Bodega); // Asegúrate de utilizar el nombre correcto del campo de la bodega
        goToRestaurant(empresaSeleccionada.Bodega, nombreEmpresa, empresaSeleccionada.Emoji);
      } else {
        Alert.alert("Error", "No se encontró información para esta empresa");
      }
    } else {
      Alert.alert("Error", "No se encontraron datos disponibles");
    }
  };

  const goToRestaurant = (bodega, empresa, emoji) => {
    navigation.navigate(screen.restaurant.AddRestaurants, {
      selectedEmpresa: empresa,
      selectedBodega: bodega,
      emoji: emoji,
    });
  };

  const renderItem = ({ item }) => {
    const empresa = dataResponse.data.datos.find(
      (empresa) => empresa.Nombre === item
    );
    const iconName = empresa.Emoji || "home-account";

    let iconColor;
    if (iconName === "fire") {
      iconColor = "#c9021f";
    } else if (iconName === "water") {
      iconColor = "#00a8f7";
    } else if (iconName === "google-earth") {
      iconColor = "#7dad1f";
    } else if (iconName === "air") {
      iconColor = "gray";
    } else {
      iconColor = "white";
    }

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContainerIcon}>
          <Icon
            type="material-community"
            name={iconName}
            iconStyle={[styles.icon, { color: iconColor }]}
          />
        </View>
        <Text style={styles.title}>{item}</Text>
        <Button
          onPress={() => handleButtonPress(item, empresa.Emoji)}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          icon={<Icon name="chevron-right" type="material-community" color="white" size={24} />}
        />
      </View>
    );
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#0f172a", "#115e59"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 2 }}
    >
      {empresaName.length > 0 && (
        <FlatList
          data={empresaName}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    padding: 30,
    backgroundColor: "#1d2222",
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 150,
    marginVertical: 10,
  },
  button: {
    width: 38,
    height: 38,
    backgroundColor: "#115e51",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    top: 100,
    left: 200,
  },
  icon: {
    fontSize: 30,
    position: "static",
    backgroundColor: "#115e59",
    borderRadius: 50,
    padding: 5,
  },
  itemContainerIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    top: 50,
    textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)" // Sombreado con desplazamiento horizontal de 2px, desplazamiento vertical de 2px, desenfoque de 4px y color blanco con opacidad 80%
  },
  
});
