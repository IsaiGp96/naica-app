import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface DynamicTableProps {
  jsonData: any[];
}

export function DynamicTable({ jsonData }: DynamicTableProps) {
  if (!jsonData || jsonData.length === 0) {
    return <Text style={styles.noData}>No hay datos disponibles.</Text>;
  }

  // Extraer las columnas a partir de las claves del primer objeto
  const columns = Object.keys(jsonData[0]);

  return (
    <ScrollView horizontal>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={[styles.tableRow, styles.headerRow]}>
          {columns.map((col, index) => (
            <View key={index} style={[styles.tableCell, styles.headerCell]}>
              <Text style={styles.headerText}>{col}</Text>
            </View>
          ))}
        </View>
        {/* Filas */}
        {jsonData.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.tableRow}>
            {columns.map((col, colIndex) => (
              <View key={colIndex} style={styles.tableCell}>
                <Text style={styles.cellText}>{row[col]}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
  },
  headerRow: {
    backgroundColor: '#f4f4f4',
  },
  tableCell: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCell: {
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    fontWeight: 'bold',
  },
  cellText: {
    textAlign: 'center',
  },
  text:{
    color: "#fff",
  },
  noData: {
    padding: 10,
    textAlign: 'center',
  },
});
