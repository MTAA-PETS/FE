import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './HomeScreen';
import RegScreen from './RegScreen';
import LogScreen from './LogScreen';
import MainScreen from './MainScreen';
import SpeciesScreen from './SpeciesScreen';
import KindScreen from './KindScreen';
import { MenuProvider } from 'react-native-popup-menu';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator()

class App extends React.Component{
 
  render(){
    return (
      <MenuProvider>
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
            <Stack.Screen 
              name = "MainScreen"
              component = { MainScreen }
            />
            <Stack.Screen 
              name = "Species"
              component = { SpeciesScreen }
            />
            <Stack.Screen 
              name = "Kind"
              component = { KindScreen }
            />
            <Stack.Screen 
              name = "MyProfile"
              component = { ProfileScreen }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    );
  }
}

export default App;