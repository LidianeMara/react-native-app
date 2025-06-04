import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home'; // Certifique-se de que o caminho está correto
import Welcome from './src/screens/Welcome'; // Certifique-se de que o caminho está correto
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ 
            title: 'Monitor de Arboviroses',
            headerLeft: () => null, // Remove botão voltar
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
