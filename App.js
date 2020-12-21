import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import { StatusBar } from 'react-native';

import CustomHeader from './Header.js';
import HomeScreen from './Screens/HomeScreen.js';
import RoteiroAutomaticoScreen from './Screens/RoteiroAutomaticoScreen.js';
import RoteiroManualScreen from './Screens/RoteiroManualScreen.js';
import RotaScren from './Screens/RotaScren.js';



const Stack = createStackNavigator();

const StackOptionDefault = ({ navigation, route })=> ({
  headerTitle: props => <CustomHeader navigation={navigation} route={route} {...props}/>,
  headerStyle: {
    backgroundColor: '#1abc9c',
  },
})

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={StackOptionDefault}
        />
        <Stack.Screen
          name="RoteiroAutomatico"
          component={RoteiroAutomaticoScreen}
          options={StackOptionDefault}
        />
        <Stack.Screen
          name="RoteiroManual"
          component={RoteiroManualScreen}
          options={StackOptionDefault}
        />
        <Stack.Screen
          name="Rota"
          component={RotaScren}
          options={StackOptionDefault}
        />
      </Stack.Navigator>
      <StatusBar style={{backgroundColor: '#161A31'}}/>
    </NavigationContainer>
  );
}
export default App;