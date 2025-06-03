import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Importe useNavigation
import { DengueCaso } from '../types/DengueData';
import dadosDengue from '../data/dadosDengue.json'; // Certifique-se de que este caminho está correto e o JSON é válido

type RouteParams = {
  municipio: string;
};

const Detail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Use o hook useNavigation
  const { municipio } = route.params as RouteParams;
  const [detalhes, setDetalhes] = useState<DengueCaso | null>(null);

  useEffect(() => {
    console.log('Detail Screen: Parâmetro município recebido:', municipio);

    // Verifique se dadosDengue foi carregado corretamente
    if (!dadosDengue) {
      console.error('Detail Screen: dadosDengue.json não foi carregado ou está vazio/nulo.');
      setDetalhes(null); // Garante que detalhes é null se dadosDengue não estiver disponível
      return;
    }

    // Tenta encontrar o caso detalhado
    const casoDetalhado = dadosDengue.find((caso) => caso.municipio === municipio);
    
    console.log('Detail Screen: Resultado da busca por município:', casoDetalhado);

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
          {/* Botão para voltar usando navigation.goBack() */}
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </>
      ) : (
        // Mensagem mais informativa caso os detalhes não sejam encontrados
        <Text>Carregando detalhes ou município não encontrado: {municipio}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center',     // Centraliza o conteúdo horizontalmente
    backgroundColor: '#f0f0f0', // Adiciona um fundo claro para melhor visualização
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: { // Estilo para os textos de detalhes
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
});

export default Detail;
