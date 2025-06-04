import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import CaseFilter from '../components/CaseFilter';
import DengueMap from '../components/DengueMap';
import DiseaseFilter from '../components/DiseaseFilter';
import DateFilter from '../components/DateFilter';
import { DengueCaso } from '../types/DengueData';
import { checarAreaDeRisco } from '../services/notificacoes';
import { consultarCasosCidade, consultarMunicipios, Municipio } from '../services/api';

const Home: React.FC = () => {
  const [faixa, setFaixa] = useState('TODOS');
  const [dados, setDados] = useState<DengueCaso[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(true);
  const [disease, setDisease] = useState<'dengue' | 'chikungunya' | 'zika'>('dengue');
  const [startYear, setStartYear] = useState(2023);
  const [endYear, setEndYear] = useState(2023);
  const [startWeek, setStartWeek] = useState(1);
  const [endWeek, setEndWeek] = useState(52);

  const fetchAllMunicipios = async () => {
    try {
      setLoading(true);
      const promises = municipios.map(mun => 
        consultarCasosCidade({
          geocode: mun.geocode,
          disease,
          ew_start: startWeek,
          ew_end: endWeek,
          ey_start: startYear,
          ey_end: endYear,
        })
      );
      const results = await Promise.all(promises);
      const allCases = results.flat();
      setDados(allCases);
    } catch (error) {
      console.error('Erro ao buscar dados dos municípios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const municipiosData = await consultarMunicipios();
        setMunicipios(municipiosData);
        await fetchAllMunicipios();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        Alert.alert('Erro', message);
      }
    };

    fetchData();
    checarAreaDeRisco();
  }, []);

  const fetchDadosMunicipio = async (geocode: string) => {
    try {
      setLoading(true);
      const response = await consultarCasosCidade({
        geocode,
        disease,
        ew_start: startWeek,
        ew_end: endWeek,
        ey_start: startYear,
        ey_end: endYear,
      });
      setDados(response);
    } catch (error) {
      console.error('Erro ao buscar dados do município:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtrar = (caso: DengueCaso): boolean => {
    if (faixa === 'TODOS') return true;
    return caso.geocode === faixa;
  };

  useEffect(() => {
    if (faixa === 'TODOS' && municipios.length > 0) {
      fetchAllMunicipios();
    } else if (faixa !== 'TODOS') {
      fetchDadosMunicipio(faixa);
    }
  }, [faixa, municipios]);

  // Add effect to refetch data when disease changes
  useEffect(() => {
    if (faixa === 'TODOS') {
      fetchAllMunicipios();
    } else {
      fetchDadosMunicipio(faixa);
    }
  }, [disease]);

  // Update the date effect
  useEffect(() => {
    if (faixa === 'TODOS') {
      fetchAllMunicipios();
    } else {
      fetchDadosMunicipio(faixa);
    }
  }, [startYear, endYear, startWeek, endWeek]);

  const dadosFiltrados = dados.filter(filtrar);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.filterContainer}>
            <View style={styles.topFilters}>
              <DiseaseFilter disease={disease} setDisease={setDisease} />
              <CaseFilter 
                faixa={faixa} 
                setFaixa={setFaixa} 
                municipios={municipios}
              />
            </View>
            <DateFilter 
              startYear={startYear}
              endYear={endYear}
              startWeek={startWeek}
              endWeek={endWeek}
              setStartYear={setStartYear}
              setEndYear={setEndYear}
              setStartWeek={setStartWeek}
              setEndWeek={setEndWeek}
            />
          </View>
          <DengueMap dados={dadosFiltrados} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
  },
  topFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default Home;
