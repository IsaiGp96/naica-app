import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              Una entidad oscura y malévola que habita en las profundidades de
              la mina. Se manifiesta de diferentes formas para acechar y
              obstaculizar al protagonista. Su naturaleza enigmática añade una
              capa de terror psicológico, manteniendo al jugador en constante
              tensión.
            </Text>
            <Text style={styles.subheader}>Orbe de fuego:</Text>
            <Text style={styles.text}>
              Este personaje actúa como un mentor al inicio del juego, guiando
              al protagonista hacia una zona de interés. Representa una fuente
              de luz y esperanza en un entorno dominado por la oscuridad. Sin
              embargo, su propósito y naturaleza pueden ser más complejos de lo
              que aparentan.
            </Text>
          </View>

          {/* Nueva sección de Niveles */}
          <View style={styles.content}>
            <Text style={styles.header}>Niveles</Text>
            <Text style={styles.subheader}>Nivel 1: Parkour</Text>
            <Text style={styles.text}>
              Descripción: Este nivel introduce al jugador en las mecánicas de
              movimiento y salto. El escenario consiste en plataformas
              suspendidas que deben cruzarse cuidadosamente para llegar a la
              meta.
            </Text>
            <Text style={styles.text}>
              Desafíos: La precisión en los saltos es esencial, ya que una caída
              implica reiniciar el nivel.
            </Text>
            <Text style={styles.subheader}>Nivel 2: Laberinto de cristal</Text>
            <Text style={styles.text}>
              Descripción: Un intrincado laberinto compuesto por gigantescos
              cristales basados en las formaciones de Naica. La luz que reflejan
              los cristales puede distorsionar la percepción del jugador,
              añadiendo dificultad al recorrido.
            </Text>
            <Text style={styles.text}>
              Desafíos: Encontrar la salida requiere orientación precisa y una
              buena memoria espacial. El ente te acecha.
            </Text>
            <Text style={styles.subheader}>Nivel 3: Plataformas falsas</Text>
            <Text style={styles.text}>
              Descripción: Este nivel consiste en una serie de pilares de roca.
              A simple vista, todos parecen iguales, pero algunos son falsos y
              provocarán la caída del jugador si pisa sobre ellos.
            </Text>
            <Text style={styles.text}>
              Desafíos: Identificar las plataformas verdaderas requiere atención
              a pequeños detalles y utilizar la ayuda del Orbe de fuego para
              evitar errores.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%", // Asegura que el fondo cubra toda la pantalla
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 150, // Asegura espacio para el título
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 20,
  },
  title: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "MyCustomFont",
    textAlign: "left",
  },
  image: {
    opacity: 0.5,
  },
  separator: {
    width: "85%",
    height: 1,
    backgroundColor: "gray",
    marginTop: 15,
  },
  content: {
    marginTop: 20, // Reducido para evitar cortes
    paddingHorizontal: 20,
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
    color: "#87CEFA",
    textShadowColor: "#B0E0E6",
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
