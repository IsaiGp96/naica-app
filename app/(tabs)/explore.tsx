import { DynamicTable } from "@/components/DynamicTable";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFonts from "../../hooks/useFonts";

export default function TabTwoScreen() {
  const fontsLoaded = useFonts();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Función para obtener los datos de la API sin caché
  const fetchData = useCallback(async () => {
    try {
      console.log("Iniciando petición a la API");
      const response = await fetch(
        `http://10.1.124.217:3000/api/getDataFromFirebase?timestamp=${new Date().getTime()}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const json = await response.json();
      console.log("Datos actualizados:", json);
      // Filtra cada elemento para ignorar el campo "id"
      const filteredData = json.map((item: any) => {
        const { id, ...rest } = item;
        return rest;
      });
      setData(filteredData);
      setError(null);
    } catch (err: any) {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Oculta la splash screen cuando se cargan las fuentes
  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  // Carga inicial de datos
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Función de pull-to-refresh
  const onRefresh = async () => {
    console.log("onRefresh ejecutado");
    setRefreshing(true);
    await fetchData();
  };

  // Detecta el scroll para mostrar el botón "scroll to top"
  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(yOffset > 200);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

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
          ) : (
            <View style={{ flex: 1 }}>
              <ScrollView
                ref={scrollViewRef}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#000" // Color para iOS
                    colors={["#000"]} // Color para Android
                  />
                }
                onScroll={handleScroll}
                scrollEventThrottle={16}
                alwaysBounceVertical={true}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {error && <Text style={styles.errorText}>{error}</Text>}
                <DynamicTable jsonData={data} />
              </ScrollView>
              {showScrollToTop && (
                <TouchableOpacity
                  style={styles.scrollToTop}
                  onPress={scrollToTop}
                >
                  <Ionicons name="arrow-up" size={24} color="#000" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%", // se ajusta para que la tabla se vea en vertical completa
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
    marginTop: 200,
    backgroundColor: "transparent",
  },
  scrollToTop: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
