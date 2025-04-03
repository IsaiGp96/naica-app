import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const FormularioComentarios = () => {
  const [username, setNombre] = useState("");
  const [email, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarComentario = async () => {
    // Validación básica de campos
    console.log(
      "Usuario: " + username + " Email: " + email + " Comentario: " + comentario
    );
    if (!username.trim() || !email.trim() || !comentario.trim()) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      // Reemplaza la URL por el endpoint real de tu API
      const response = await fetch("http://192.168.1.75:3000/api/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          comentario,
          email,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Tu comentario fue enviado correctamente.");
        // Limpia los campos del formulario
        setNombre("");
        setCorreo("");
        setComentario("");
      } else {
        Alert.alert("Error", "Hubo un problema al enviar tu comentario.");
      }
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setNombre}
        placeholder="Tu nombre"
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setCorreo}
        placeholder="Tu correo"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={comentario}
        onChangeText={setComentario}
        placeholder="Tu comentario"
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={enviarComentario}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar Comentario</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    width: 330,
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FormularioComentarios;
