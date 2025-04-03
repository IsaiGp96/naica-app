import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Comentario {
  comentario: string;
  username: string;
  email: string;
}

const Comentarios = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetch("https://backpwa-a0yz.onrender.com/api/getCommentsFromFirebase")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComentarios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener comentarios:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (comentarios.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % comentarios.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * windowWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [comentarios, windowWidth]);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Los comentarios no se pudieron cargar correctamente.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.title}>Comentarios</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {comentarios.map((comentario, index) => (
          <View key={index} style={styles.commentCard}>
            <Text style={styles.commentText}>{comentario.comentario}</Text>
            <Text style={styles.commentAuthor}>- {comentario.username}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 200,
    marginVertical: 20,
    marginBottom: 100
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    color: "#fff",
  },
  commentCard: {
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    backgroundColor: "#121212",
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#333333",
  },
  commentText: {
    fontSize: 16,
    color: "#d0c0c0",
  },
  commentAuthor: {
    position: "absolute",
    bottom: 15,
    right: 15,
    fontSize: 14,
    fontStyle: "italic",
    color: "#d0d0d0",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d0c0c0",
    textAlign: "center",
  },
});

export default Comentarios;
