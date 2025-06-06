# Monitor de Arboviroses

Aplicativo React Native para monitoramento de casos de arboviroses no Brasil.

## 📱 Funcionalidades
- Visualização de casos em mapa interativo
- Filtros por doença (Dengue, Chikungunya, Zika)
- Seleção de período (ano/semana epidemiológica)
- Alertas locais baseados em localização
- Dados offline para principais cidades

## 📁 Estrutura do Projeto

```
react-native-app/
├── src/
│   ├── components/
│   │   ├── CaseFilter/
│   │   ├── DateFilter/
│   │   ├── DengueMap/
│   │   ├── DengueMarker/
│   │   └── DiseaseFilter/
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── DengueData.ts
│   └── utils/
│       └── coordinates.ts
└── App.tsx
```

## 🎯 Componentes

### CaseFilter
- **Propósito**: Filtro de seleção de municípios
- **Props**: 
  - `faixa: string` - Geocode do município selecionado
  - `setFaixa: (value: string) => void` - Função para atualizar seleção
  - `municipios: Municipio[]` - Lista de municípios disponíveis
- **Integração**: Usa ActionSheet para seleção de municípios

### DateFilter
- **Propósito**: Filtro de período temporal
- **Props**: 
  - `startYear/endYear: number` - Anos inicial e final
  - `startWeek/endWeek: number` - Semanas inicial e final
  - `setStartYear/setEndYear/setStartWeek/setEndWeek` - Funções de atualização
- **Validações**: Impede que ano final seja menor que inicial

### DengueMap
- **Propósito**: Exibição do mapa com casos de arboviroses
- **Props**:
  - `dados: DengueCaso[]` - Dados dos casos
  - `geocodes: string[]` - Lista de geocodes ativos
- **Integração**: Usa react-native-maps para renderização

### DengueMarker
- **Propósito**: Marcador individual de casos no mapa
- **Props**:
  - `caso: DengueCaso` - Dados do caso específico
- **Integração**: Usa coordinates.ts para posicionamento

### DiseaseFilter
- **Propósito**: Seleção do tipo de arbovirose
- **Props**:
  - `disease: string` - Doença selecionada
  - `setDisease: (value: string) => void` - Função de atualização
- **Opções**: Dengue, Chikungunya, Zika

## 🔌 Integrações

### API Info Dengue (info.dengue.mat.br)
- **Endpoint**: `/alertcity`
- **Parâmetros**:
  - geocode: Identificador do município
  - disease: Tipo de arbovirose
  - ew_start/ew_end: Semana epidemiológica
  - ey_start/ey_end: Ano epidemiológico

## 🏗️ Arquitetura

```
┌────────────────┐
│    App.tsx     │
└───────┬────────┘
        │
┌───────▼────────┐
│  Home Screen   │──────────┐
└───────┬────────┘          │
        │            ┌──────▼─────┐
┌───────▼────────┐   │ Notificações│
│  Components    │   └──────┬─────┘
└───────┬────────┘          │
        │            ┌──────▼─────┐
    ┌───▼───┐       │ Location   │
    │ API   │       └────────────┘
    └───────┘
```

## 🔄 Fluxo de Dados
1. Carregamento inicial com dados offline
2. Busca de municípios (fallback para lista estática)
3. Consulta de casos em lotes (5 por vez)
4. Verificação de área de risco local
5. Notificações locais quando necessário

## 🌐 API

### API Principal (Info Dengue)
- **URL**: https://info.dengue.mat.br/api/alertcity
- **Timeout**: 10 segundos
- **Cache**: Implementado para municípios
- **Retry**: Sistema automático de tentativas


### Dados Offline
Lista estática das 10 principais cidades:
- São Paulo (3550308)
- Rio de Janeiro (3304557)
- Brasília (5300108)
- Salvador (2927408)
- Belo Horizonte (3106200)
- Fortaleza (2304400)
- Manaus (1302603)
- Recife (2611606)
- Curitiba (4106902)
- Goiânia (5208707)

## 📱 Notificações
- Apenas notificações locais (SDK 53+)
- Fallback para alertas do sistema
- Verificação de permissões por plataforma
- Suporte para iOS e Android

## 🛠️ Configuração e Uso
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute: `npx react-native run-android` ou `npx react-native run-ios`

## Observações
- O aplicativo requer conexão com internet
- Os dados são atualizados conforme as semanas epidemiológicas
- Em caso de falha na API do IBGE, o sistema usa uma lista predefinida de municípios