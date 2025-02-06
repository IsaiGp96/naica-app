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
        <Text style={styles.title}>Wiki</Text>
        <View style={styles.separator} />
        <View style={styles.content}>
          <Text style={styles.header}>Personajes</Text>
          <Text style={styles.subheader}>Principal:</Text>
          <Text style={styles.text}>
            El protagonista es un personaje curioso y determinado, cuya meta
            principal es escapar de la mina y descubrir los misterios que la
            rodean. Aunque no cuenta con armas ni habilidades extraordinarias,
            su fortaleza radica en su ingenio y su capacidad de observación.
          </Text>
          <Text style={styles.subheader}>Antagonista:</Text>
          <Text style={styles.text}>
            Una entidad oscura y malévola que habita en las profundidades de la
            mina. Se manifiesta de diferentes formas para acechar y obstaculizar
            al protagonista. Su naturaleza enigmática añade una capa de terror
            psicológico, manteniendo al jugador en constante tensión.
          </Text>
          <Text style={styles.subheader}>Orbe de fuego:</Text>
          <Text style={styles.text}>
            Este personaje actúa como un mentor al inicio del juego, guiando al
            protagonista hacia una zona de interés. Representa una fuente de luz
            y esperanza en un entorno dominado por la oscuridad. Sin embargo, su
            propósito y naturaleza pueden ser más complejos de lo que aparentan.
          </Text>
        </View>
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
  title: {
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
  content: {
    marginTop: 350,
    paddingHorizontal: 20,
    fontFamily: "MyCustomFont",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    fontFamily: "MyCustomFont",
  },
  subheader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    color: "#87CEFA", // Light blue color
    textShadowColor: "#B0E0E6", // Light blue shadow for glow effect
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: "MyCustomFont",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
    lineHeight: 22,
    fontFamily: "MyCustomFont",
  },
});
