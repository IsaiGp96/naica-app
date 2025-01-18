import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import useFonts from "../../hooks/useFonts"; // Ruta a tu archivo useFonts.ts

// Evita que la pantalla de carga se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const fontsLoaded = useFonts();

  // Espera a que las fuentes se carguen antes de renderizar
  useEffect(() => {
    if (fontsLoaded) {
      // Oculta la pantalla de carga cuando las fuentes se han cargado
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Mientras se cargan las fuentes, se mantiene la pantalla de carga visible
    return null;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/headerDestello.gif")}
      style={styles.background}
      imageStyle={{ ...styles.image, transform: [{ rotate: "180deg" }] }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/naicaLogo.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>Lore</Text>
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
  image: {
    opacity: 0.5, // 50% opacity for headerDestello
  },
  container: {
    flex: 1,
    justifyContent: "flex-start", // Move content upwards
    alignItems: "center",
    paddingTop: 50, // Adjust top space as needed
  },
  logo: {
    width: 330,
    height: 330,
    marginTop: -75,
    marginBottom: 70,
  },
  text: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "MyCustomFont",
    position: "absolute",
    top: 215,
    left: 30,
  },
  separator: {
    width: "85%",
    height: 1,
    backgroundColor: "gray",
    marginTop: 15,
    position: "absolute",
    top: 260,
    left: 30,
  },
});
