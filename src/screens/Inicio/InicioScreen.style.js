import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centrar verticalmente
    alignItems: "center", // Centrar horizontalmente
    padding: 20,
    backgroundColor: "#1e1e1e", // Fondo oscuro para contraste
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#ffffff",
    textAlign: "center", // Centrar texto
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444a4c",
    borderRadius: 25,
    backgroundColor: "#2a2a2a",
    textAlign: "center", // Centrar texto en el input
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    padding: 10,
    fontSize: 14,
    color: "#dcdddd",
    textAlign: "left", // Centrar texto en el input
  },
  icon: {
    color: "#ccc",
  },
  showText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center", // Centrar texto
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonInit: {
    width: "100%",
    height: 50,
    backgroundColor: "#115e59",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  picker: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444a4c',
    borderRadius: 25,
    backgroundColor: "#2a2a2a",
  },
  comboBox: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#444a4c',
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: "#2a2a2a",
  },
  buttonLogin: {
    width: "100%",
    height: 50,
    backgroundColor: "#115e59",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  textSelect: {
    fontWeight: 'bold',
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center", // Centrar texto
  },
});
