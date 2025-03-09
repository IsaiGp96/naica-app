/* cspell:ignore pantalla carga oculte automáticamente usar cargar fuente personalizada fuentes estén cargadas mientras cargan mostramos Lógica descarga subsección mediante obtener imagen guardarla galería Destello Personajes protagonista curioso determinado cuenta armas habilidades extraordinarias ingenio observación Antagonista entidad oscura malévola habita profundidades manifiesta diferentes formas acechar obstaculizar naturaleza enigmática añade capa psicológico manteniendo jugador constante tensión Orbe fuego actúa inicio juego guiando hacia zona interés Representa entorno dominado oscuridad embargo propósito complejos */
// cspell:ignore Cuando oculta cada Aquí puedes implementar llamada utilizando funcionalidad guardar personaje cuya escapar descubrir misterios rodean Aunque radica capacidad pueden aparentan Sección Niveles Nivel Descripción mecánicas movimiento escenario consiste suspendidas deben cruzarse cuidadosamente llegar Desafíos precisión saltos esencial caída reiniciar laberinto intrincado cristal gigantescos compuesto reflejan basados formaciones Naica distorsionar percepción añadiendo dificultad recorrido Encontrar orientación precisa memoria espacial acecha Plataformas falsas
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  const downloadImage = async (object: string) => {
    // Replace the URL with the actual image URL for the given object
    const uri = `http://192.168.1.75:3000/api/getImageFromBackend/${object}`;
    const fileUri = FileSystem.documentDirectory + `${object}.png`;
    try {
      const { uri: localUri } = await FileSystem.downloadAsync(uri, fileUri);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(localUri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);
        console.log(`Image downloaded and saved: ${localUri}`);
      } else {
        console.error("Permission to access media library was denied");
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleDownload = (section: string) => {
    console.log(`Downloading objects for ${section}`);
    // Aquí puedes implementar la llamada a la API utilizando fetch y la funcionalidad para guardar en galería.
  };

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

          {/* Sección de Niveles */}
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

          {/* Sección de Objetos */}
          <View style={styles.content}>
            <Text style={styles.header}>Objetos</Text>
            {/* Objeto Principal */}
            <Text style={styles.subheader}>Objeto Principal</Text>
            <Text style={styles.text}>
              Descripción: Se refiere a aquellos que son esenciales para
              terminar el juego.
            </Text>

            {/* Botones adicionales para Objeto Principal */}
            <Text style={styles.text}>
              Libro: Un libro que contiene secretos de la cueva.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("book")}
            >
              <Text style={styles.buttonText}>Descargar Modelo Libro</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
              Identificación: Una misteriosa identificación encontrada dentro de
              la cueva
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("identification")}
            >
              <Text style={styles.buttonText}>
                Descargar Modelo Identificación
              </Text>
            </TouchableOpacity>

            <Text style={styles.text}>
              Lámpara: Una lámpara que ilumina el camino en la oscuridad.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("lamp")}
            >
              <Text style={styles.buttonText}>Descargar Modelo Lámpara</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
              Pico: Un objeto que parece ser usado hace tiempo.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("pickaxe")}
            >
              <Text style={styles.buttonText}>Descargar Modelo Pico</Text>
            </TouchableOpacity>

            <Text style={styles.text}>
              Carrete: Un simple carrete de un detonador.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("spool")}
            >
              <Text style={styles.buttonText}>Descargar Modelo Carrete</Text>
            </TouchableOpacity>

            {/* Objeto de Historia */}
            <Text style={styles.subheader}>Objeto de Historia</Text>
            <Text style={styles.text}>
              Descripción: Los objetos que le ayudan al protagonista a descubrir
              la verdad.
            </Text>
            {/* Lista de objetos */}
            {/* Objeto 1: Camara */}
            <Text style={styles.text}>Cámara: Una cámara usada.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("camera")}
            >
              <Text style={styles.buttonText}>Descargar Modelo Cámara</Text>
            </TouchableOpacity>
            {/* Objeto 2: Jaula de pájaros */}
            <Text style={styles.text}>
              Jaula de pájaros: Resguarda la libertad del protagonista.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("bird_cage")}
            >
              <Text style={styles.buttonText}>
                Descargar Modelo Jaula de pájaros
              </Text>
            </TouchableOpacity>
            {/* Objeto 3: Detonador */}
            <Text style={styles.text}>
              Detonador: Un objeto que se ha usado aqui hace tiempo.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("detonator")}
            >
              <Text style={styles.buttonText}>Descargar Modelo Detonador</Text>
            </TouchableOpacity>

            {/* Objeto de Apoyo */}
            <Text style={styles.subheader}>Objeto de Apoyo</Text>
            <Text style={styles.text}>
              Descripción: Ítems que otorgan energía y extienden la duración.
            </Text>
            {/* Pequeña descripción para Batería */}
            <Text style={styles.text}>
              Batería: Proporciona energía esencial para nuestra lampara.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("battery")}
            >
              <Text style={styles.buttonText}>Descargar Modelo Batería</Text>
            </TouchableOpacity>
            {/* Pequeña descripción para Tanque de Oxígeno */}
            <Text style={styles.text}>
              Tanque de Oxígeno: Incrementa la reserva vital para continuar
              explorando.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => downloadImage("oxygen-tank")}
            >
              <Text style={styles.buttonText}>
                Descargar Modelo Tanque de Oxígeno
              </Text>
            </TouchableOpacity>
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
  button: {
    backgroundColor: "#4682B4",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "MyCustomFont",
  },
});
