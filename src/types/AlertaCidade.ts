export interface AlertaCidade {
  city: string;
  uf: string;
  name: string;
  geocode: string;
  level: number; // pode representar o nível ou número de casos
  last: string; // última semana epidemiológica
}
