import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator, ScrollView } from "react-native";
import useFonts from "../../hooks/useFonts";
import { DynamicTable
  
 } from "@/components/DynamicTable";
export default function TabTwoScreen() {
  const fontsLoaded = useFonts();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Oculta la splash screen cuando se cargan las fuentes
  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  // Función para obtener los datos desde el endpoint
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://10.1.124.175:3000/api/getDataFromFirebase");
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const json = await response.json();
        setData(json);
        console.log(json);
      } catch (err: any) {
        setError("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
        <Text style={styles.text}>Stats</Text>
        <View style={styles.separator} />
        <View style={styles.dataContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : error ? (
            <Text style={{ color: "red" }}>Error: {error}</Text>
          ) : (
            // Se renderiza la tabla dinámica con los datos obtenidos
            <ScrollView>
              <DynamicTable jsonData={data} />
            </ScrollView>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "70%", // Mantiene el tamaño original
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
    opacity: 0.5,
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
  dataContainer: {
    flex: 1,
    width: "90%",
    marginTop: 200, // Ajusta según sea necesario para evitar solapamientos
    backgroundColor: "transparent",
  },
});
