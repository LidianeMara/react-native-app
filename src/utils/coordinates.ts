interface Coordinates {
  latitude: number;
  longitude: number;
}

const coordinatesMap: Record<string, Coordinates> = {
  '3304557': { latitude: -22.9068, longitude: -43.1729 }, // Rio de Janeiro
  '3303500': { latitude: -22.7556, longitude: -43.4603 }, // Nova Iguaçu
  '3301702': { latitude: -22.7852, longitude: -43.3102 }, // Duque de Caxias
  '3305109': { latitude: -22.8268, longitude: -43.0634 }, // São Gonçalo
  '3303302': { latitude: -22.8832, longitude: -43.1035 }, // Niterói
};

export const getCoordinatesByGeocode = (geocode: string): Coordinates => {
  return coordinatesMap[geocode] || { latitude: -22.9068, longitude: -43.1729 }; // Default to Rio
};
