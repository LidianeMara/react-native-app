import React from 'react';
import { Marker } from 'react-native-maps';
import { DengueCaso } from '../types/DengueData';

interface Props {
  caso: DengueCaso;
}

const DengueMarker: React.FC<Props> = ({ caso }) => (
  <Marker
    coordinate={{ latitude: caso.latitude, longitude: caso.longitude }}
    title={caso.municipio}
    description={`${caso.casos} casos`}
  />
);

export default DengueMarker;
