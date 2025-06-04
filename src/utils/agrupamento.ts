import { AlertaCidade } from '../types/AlertaCidade';

export const agruparPorEstado = (dados: AlertaCidade[]) => {
  const casosPorEstado: Record<string, number> = {};

  dados.forEach((item) => {
    if (!item.uf) return;
    if (!casosPorEstado[item.uf]) casosPorEstado[item.uf] = 0;
    casosPorEstado[item.uf] += Number(item.level || 0); // ou outro campo que represente os casos
  });

  return casosPorEstado;
};
