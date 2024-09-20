import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Dimensions,
  ActivityIndicator, // Importa el componente de carga
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { API_URLS } from "../config/apiConfig";

const { width, height } = Dimensions.get('window');

const AlertComponent = ({
  message,
  guardias,
  onYes,
  onNo,
  bodega,
  habitacion,
  idEmpresa,
  nombreHabitacion,
}) => {
  const [guardiasData, setGuardiasData] = useState([]);
  const [selectedGuardia, setSelectedGuardia] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await guardias();
        console.log("Lista de guardias:", response);
        setGuardiasData(response || []);
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Error",
          "Hubo un problema al cargar los datos de la empresa"
        );
      }
    };

    fetchData();
  }, []);

  const crearHabitacion = async (bPromo) => {
    try {
      const body = {
        Bodega: bodega,
        idHabitacion: habitacion,
        idGuardia: selectedGuardia,
        bPromocionHabi: bPromo,
        idempresa: idEmpresa,
      };
      const response = await axios.post(API_URLS.postCrearHabitacion(), body);

      if (response.status === 200) {
        const respuesta = response.data.data.datos[0];
        const { ErrorMessage, NumeroGenerado } = respuesta;

        if (ErrorMessage === "OK") {
          Alert.alert(
            "Éxito",
            `La habitación ha sido creada correctamente. N°:${NumeroGenerado}`
          );
          onYes();
        } else {
          Alert.alert("Error", "Hubo un problema al crear la habitación.");
        }
      } else {
        Alert.alert("Error", "Hubo un problema al crear la habitación.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la habitación.");
    } finally {
      setLoading(false); // Asegúrate de ocultar el indicador de carga al final
    }
  };

  const handleGuardiaChange = (itemValue) => {
    setSelectedGuardia(itemValue);
    setShowButtons(itemValue !== ""); // Mostrar botones si se selecciona un guardia
  };

  const handleYes = async (promocionHabi) => {
    if (!selectedGuardia) {
      Alert.alert(
        "Selección requerida",
        "Por favor, seleccione un guardia antes de continuar."
      );
      return;
    }
    setLoading(true); // Muestra el indicador de carga
    await crearHabitacion(promocionHabi); // Llama a crearHabitacion directamente
  };

  const handleNo = () => {
    onNo(); // Cierra el modal
  };

  return (
    <Modal transparent={true} animationType="slide" onRequestClose={handleNo}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleNo}
      >
        <TouchableOpacity
          style={styles.alertBox}
          activeOpacity={1}
          onPress={() => {}}
        >
          <TouchableOpacity style={styles.closeButton} onPress={handleNo}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.messageText}>Habitación #{nombreHabitacion}</Text>
          <Text style={styles.messageText}>{message}</Text>
          {guardiasData.length > 0 ? (
            <Picker
              selectedValue={selectedGuardia}
              onValueChange={handleGuardiaChange}
              style={styles.picker}
            >
              <Picker.Item label="Selecciona un guardia" value="" />
              {guardiasData.map((guardia) => (
                <Picker.Item
                  key={guardia.idPersonal}
                  label={guardia.Nombre}
                  value={guardia.idPersonal}
                />
              ))}
            </Picker>
          ) : (
            <Text style={styles.itemText}>No hay guardias disponibles</Text>
          )}
          {showButtons && !loading && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleYes(1)}>
                <Text style={styles.buttonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleYes(0)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          )}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#115e59" />
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: width * 0.8, // 80% of screen width
    maxWidth: 400, // Max width for larger screens
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    width: "100%",
    marginBottom: 20,
  },
  itemText: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#115e59",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#115e59",
  },
});

export default AlertComponent;
