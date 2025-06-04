interface Coordinates {
  latitude: number;
  longitude: number;
}

const coordinatesMap: Record<string, Coordinates> = {
  '3550308': { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
  '3304557': { latitude: -22.9068, longitude: -43.1729 }, // Rio de Janeiro
  '5300108': { latitude: -15.7975, longitude: -47.8919 }, // Brasília
  '2927408': { latitude: -12.9711, longitude: -38.5108 }, // Salvador
  '3106200': { latitude: -19.9167, longitude: -43.9345 }, // Belo Horizonte
  '2304400': { latitude: -3.7172, longitude: -38.5433 },  // Fortaleza
  '1302603': { latitude: -3.1190, longitude: -60.0217 },  // Manaus
  '2611606': { latitude: -8.0476, longitude: -34.8770 },  // Recife
  '4106902': { latitude: -25.4284, longitude: -49.2733 }, // Curitiba
  '5208707': { latitude: -16.6869, longitude: -49.2648 }, // Goiânia
};

export const getCoordinatesByGeocode = (geocode: string): Coordinates => {
  return coordinatesMap[geocode] || coordinatesMap['3304557'];
};
