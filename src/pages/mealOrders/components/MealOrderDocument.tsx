import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

type MealOrder = {
  id: number;
  quantity: number;
  name: string;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#f1f1f1",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    textTransform: "capitalize",
    fontWeight: "600",
    color: "#000",
  },
  table: {
    width: "100%",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  cell: {
    flex: 1,
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
  },
  cellText: {
    width: "100%",
    textAlign: "center",
  },
  tableCell: {
    color: "#000",
  },
  tableHeaderCell: {
    backgroundColor: "#4cd964",
    color: "white",
  },
});

const MealOrderDocument = ({ data }: { data: MealOrder[] }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: 25 }}>
          <Text style={styles.title}>Meal Order Summary</Text>
        </View>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow]}>
            <View style={[styles.cell, styles.tableHeaderCell, { flex: 1 }]}>
              <Text style={[styles.cellText]}>#</Text>
            </View>
            <View style={[styles.cell, styles.tableHeaderCell, { flex: 4 }]}>
              <Text style={[styles.cellText]}>Name</Text>
            </View>
            <View style={[styles.cell, styles.tableHeaderCell, { flex: 2 }]}>
              <Text style={[styles.cellText]}>Quantity</Text>
            </View>
          </View>

          {/* Table Rows */}
          {data.map((mealOrder) => (
            <View key={mealOrder.id} style={styles.tableRow}>
              <View style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.cellText}>{mealOrder.id}</Text>
              </View>
              <View style={[styles.cell, { flex: 4 }]}>
                <Text style={styles.cellText}>{mealOrder.name}</Text>
              </View>
              <View style={[styles.cell, { flex: 2 }]}>
                <Text style={styles.cellText}>{mealOrder.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default MealOrderDocument;
