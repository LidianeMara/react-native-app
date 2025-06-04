import axios, { AxiosResponse } from 'axios';

interface ConsultaParams {
  geocode: string;
  disease: 'dengue' | 'chikungunya' | 'zika';
  format?: 'json' | 'csv';
  ew_start: number;
  ew_end: number;
  ey_start: number;
  ey_end: number;
}

const api = axios.create({
  baseURL: 'https://info.dengue.mat.br/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const consultarCasosCidade = async (params: ConsultaParams) => {
  try {
    const response = await api.get('/alertcity', {
      params: {
        ...params,
        format: 'json',
      },
    });
    if (!response.data) {
      throw new Error('Dados não encontrados');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Tempo limite excedido. Verifique sua conexão.');
      }
      if (!error.response) {
        throw new Error('Erro de conexão. Verifique sua internet.');
      }
      throw new Error(`Erro ${error.response.status}: ${error.response.statusText}`);
    }
    throw new Error('Erro ao consultar casos');
  }
};

export interface Municipio {
  geocode: string;
  nome: string;
}

const MUNICIPIOS_RJ = [
  { geocode: '3304557', nome: 'Rio de Janeiro' },
  { geocode: '3303500', nome: 'Nova Iguaçu' },
  { geocode: '3301702', nome: 'Duque de Caxias' },
  { geocode: '3305109', nome: 'São Gonçalo' },
  { geocode: '3303302', nome: 'Niterói' },
];

export const consultarMunicipios = async (): Promise<Municipio[]> => {
  return MUNICIPIOS_RJ;
};
