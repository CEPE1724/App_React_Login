// src/screens/LoadingScreen.js
import React from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { styles } from "./LoginScreen.style";
export default function LoadingScreen() {
    const rotateValue = new Animated.Value(0);
    const opacityValue = new Animated.Value(0); // Utiliza un valor de opacidad separado para el texto "¡Bienvenido!"
  
    const rotate = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  
    const fadeIn = () => {
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    };
  
    const fadeOut = () => {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    };
  
    React.useEffect(() => {
      fadeIn(); // Hace que el texto aparezca inicialmente
  
      const rotationAnimation = Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        })
      );
  
      rotationAnimation.start(); // Comienza la animación de rotación
  
      // No detengas la animación de opacidad aquí
  
      return () => {
        rotationAnimation.stop();
        // No detengas la animación de opacidad aquí
      };
    }, []);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View
          style={[styles.wave, styles.wave2, { transform: [{ rotate }] }]}
        />

        <Animated.View
          style={[styles.wave, styles.wave3, { transform: [{ rotate }] }]}
        />
        <Animated.View style={[styles.wave, { transform: [{ rotate }] }]} />
        <View>
          <Animated.Text style={[styles.text, { opacity: opacityValue }]}>
            ¡Bienvenido!
          </Animated.Text>
          <Text style={styles.title}> POINT</Text>
        </View>
      </View>
    </View>
  );
}
