
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  dados: Record<string, number>;
}

const CasosPorEstado: React.FC<Props> = ({ dados }) => {
  return (
    <View style={styles.container}>
      {Object.entries(dados).map(([estado, casos]) => (
        <Text key={estado} style={styles.texto}>
          {estado}: {casos} casos
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  texto: { fontSize: 16, marginBottom: 5 },
});

export default CasosPorEstado;
