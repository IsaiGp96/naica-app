import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

interface DynamicTableProps {
  jsonData: any[];
}

export function DynamicTable({ jsonData }: DynamicTableProps) {
  if (!jsonData || jsonData.length === 0) {
    return <Text style={styles.errorText}>No hay datos disponibles.</Text>;
  }

  // Extraer las columnas a partir de las claves del primer objeto
  const columns = Object.keys(jsonData[0]);
  const { width: screenWidth } = Dimensions.get("window");
  const minCellWidth = 80;
  const calculatedCellWidth = screenWidth / columns.length;
  const cellWidth =
    calculatedCellWidth > minCellWidth ? calculatedCellWidth : minCellWidth;

  return (
    <View style={styles.dataContainer}>
      <ScrollView horizontal>
        <View style={styles.table}>
          {/* Encabezado */}
          <View style={[styles.tableRow, styles.headerRow]}>
            {columns.map((col, index) => (
              <View
                key={index}
                style={[
                  styles.tableCell,
                  styles.headerCell,
                  { width: cellWidth },
                ]}
              >
                <Text style={[styles.headerText, styles.text]}>{col}</Text>
              </View>
            ))}
          </View>
          {/* Filas */}
          {jsonData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {columns.map((col, colIndex) => (
                <View
                  key={colIndex}
                  style={[styles.tableCell, { width: cellWidth }]}
                >
                  <Text style={[styles.cellText, styles.text]}>{row[col]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "70%",
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
    // tamaño ajustado para la tabla
    fontFamily: "MyCustomFont",
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
    flex: 1, // Ocupa todo el espacio disponible verticalmente
    width: "100%",
    marginTop: 0, // Eliminado margen superior para usar el 100% vertical
    backgroundColor: "transparent",
    height: "100%", // Asegura que se vea todo el vertical de la pantalla
  },
  scrollToTop: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff", // fondo blanco
    borderRadius: 25,
    padding: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  // Estilos de la tabla
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  tableRow: {
    flexDirection: "row",
  },
  headerRow: {
    backgroundColor: "transparent",
  },
  tableCell: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCell: {
    backgroundColor: "transparent",
  },
  headerText: {
    fontWeight: "bold",
  },
  cellText: {
    textAlign: "center",
  },
});
