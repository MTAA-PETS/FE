import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import RegScreen from './screens/RegScreen';
import LogScreen from './screens/LogScreen';
import MainScreen from './screens/MainScreen';
import SpeciesScreen from './screens/SpeciesScreen';
import KindScreen from './screens/KindScreen';
import { MenuProvider } from 'react-native-popup-menu';
import PetScreen from './screens/PetScreen';

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
            <Stack.Screen 
              name = "Pet"
              component = { PetScreen }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    );
  }
}

export default App;