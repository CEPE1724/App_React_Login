import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
      },
      itemContainer: {
        flex: 1,
        margin: 10, // Espaciado entre elementos
        padding: 20,
        backgroundColor: "#1d2222",
        borderRadius: 20,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: "center", // Centrar el contenido
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
        top: 70,
        right: 10,
      },
      icon: {
        fontSize: 30,
        backgroundColor: "#115e59",
        borderRadius: 50,
        padding: 5,
      },
      itemContainerIcon: {
        marginBottom: 10,
      },
      title: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        textAlign: "center", // Alinear el texto al centro
      },
      flatListContent: {
        flexGrow: 1,
        justifyContent: "center",
      },
  });
  