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

    // Add geocode to each case in the response
    const data = Array.isArray(response.data) 
      ? response.data.map(caso => ({ ...caso, geocode: params.geocode }))
      : { ...response.data, geocode: params.geocode };

    return data;
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

const MUNICIPIOS = [
 { geocode: '3550308', nome: 'São Paulo' },
{ geocode: '3304557', nome: 'Rio de Janeiro' },
{ geocode: '5300108', nome: 'Brasília' },
{ geocode: '2927408', nome: 'Salvador' },
{ geocode: '3106200', nome: 'Belo Horizonte' },
{ geocode: '2304400', nome: 'Fortaleza' },
{ geocode: '1302603', nome: 'Manaus' },
{ geocode: '2611606', nome: 'Recife' },
{ geocode: '4106902', nome: 'Curitiba' },
{ geocode: '5208707', nome: 'Goiânia' },
];

export const consultarMunicipios = async (): Promise<Municipio[]> => {
  return MUNICIPIOS;
};
