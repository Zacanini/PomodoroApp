import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TimerView} from '../views/Timer';  // Ajuste o caminho se necessário
import {ConfigTimer} from '../views/Config';  // Ajuste o caminho se necessário

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Timer">
        <Stack.Screen name="Timer" component={TimerView} />
        <Stack.Screen name="Settings" component={ConfigTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}