import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home'; // Certifique-se de que o caminho está correto
import Detail from './src/screens/Detail'; // Certifique-se de que o caminho está correto

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    // O NavigationContainer deve envolver toda a sua estrutura de navegação
    <NavigationContainer>
      {/* O Stack.Navigator define o tipo de navegação (pilha) */}
      <Stack.Navigator initialRouteName="Home">
        {/* Cada Stack.Screen representa uma tela na pilha de navegação */}
        {/* A tela Home */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
          // Você pode adicionar opções de cabeçalho aqui, por exemplo:
          // options={{ headerShown: false }} // Para esconder o cabeçalho na tela Home
        />
        {/* A tela Detail */}
        <Stack.Screen 
          name="Detail" 
          component={Detail} 
          // options={{ title: 'Detalhes do Município' }} // Exemplo de título para a tela Detail
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
