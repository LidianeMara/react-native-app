# Monitor de Arboviroses
## Apresentação Técnica

---

# Arquitetura do Projeto
- Estrutura de Diretórios
- Componentes React Native
- Integração com APIs
- Gerenciamento de Estado

---

# APIs e Serviços
## Info Dengue API
- Base URL: info.dengue.mat.br/api
- Endpoint: /alertcity
- Parâmetros e Respostas
- Tratamento de Erros

## IBGE API
- Base URL: servicodados.ibge.gov.br/api/v1
- Endpoint: /municipios
- Cache e Fallback
- Otimização de Requisições

---

# Componentes Principais

## DengueMap
- Integração com Google Maps
- Markers para casos
- Clustering de pontos
- Navegação e zoom

## Filtros
- DiseaseFilter: Seleção de arbovirose 
- CaseFilter: Filtro por município
- DateFilter: Seleção de período

---

# Fluxo de Dados
1. Carregamento inicial
2. Cache de municípios
3. Consultas em lote
4. Atualização do mapa

---

# Tratamento de Erros
- Retry automático
- Fallback para dados offline
- Feedback ao usuário
- Logs e monitoramento

---

# Otimizações
- Cache de municípios
- Processamento em lotes
- Lazy loading
- Memória e performance

---

# Estrutura de Tipos
```typescript
interface ConsultaParams {
  geocode: string;
  disease: 'dengue' | 'chikungunya' | 'zika';
  ew_start: number;
  ew_end: number;
  ey_start: number;
  ey_end: number;
}

interface DengueCaso {
  city: string;
  disease: string;
  casos: number;
  week: number;
  year: number;
  geocode: string;
}
```

---

# Serviços e Utilidades
- api.ts: Requisições HTTP
- coordinates.ts: Geolocalização
- notifications.ts: Alertas
- agrupamento.ts: Processamento

---

# Navegação
- Welcome Screen
- Home Screen
- Detail Screen
- Stack Navigator

---

# Próximos Passos
1. Testes automatizados
2. CI/CD
3. Monitoramento
4. Analytics
