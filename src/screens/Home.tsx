import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import dadosDengue from '../data/dadosDengue.json';
import CaseFilter from '../components/CaseFilter';
import DengueMap from '../components/DengueMap';
import { DengueCaso } from '../types/DengueData';
import { checarAreaDeRisco } from '../services/notificacoes';

const Home: React.FC = () => {
  const [faixa, setFaixa] = useState('TODOS');
  const [dados, setDados] = useState<DengueCaso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDadosDengue = async () => {
      const data = dadosDengue;
      setDados(data);
      setLoading(false);
    };

    fetchDadosDengue();
    checarAreaDeRisco();
  }, []);

  const filtrar = (caso: DengueCaso): boolean => {
    if (faixa === '0-500') return caso.casos <= 500;
    if (faixa === '501-1000') return caso.casos > 500 && caso.casos <= 1000;
    if (faixa === '1000+') return caso.casos > 1000;
    return true;
  };

  const dadosFiltrados = dados.filter(filtrar);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <CaseFilter faixa={faixa} setFaixa={setFaixa} />
          <DengueMap dados={dadosFiltrados} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Home;
