import { AppContext } from "../../context/AppContext"; // Asegúrate de importar el contexto
import React, { useState, useContext } from "react";
import { Input, Icon, Button } from "react-native-elements";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./InicioScreen.style";
import axios from "axios";
import { API_URLS } from "../../config/apiConfig";
import { LinearGradient } from "expo-linear-gradient";
export function InicioScreen() {
  const { setIsLoggedIn, setIdUsuario, setUsername, setEmpresa, setIdEmpresa } =
    useContext(AppContext);

  const [localUsername, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Uservalid, setUservalid] = useState(false);
  const [data, setData] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [selectedEmpresaLabel, setSelectedEmpresaLabel] = useState("");
  const [idUsuarioBDD, setIdUsuarioBDD] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (value) => {
    setLocalUsername(value);
    setUservalid(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setUservalid(false);
  };

  const handleLogin = () => {
    if (localUsername && password && selectedEmpresa) {
      setIsLoggedIn(true);
      setUsername(localUsername);
      setIdEmpresa(selectedEmpresa);
      setIdUsuario(idUsuarioBDD);
      setEmpresa(selectedEmpresaLabel);
      Alert.alert(
        "Login Successful",
        `Welcome, , ${localUsername}, ${selectedEmpresa}, ${idUsuarioBDD}, ${selectedEmpresaLabel}`
      );
    } else {
      alert(
        "Por favor, ingresa tu usuario y contraseña y selecciona una empresa"
      );
    }
  };

  const onShowHidePassword = () => setShowPassword(!showPassword);

  const handleChange = (itemValue, itemIndex) => {
    setSelectedEmpresa(itemValue);
    setSelectedEmpresaLabel(data[itemIndex - 1]?.Empresa || "");
  };

  const validating = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        API_URLS.getUser(localUsername, password)
      );
      const data = response.data;
      if (data.data && data.data.datos && data.data.datos.length > 0) {
        const idUsuario = data.data.datos[0].idUsuario;
        if (idUsuario === 0) {
          setUservalid(false);
          console.error("Usuario o contraseña incorrectos");
        } else {
          const responseEmpresas = await axios.get(
            API_URLS.getEmpresas(idUsuario)
          );
          const dataEmpresas = responseEmpresas.data;
          if (dataEmpresas.data.datos.length === 0) {
            setUservalid(false);
            console.error("Usuario o contraseña incorrectos");
          } else {
            const idEmpresa = dataEmpresas.data.datos[0].idEmpresa;
            const responseUserBDD = await axios.get(
              API_URLS.getUserBDD(localUsername, password, idEmpresa)
            );
            const dataUserBDD = responseUserBDD.data;

            if (dataUserBDD.data.datos.length === 0) {
              setUservalid(false);
              console.error("Usuario o contraseña incorrectos");
            } else {
              const idUsuarioBDD = dataUserBDD.data.datos[0].idUsuario;
              setIdUsuarioBDD(idUsuarioBDD);
              setIdUsuario(idUsuarioBDD);
              setData(dataEmpresas.data.datos);
              setUservalid(true);
            }
          }
        }
      } else {
        setUservalid(false);
        console.error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#0f172a', '#115e59']}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 2 }}
      style={styles.container}
    >
      <Text style={styles.title}>
        Ingresa con tu usuario y contraseña del sistema
      </Text>
      <View style={styles.input}>
        <Input
          placeholder="Usuario"
          value={localUsername}
          onChangeText={handleUsernameChange}
          leftIcon={
            <Icon
              type="material-community"
              name="account"
              iconStyle={styles.icon}
            />
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
        />
      </View>
      <View style={styles.input}>
        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!showPassword}
          leftIcon={
            <Icon
              type="material-community"
              name="lock"
              iconStyle={styles.icon}
            />
          }
          rightIcon={
            <TouchableOpacity onPress={onShowHidePassword}>
              <Text style={styles.showText}>Mostrar</Text>
            </TouchableOpacity>
          }
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : Uservalid ? (
        <>
          <View>
            <View style={styles.comboBox}>
              <Picker
                selectedValue={selectedEmpresa}
                onValueChange={handleChange}
              >
                <Picker.Item label="Selecciona una empresa" value="" style={styles.textSelect} />
                {data.map((empresa) => (
                  <Picker.Item
                    key={empresa.idEmpresa}
                    label={empresa.Empresa}
                    value={empresa.idEmpresa}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <Button
            title="Login"
            buttonStyle={styles.buttonLogin}
            containerStyle={styles.buttonContainer}
            onPress={handleLogin}
          />
        </>
      ) : (
        <Button
          title="Iniciar sesión"
          onPress={validating}
          buttonStyle={styles.buttonInit}
          containerStyle={styles.buttonContainer}
        />
      )}
    </LinearGradient>
  );
}
