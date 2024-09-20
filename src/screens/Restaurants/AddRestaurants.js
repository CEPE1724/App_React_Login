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
  const [bodega, setBodega] = useState(0);
  const [habitacion, setHabitacion] = useState(0);
  const [nombreHabitacion, setNombreHabitacion] = useState(null);

  const fetchData = async () => {
    if (!selectedBodega || !idEmpresa) {
      console.log("No se puede realizar la solicitud. selectedBodega o idEmpresa no están definidos.");
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
      Alert.alert("Error", "Hubo un problema al cargar los datos de la empresa");
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
      return [];
    }
  };

  const handleIconPress = (bodega, idHabitacion, nombreHabitacion) => {
    setBodega(bodega);
    setHabitacion(idHabitacion);
    setAlertVisible(true);
    setNombreHabitacion(nombreHabitacion);
  };

  const closeAlert = () => {
    setAlertVisible(false);
    fetchData();
  };

  const GridItem = ({
    nombre,
    PrecioNormal,
    HIn,
    HFi,
    Color,
    bodega,
    idHabitacion,
  }) => {
    return (
      <View style={[styles.itemContainer, { backgroundColor: Color }]}>
        <Text style={styles.timeText}>{HIn} - {HFi}</Text>
        <View style={styles.contentContainer}>
          {Color === "#228B22" && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleIconPress(bodega, idHabitacion, nombre)}
            >
              <FontAwesome name="cart-plus" size={40} color="white" />
            </TouchableOpacity>
          )}

          <View style={styles.priceAndStatusContainer}>
            <Text style={styles.priceText}>${PrecioNormal}</Text>
            <Text style={styles.statusText}>
              {Color === "#800020" ? "Ocupado" :
               Color === "#228B22" ? "Libre" :
               Color === "#FFA500" ? "Reservado" :
               Color === "#f9b825" ? "Limpieza" : "Desconocido"}
            </Text>
          </View>
          <Text style={styles.nombreText}>{nombre}</Text>
        </View>
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
          idEmpresa={idEmpresa}
          nombreHabitacion={nombreHabitacion}
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
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: "relative",
    minWidth: '45%', // Asegura un ancho mínimo
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  nombreText: {
    fontSize: 30, // Ajustado para mejor legibilidad en tabletas
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    flex: 1, // Permite que crezca
  },
  /*
nombreText: {
  fontSize: 40,
  fontWeight: "bold",
  color: "white",
  marginLeft: 10,
},*/
  priceText: {
    fontSize: 16, // Ajustado para mejor legibilidad en tabletas
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  statusText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
  },
  priceAndStatusContainer: {
    alignItems: "center",
    marginLeft: 10,
    flexDirection: "column", // Apilar precio y estado
    justifyContent: "center",
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTextTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default AddRestaurants;
