import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { API_URLS } from "../config/apiConfig";

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

  console.log("guardiasData", idEmpresa);

  const crearHabitacion = async (selectedGuardia) => {
    try {
      const body = {
        Bodega: bodega,
        idHabitacion: habitacion,
        idGuardia: selectedGuardia,
        bPromocionHabi: 1,
        idempresa: idEmpresa,
      };
      const response = await axios.post(API_URLS.postCrearHabitacion(), body);

      if (response.status === 200) {
        const respuesta = response.data.data.datos[0];
        const { ErrorMessage, ID, NumeroGenerado } = respuesta;

        if (ErrorMessage === "OK") {
          Alert.alert(
            "Éxito",
            `La habitación ha sido creada correctamente. N°:${NumeroGenerado} `
          );
          onYes();
        } else {
          Alert.alert("Error", `Hubo un problema al crear la habitación.`);
        }
      } else {
        Alert.alert("Error", "Hubo un problema al crear la habitación.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al crear la habitación.");
    }
  };

  const handleYes = () => {
    if (!selectedGuardia) {
      Alert.alert(
        "Selección requerida",
        "Por favor, seleccione un guardia antes de continuar."
      );
      return;
    }

    crearHabitacion(selectedGuardia);
  };

  return (
    <Modal transparent={true} animationType="slide" onRequestClose={onNo}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onNo}
      >
        <TouchableOpacity
          style={styles.alertBox}
          activeOpacity={1}
          onPress={() => {}}
        >
          <TouchableOpacity style={styles.closeButton} onPress={onNo}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.messageText}>{nombreHabitacion}</Text>
          <Text style={styles.messageText}>{message}</Text>
          {guardiasData.length > 0 ? (
            <Picker
              selectedValue={selectedGuardia}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedGuardia(itemValue)
              }
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleYes}>
              <Text style={styles.buttonText}>Sí</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleYes}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
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
    width: 300,
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
    fontSize: 14,
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
});

export default AlertComponent;
