import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './HomeScreen';
import RegScreen from './RegScreen';
import LogScreen from './LogScreen';

const Stack = createStackNavigator()

class App extends React.Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen 
            name = "Homepage"
            component = { HomeScreen }
          />
          <Stack.Screen 
            name = "Registration"
            component = { RegScreen }
          />
          <Stack.Screen 
            name = "Login"
            component = { LogScreen }
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;