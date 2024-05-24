import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 40,
    alignItems: "center",
    padding: 50,

  },
  title: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 100,
    color: "#ccc",

  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#444a4c",
    borderRadius: 50,
  },
  inputContainer: {
    borderBottomWidth: 0, // Eliminar la línea interior
  },
  inputText: {
    padding: 10, // Ajustar el padding si es necesario
    fontSize: 12,
    color: "#dcdddd",
    
  },
  icon: {
    color: "#ccc",
  },
  showText: {
    color: "#ccc", // Modified color to blue
    fontSize: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonInit: {
    width: "100%",
    height: 50,
    backgroundColor: "#115e59",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  comboBox: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#444a4c',
    borderRadius: 50,
    justifyContent: 'center',
    
  
    
  },
  buttonLogin: {
    width: "100%",
    height: 50,
    backgroundColor: "#115e59",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  textSelect: {
    
    fontWeight: 'bold',
    fontSize: 12,
  },
});
