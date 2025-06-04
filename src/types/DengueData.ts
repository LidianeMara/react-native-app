export interface DengueCaso {
  city: string;
  disease: string;
  latitude: number;
  longitude: number;
  geocode: string;
  casos: number;
  week: number;
  year: number;
  incidence_rate: number;
  alert?: boolean;
  level?: string;
}