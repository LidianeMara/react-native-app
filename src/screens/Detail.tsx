import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DengueCaso } from '../types/DengueData';
import dadosDengue from '../data/dadosDengue.json';

type RouteParams = {
  municipio: string;
};

const Detail: React.FC = () => {
  const route = useRoute();
  const { municipio } = route.params as RouteParams;
  const [detalhes, setDetalhes] = useState<DengueCaso | null>(null);

  useEffect(() => {
    // Aqui, você pode buscar detalhes específicos para o município
    // Exemplo: fetch from OpenDataSUS with filtro
    const casoDetalhado = dadosDengue.find((caso) => caso.municipio === municipio);
    setDetalhes(casoDetalhado || null);
  }, [municipio]);

  return (
    <View style={styles.container}>
      {detalhes ? (
        <>
          <Text style={styles.title}>{detalhes.municipio}</Text>
          <Text>Casos: {detalhes.casos}</Text>
          <Text>Estado: {detalhes.estado}</Text>
          <Text>Latitude: {detalhes.latitude}</Text>
          <Text>Longitude: {detalhes.longitude}</Text>
          <Button title="Voltar" onPress={() => {/* Navigate back */}} />
        </>
      ) : (
        <Text>Carregando detalhes...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Detail;
