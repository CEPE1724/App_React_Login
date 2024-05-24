import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { API_URLS } from "../../config/apiConfig";
import { LinearGradient } from "expo-linear-gradient";
import { Loader } from "../../components/Loader";
export function AddRestaurants(props) {
  const [dataResponse, setDataResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idUsuario, idEmpresa } = useContext(AppContext);
  const route = useRoute();
  const { selectedEmpresa, selectedBodega } = route.params;
  const { navigation } = props;
  const goToRestaurant = () => {
    navigation.navigate(screen.restaurant.AddRestaurants);
  };
  console.log("selected-----Empresas", selectedEmpresa);
  console.log("selectedBodega", selectedBodega);
  const fetchData = async () => {
    if (!selectedBodega || !idEmpresa) {
      console.log("No se puede realizar la solicitud. selectedBodega o idEmpresa no están definidos.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(API_URLS.getListaHabitaciones(selectedBodega, idEmpresa));
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

  const GridItem = ({ nombre, PrecioNormal, HIn, HFi, Color }) => (
    <View style={[styles.itemContainer, { backgroundColor: Color }]}>
      <Text style={styles.itemText}>{nombre}</Text>
      <Text style={styles.itemText}>
        {HIn} - {HFi}
      </Text>
      {Color !== "red" && (
        <Text style={styles.itemText}>${PrecioNormal}</Text>
      )}
      <Text style={styles.itemText}>
        {Color === "red" ? "Ocupado" : "Libre"}
      </Text>
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
            />
          )}
          keyExtractor={(item) => item.idHabitacion.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
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
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
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
});
