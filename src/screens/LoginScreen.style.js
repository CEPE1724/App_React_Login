import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "#115e59",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 10,
    width: 395,
    height: 800,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  wave: {
    position: "absolute",
    width: 700,
    height: 700,
    opacity: 0.8,
    left: width / 5 - 200, // Calcula el centro de la pantalla
    top: height / 2 - 670, // Calcula el centro de la pantalla
    backgroundColor: "#2c8d74",
    borderRadius: 300, // 50% de 540px (mitad del ancho)
  },
  wave2: {
    top: 210,
  },
  wave3: {
    top: 210,
  },
  infoTop: {
    textAlign: "center",
    fontSize: 20,
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    color: "#115e59",
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  name: {
    fontSize: 14,
    fontWeight: "100",
    position: "relative",
    top: 10,
    textTransform: "lowercase",
  },
});
