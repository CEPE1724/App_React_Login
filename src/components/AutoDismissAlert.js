import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Icon } from "react-native-elements";

const AutoDismissAlert = ({ message, onDismiss, color, icon }) => {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onDismiss();
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.alertContainer, { opacity, backgroundColor: color }]}>
      {icon && (
        <Icon
          type="material"
          name={icon}
          size={24}
          color="white"
          containerStyle={styles.icon}
        />
      )}
      <Text style={styles.alertText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    padding: 15,
    borderRadius: 5,
    margin: 10,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
  },
  alertText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AutoDismissAlert;
