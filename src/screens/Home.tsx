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
  const [geocodeList, setGeocodeList] = useState<string[]>([]);

  const fetchDadosMunicipios = async (geocodes: string | string[]) => {
    try {
      setLoading(true);
      const geocodeArray = Array.isArray(geocodes) ? geocodes : [geocodes];
      setGeocodeList(geocodeArray);
      const promises = geocodeArray.map(geocode => 
        consultarCasosCidade({
          geocode,
          disease,
          ew_start: startWeek,
          ew_end: endWeek,
          ey_start: startYear,
          ey_end: endYear,
        })
      );
      const results = await Promise.all(promises);
      const allCases = results.flat();
      setDados(Array.isArray(allCases) ? allCases : allCases ? [allCases] : []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setDados([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const municipiosData = await consultarMunicipios();
        setMunicipios(municipiosData);
        await fetchDadosMunicipios(municipiosData.map(m => m.geocode));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido';
        Alert.alert('Erro', message);
      }
    };

    fetchData();
    checarAreaDeRisco();
  }, []);

  // Combined effect for all filter changes
  useEffect(() => {
    if (!municipios.length) return;
    
    const geocodes = faixa === 'TODOS' 
      ? municipios.map(m => m.geocode)
      : faixa;
    
    fetchDadosMunicipios(geocodes);
  }, [faixa, disease, startYear, endYear, startWeek, endWeek, municipios]);

  const filtrar = (caso: DengueCaso): boolean => {
    if (faixa === 'TODOS') return true;
    return geocodeList.includes(caso.geocode);
  };

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
          <DengueMap 
            dados={dadosFiltrados} 
            geocodes={geocodeList} 
          />
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
