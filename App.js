import React, { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./src/navigation/AppNavigation";
import LoadingScreen from "./src/screens/LoginScreen";
import { InicioScreen } from "./src/screens/Inicio";
import { AppProvider, AppContext } from "./src/context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

function MainApp() {
  const { isLoading, isLoggedIn, setIsLoading, setIsLoggedIn } = useContext(AppContext);

  useEffect(() => {
    // Simular una carga de recursos, puedes reemplazar esto con tu lógica
    setTimeout(() => {
      setIsLoading(false);
    }, 300000); // 3 segundos de carga
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <InicioScreen onLogin={handleLogin} />;
  }

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
