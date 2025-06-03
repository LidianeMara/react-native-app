import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
// Importe MapView e PROVIDER_GOOGLE
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // Alterado de MapViewClustering para MapView
import { DengueCaso } from '../types/DengueData';
import DengueMarker from './DengueMarker';

interface Props {
  dados: DengueCaso[];
}

const DengueMap: React.FC<Props> = ({ dados }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    console.log('DengueMap: Dados recebidos para o mapa:', dados.length, 'casos');
    if (dados.length > 0) {
      console.log('DengueMap: Primeiro caso nos dados:', dados[0]);
    }
  }, [dados]);

  return (
    // Usando MapView diretamente para testar
    <MapView
      ref={mapRef} // Adicione a ref de volta para MapView
      style={styles.map}
      region={{
        latitude: -14.235,
        longitude: -51.9253,
        latitudeDelta: 30,
        longitudeDelta: 30,
      }}
      provider={PROVIDER_GOOGLE} // Garante que o provedor seja o Google Maps
    >
      {dados.map((caso, index) => (
        <DengueMarker key={index} caso={caso} />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
});

export default DengueMap;
