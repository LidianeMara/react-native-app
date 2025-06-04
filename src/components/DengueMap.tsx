import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
// Importe MapView e PROVIDER_GOOGLE
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // Alterado de MapViewClustering para MapView
import { DengueCaso } from '../types/DengueData';
import DengueMarker from './DengueMarker';

interface Props {
  dados: DengueCaso[];
}

const BRAZIL_REGION = {
  latitude: -15.7801,
  longitude: -47.9292,
  latitudeDelta: 40,
  longitudeDelta: 40,
};

const DengueMap: React.FC<Props> = ({ dados }) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (dados.length > 0 && mapRef.current) {
      // Reset to Brazil view when showing all municipalities
      mapRef.current.animateToRegion(BRAZIL_REGION);
    }
  }, [dados]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={BRAZIL_REGION}
      provider={PROVIDER_GOOGLE}
      minZoomLevel={4} // Limit minimum zoom to show all Brazil
      maxZoomLevel={15} // Limit maximum zoom for better performance
    >
      {dados.map((caso, index) => {
        console.log('casos', caso);
        return <DengueMarker key={`${caso.geocode}-${index}`} caso={caso} />;
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
});

export default DengueMap;
