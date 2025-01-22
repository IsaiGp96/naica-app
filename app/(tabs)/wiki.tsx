// app/wiki.tsx
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
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
    <ImageBackground
      source={require("../../assets/images/headerDestello.gif")}
      style={styles.background}
      imageStyle={{ ...styles.image, transform: [{ rotate: "180deg" }] }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Wiki</Text>
        <View style={styles.separator} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "70%", // Make the image smaller
    position: "absolute",
    top: 0,
    left: 0,
  },
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
  image: {
    opacity: 0.5, // 50% opacity for headerDestello
  },
  separator: {
    width: "85%",
    height: 1,
    backgroundColor: "gray",
    marginTop: 15,
    position: "absolute",
    top: 155,
    left: 30,
  },
});
