import React from 'react';
import { Marker } from 'react-native-maps';
import { DengueCaso } from '../types/DengueData';
import { getCoordinatesByGeocode } from '../utils/coordinates';

interface Props {
  caso: DengueCaso;
}

const DengueMarker: React.FC<Props> = ({ caso }) => {
  const coordinates = getCoordinatesByGeocode(caso.geocode);

  return (
    <Marker
      coordinate={coordinates}
      title={caso.city}
      description={`Casos: ${caso.casos}`}
    />
  );
};

export default DengueMarker;
