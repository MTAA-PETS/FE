import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import PetsSrcs from './PetsImgs';
import {Menu, MenuOptions,MenuOption, MenuTrigger} from 'react-native-popup-menu';

var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = height / box_count;
global.spieces = "";

export function LogOut(props){
  global.idcko = 0;
  props.navigation.navigate('Homepage');
}

function MainScreen(props) {
  
    const [items] = React.useState([
      { name: 'Cicavec', source: PetsSrcs['Cicavec']},
      { name: 'Plaz', source: PetsSrcs['Plaz']},
      { name: 'Obojživelník', source: PetsSrcs['Obojživelník']},
      { name: 'Hmyz', source: PetsSrcs['Hmyz']},
      { name: 'Ryba', source: PetsSrcs['Ryba']},
      { name: 'Vták', source: PetsSrcs['Vták']},
    ]);
    global.spieces = "";
    return (
        <View style = {styles.container}>
            <LinearGradient
                colors={['#5EF9D4', 'white']}
                style = { styles.background }>
            <View style={styles.box, styles.box_first}>

              <Menu style={styles.menu}>
                  <MenuTrigger>
                    <Image source={require('./assets/menu.png')} style={{width:40, height:40}}/>
                    <Text>Menu</Text>
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles} optionsContainerStyle={styles.menuOptions}>
                    <MenuOption onSelect={() => props.navigation.navigate('MyProfile')} text='Moje konto' />
                    <MenuOption onSelect={() => alert(`Vyhľadať`)} text='Vyhľadať' />
                    <MenuOption onSelect={() => LogOut(props) } text='Odhlásiť sa' />
                  </MenuOptions>
                </Menu>           
            </View>
            <View style={styles.box, styles.box_second}>

                <Text style={styles.title}>Druhy zvierat</Text>
                <Text style={styles.undertitle}>Vyberte si svojho miláčika!</Text>

                <FlatGrid
                    itemDimension={130}
                    data={items}
                    style={{marginTop: 10,flex: 1}}
                    spacing={20}
                    renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: 'white', borderRadius:20 }]}>
                        <TouchableOpacity onPress={() => { global.species=item.name; props.navigation.navigate('Species');}}>
                            <Image source={item.source} style={{width: 100, height: 100}}/> 
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                />
            </View>
            </LinearGradient>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#5EF9D4',
      },
      box: {
        height: box_height,
      },
      box_first: {
        flex: 0.15,
        alignItems: 'flex-end',
        padding: 10,
        justifyContent:'center',
      },
      box_second: {
        flex: 0.85,
      },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
      },
    title: {
        alignItems: 'flex-start',
        fontSize: 30,
        margin: 0,
        paddingLeft: 20,
        //fontFamily: 'Lucida',
        color: 'black',
      },
      undertitle: {
        alignItems: 'flex-start',
        fontSize: 15,
        margin: 0,
        paddingLeft: 20,
        //fontFamily: 'Lucida',
        color: 'grey',
      },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600',
    },
    menu:{
      justifyContent: 'right',
      alignItems: 'flex-end',
      paddingRight: 30,
      borderRadius: 10
    },
    menuOptions:{
      shadowColor: 'black',
      shadowOpacity: 0.3,
      borderWidth: 1,
      borderRadius: 10,
    }
  });

  const optionsStyles = {
    optionsContainer: {
      padding: 5,
    },
    optionsWrapper: {
    },
    optionWrapper: {
      margin: 5,
      borderBottomColor: 'grey',
      borderBottomWidth: 0.5,
    },
    optionTouchable: {
      activeOpacity: 70,
    },
    optionText: {
      color: 'black',
      fontSize: 20,
    },
  };
  

export default MainScreen;