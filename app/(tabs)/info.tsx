import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import useFonts from "../../hooks/useFonts";
import FormularioComentarios from "@/components/Formcoments";

// Evita que la pantalla de carga se oculte automáticamente
SplashScreen.preventAutoHideAsync();

const InfoTab = () => {
  const [showMore, setShowMore] = useState(false);
  const [showMoreSecond, setShowMoreSecond] = useState(false);
  const fontsLoaded = useFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handlePress = () => {
    Vibration.vibrate(55); // Vibra por 100 milisegundos
    setShowMore(!showMore);
  };

  const handlePressSecond = () => {
    Vibration.vibrate(55); // Vibra por 100 milisegundos
    setShowMoreSecond(!showMoreSecond);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/headerDestello.gif")}
      style={styles.background}
      imageStyle={{ ...styles.image, transform: [{ rotate: "180deg" }] }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Information</Text>
        <View style={styles.separator} />

        <View style={styles.content}>
          <Text style={styles.header}>Acerca de</Text>
          <Text style={styles.text}>Un poco de nosotros</Text>

          {showMore && (
            <Text style={styles.extraText}>
              En Lanucz, creamos soluciones tecnológicas innovadoras que
              transforman la interacción digital. Nos especializamos en IoT,
              plataformas web y videojuegos, funsinando tecnología y creatividad
              para ofrecer productos de alto impacto.
            </Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>
              {showMore ? "Mostrar menos" : "Mostrar más"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.header}>Contactanos</Text>
          <Text style={styles.text}>Habla con nostros !</Text>

          {showMoreSecond && (
            <><FormularioComentarios /><Text style={styles.extraText}>Email: soporte@lanucz.com</Text></>
          )}

          <TouchableOpacity style={styles.button} onPress={handlePressSecond}>
            <Text style={styles.buttonText}>
              {showMoreSecond ? "Mostrar menos" : "Mostrar más"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Formulario de comentarios */}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "70%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  container: {
    flexGrow: 1,
    alignItems: "flex-start",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 38,
    fontFamily: "MyCustomFont",
    marginTop: 115,
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
    marginTop: 20,
    paddingHorizontal: 40,
    fontFamily: "MyCustomFont",
  },
  header: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "MyCustomFont",
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: "#dddd",
    marginTop: 5,
    lineHeight: 22,
    fontFamily: "MyCustomFont",
  },
  extraText: {
    fontSize: 16,
    color: "#B0E0E6",
    marginTop: 10,
    textAlign: "auto",
    fontFamily: "Arial",
    fontWeight: "600", // Semi-bold
  },
  button: {
    backgroundColor: "#0056b3", // Color más oscuro
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  formContent: {
    paddingHorizontal: 40,
  }
});

export default InfoTab;
