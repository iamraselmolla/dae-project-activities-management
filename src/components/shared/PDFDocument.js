// src/MyDocument.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Register a font (optional)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf" }, // Font file URL
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#d3d3d3",
    padding: 5,
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Project Data</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Project Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Short Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Fiscal Year</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Season</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Season</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Season</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Season</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Season</Text>
          </View>
        </View>
        {/* Table Content */}
        {data.map((project, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project?.project}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project[1]}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project[2]}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project[3]}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project[3]}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project[3]}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project[3]}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{project[3]}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
