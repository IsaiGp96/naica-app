import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
  Image,
  //PAPOI
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useFonts from "../../hooks/useFonts"; // Ruta a tu archivo useFonts.ts
import Comentarios from "@/components/Comments";

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/naicaLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.text}>Lore</Text>
          <View style={styles.separator} />
          <Text style={styles.normalText}>
            Naica es conocida, aparte de la minería, como la capital de las
            brujas. En este contexto nuestro protagonista, inspirado por las
            leyendas urbanas, se acerca al pueblo para hacer una investigación
            sobre el tema. En su travesia, al cruzar el monte de noche, se
            encuentra con una bola de fuego navegando cerca de lo que parece una
            entrada a una mina. Curioso, se acerca para tratar de filmarlo
            cuando esta atraviesa la entrada de la mina, iluminando sus paredes
            con un fuego azulado y misterioso, y al atravesar la boca de la
            mina, esta se derrumba iniciando, así nuestro juego...
          </Text>
          <Image
            source={require("../../assets/images/LoreImage.webp")}
            style={styles.loreImage}
          />
          <Comentarios />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%", // Make the background cover the entire screen
    position: "absolute",
    top: 0,
    left: 0,
  },
  image: {
    opacity: 0.5, // 50% opacity for headerDestello
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", // Move content upwards
    alignItems: "center",
    paddingTop: 50, // Adjust top space as needed
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 330,
    height: 330,
    marginTop: -75,
    marginBottom: 10, // Reduced bottom margin to move text upwards
  },
  text: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "MyCustomFont",
    position: "absolute",
    top: 155,
    left: 30,
  },
  separator: {
    width: "85%",
    height: 1,
    backgroundColor: "gray",
    marginTop: 15,
    position: "absolute",
    top: 210,
    left: 30,
  },
  normalText: {
    color: "#fff",
    fontSize: 18, // Increased font size
    fontFamily: "MyCustomFont",
    textAlign: "justify",
    marginHorizontal: 30,
    marginTop: -10, // Adjusted top margin to move text downwards
    lineHeight: 24, // Increased line height for more spacing between lines
  },
  loreImage: {
    width: 330,
    height: 330,
    marginTop: 20, // Adjusted top margin to move image downwards
  },
});
