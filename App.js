import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuProvider } from 'react-native-popup-menu';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import RegScreen from './screens/RegScreen';
import LogScreen from './screens/LogScreen';
import MainScreen from './screens/MainScreen';
import SpeciesScreen from './screens/SpeciesScreen';
import KindScreen from './screens/KindScreen';
import PetScreen from './screens/PetScreen';
import FondScreen from './screens/FondScreen';
import FilterScreen from './screens/FilterScreen';
import FilteredScreen from './screens/FilteredScreen';
import AdoptScreen from './screens/AdoptScreen';
import SummaryScreen from './screens/SummaryScreen';

const Stack = createStackNavigator()

class App extends React.Component{
 
  render(){
    return (
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen 
              name = "Homepage"
              component = {HomeScreen }
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
            <Stack.Screen 
              name = "Fond"
              component = { FondScreen }
            />
            <Stack.Screen 
              name = "Filter"
              component = { FilterScreen }
            />
            <Stack.Screen 
              name = "Filtered"
              component = { FilteredScreen }
            />
            <Stack.Screen 
              name = "Adopt"
              component = { AdoptScreen }
            />
            <Stack.Screen 
              name = "Summary"
              component = { SummaryScreen }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    );
  }
}

export default App;