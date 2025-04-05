import React from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gráficos no Expo Go </Text>

      {/* Gráfico de Linhas */}
      <Text style={styles.subtitle}>Gráfico de Linhas</Text>
      <LineChart
        data={{
          labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
          datasets: [
            { data: [10, 20, 30, 25, 15, 35] } // Valores do gráfico
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisSuffix="K"
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Gráfico de Barras */}
      <Text style={styles.subtitle}>Gráfico de Barras</Text>
      <BarChart
        data={{
          labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
          datasets: [
            { data: [12, 19, 8, 15, 22] } // Valores do gráfico
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisSuffix="K"
        yAxisLabel="Y"
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientTo: "#08130D",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  decimalPlaces: 1,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#000" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 20 },
  subtitle: { fontSize: 18, color: "#fff", marginTop: 10, marginBottom: 5, textAlign: "center" },
  chart: { marginVertical: 10, borderRadius: 10 },
});
