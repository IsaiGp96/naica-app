// app/wiki.tsx
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import useFonts from "../../hooks/useFonts";

// Evita que la pantalla de carga se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function WikiScreen() {
  // Usa el hook useFonts para cargar la fuente personalizada
  const fontsLoaded = useFonts();

  useEffect(() => {
    const prepare = () => {
      if (fontsLoaded) {
        // Cuando las fuentes estén cargadas, oculta la pantalla de carga
        SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  // Mientras las fuentes se cargan, mostramos la pantalla de carga
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wiki</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "MyCustomFont",
    position: "absolute",
    top: 115,
    left: 30,
  },
});
