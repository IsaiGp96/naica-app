import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

interface Comentario {
  texto: string;
  autor: string;
}

const Comentarios = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reemplaza la URL por el endpoint real de tu API
    fetch("http://10.1.124.217:3000/api/getDataFromFirebase")
      .then((response) => response.json())
      .then((data) => {
        // Asumiendo que 'data' es un arreglo de comentarios
        setComentarios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener comentarios:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {comentarios.map((comentario, index) => (
          <View key={index} style={styles.commentCard}>
            <Text style={styles.commentText}>{comentario.texto}</Text>
            <Text style={styles.commentAuthor}>- {comentario.autor}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 150,
    marginVertical: 20,
  },
  commentCard: {
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  commentAuthor: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "right",
  },
});

export default Comentarios;
