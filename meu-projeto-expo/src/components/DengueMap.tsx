import React from 'react';
import { StyleSheet } from 'react-native';
import MapViewClustering from 'react-native-map-clustering';
import { DengueCaso } from '../types/DengueData';
import DengueMarker from './DengueMarker';

interface Props {
  dados: DengueCaso[];
}

const DengueMap: React.FC<Props> = ({ dados }) => (
  <MapViewClustering
    style={styles.map}
    region={{
      latitude: -14.235,
      longitude: -51.9253,
      latitudeDelta: 30,
      longitudeDelta: 30,
    }}
  >
    {dados.map((caso, index) => (
      <DengueMarker key={index} caso={caso} />
    ))}
  </MapViewClustering>
);

const styles = StyleSheet.create({
  map: { flex: 1 },
});

export default DengueMap;
