import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export function Loader() {
  // Animación para la posición del cuadro
  const squarePosition = new Animated.ValueXY({ x: 0, y: 0 });

  // Configuración de la animación para el cuadro
  useEffect(() => {
    const animation = Animated.timing(squarePosition, {
      toValue: { x: 32, y: 32 }, // Posición final del cuadro
      duration: 600, // Duración de la animación en milisegundos
      useNativeDriver: false, // Necesario para animaciones de posición
      easing: Easing.inOut(Easing.quad), // Efecto de la animación
      isInteraction: false, // No interactúa con los gestos del usuario
    });

    // Iniciar la animación
    Animated.loop(animation).start();

    // Limpiar la animación al desmontar el componente
    return () => animation.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.square, { transform: squarePosition.getTranslateTransform() }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: 28,
    height: 28,
    borderRadius: 0,
    backgroundColor: 'white',
    position: 'absolute',
  },
});
