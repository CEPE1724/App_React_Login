import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { API_URLS } from "../../config/apiConfig";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AlertComponent from "../../components/AlertComponent"; 

export function AddRestaurants(props) {
  const [dataResponse, setDataResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idUsuario, idEmpresa } = useContext(AppContext);
  const route = useRoute();
  const { selectedEmpresa, selectedBodega } = route.params;
  const { navigation } = props;
  const [alertVisible, setAlertVisible] = useState(false);
  const [guardias, setGuardias] = useState([]);
  const [bodega, setBodega] = useState(0);
  const [habitacion, setHabitacion] = useState(0);

  const fetchData = async () => {
    if (!selectedBodega || !idEmpresa) {
      console.log(
        "No se puede realizar la solicitud. selectedBodega o idEmpresa no están definidos."
      );
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        API_URLS.getListaHabitaciones(selectedBodega, idEmpresa)
      );
      const data = response.data;

      setDataResponse(data.data.datos || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert(
        "Error",
        "Hubo un problema al cargar los datos de la empresa"
      );
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 120000);

    return () => clearInterval(interval);
  }, [idUsuario, idEmpresa, selectedBodega]);

  const fetchListaGuardias = async () => {
    try {
      const response = await axios.get(API_URLS.getListaGuardias(idEmpresa));
      const guardiasData = response.data.data && response.data.data.datos;
      return guardiasData;
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al cargar los datos de la empresa");
      return []; // Devuelve un array vacío en caso de error
    }
  };
  
  const handleIconPress = (bodega, idHabitacion) => {
    setBodega(bodega);
    setHabitacion(idHabitacion);
    setAlertVisible(true);
  };
  
  const closeAlert = () => {
    setAlertVisible(false);
  };

  console.log("dataResponse", idUsuario);

  const GridItem = ({ nombre, PrecioNormal, HIn, HFi, Color, bodega, idHabitacion }) => (
    <View style={[styles.itemContainer, { backgroundColor: Color }]}>
      <Text style={styles.itemText}>{nombre}</Text>
      <Text style={styles.itemText}>
        {HIn} - {HFi}
      </Text>
      {Color == "#228B22" && (
        <Text style={styles.itemText}>${PrecioNormal}</Text>
      )}
      <Text style={styles.itemText}>
        {Color === "#800020"
          ? "Ocupado"
          : Color === "#228B22"
          ? "Libre"
          : Color === "#FFA500"
          ? "Reservado"
          : Color === "#f9b825"
          ? "Limpieza"
          : "Desconocido"}
      </Text>
      {Color === "#228B22" && (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleIconPress(bodega, idHabitacion)}
        >
          <FontAwesome name="cart-plus" size={16} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <LinearGradient
      style={styles.container}
      colors={["#0f172a", "#115e59"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 2 }}
    >
      <Text style={styles.itemTextTitle}>{selectedEmpresa}</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={dataResponse}
          renderItem={({ item }) => (
            <GridItem
              nombre={item.nombre}
              PrecioNormal={item.PrecioNormal}
              HIn={item.HIn}
              HFi={item.HFi}
              Color={item.Color}
              bodega={item.Bodega}
              idHabitacion={item.idHabitacion}
              
            />
          )}
          keyExtractor={(item) => item.idHabitacion.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
      {alertVisible && (
        <AlertComponent
          message="¿Desea aplicar la promoción de las 12 horas? Incluye Desayuno."
          guardias={fetchListaGuardias}
          onYes={closeAlert}
          onNo={closeAlert}
          bodega={bodega}
          habitacion={habitacion}
          idEmpresa = {idEmpresa}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
    },
    row: {
      flex: 1,
      justifyContent: "space-between",
    },
    itemContainer: {
      flex: 1,
      margin: 10,
      padding: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "white",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      position: "relative",
    },
    itemText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
      fontStyle: "italic",
    },
    itemTextTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      marginBottom: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    iconButton: {
      position: "absolute",
      bottom: 10,
      right: 10,
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 5,
      borderRadius: 15,
    },
  });
