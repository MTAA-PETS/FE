import React ,{ useState, useEffect }  from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import {Menu, MenuOptions,MenuOption, MenuTrigger} from 'react-native-popup-menu';
import PetsImgs from '../PetsImgs.js';
import { Ionicons } from '@expo/vector-icons';
import {LogOut} from './MainScreen';

var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = height / box_count;
var url = ""

global.kind=""

function getSpecies(){
    const [data, setData] = useState([])
    url = 'https://mtaa-pets.herokuapp.com/pets/?species='+global.species;
    const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain'
        },
      };

    useEffect(() => {
     fetch(url, options)
    .then(response => response.json())
    .then(data => setData(data))
    },[]);

    if (data != '[]' && data != undefined){
      return data;
    }
  }

function SpeciesScreen(props) {

    var trash = getSpecies();
    var res = []
    if (trash!=undefined){
      res = trash
    }
    var reslength = res.length;
    var cpavok = []
    for (var j = 0; j < reslength; j++) {
      cpavok.push(res[j][0]);
    }

    const [items] = React.useState([]);
    for (var i = 0; i < reslength; i++) {
      var src = PetsImgs[cpavok[i]]
      items.push({name: cpavok[i], source: src});
    }

    return (
        <View style = {styles.container}>
            <LinearGradient
                colors={['#5EF9D4', 'white']}
                style = { styles.background }>
            <View style={styles.box, styles.box_first}>
                <TouchableOpacity onPress={() => {global.species=""; props.navigation.goBack()}}>
                  <Ionicons name="chevron-back-outline" size={40} style={styles.back}/>
                </TouchableOpacity>    
                <Menu style={styles.menu}>
                  <MenuTrigger>
                    <Image source={require('../assets/menu.png')} style={{width:40, height:40}}/>
                    <Text>Menu</Text>
                  </MenuTrigger>
                  <MenuOptions customStyles={optionsStyles} optionsContainerStyle={styles.menuOptions}>
                    <MenuOption onSelect={() => props.navigation.navigate('MyProfile')} text='Moje konto' />
                    <MenuOption onSelect={() => props.navigation.navigate('Filter')} text='Vyhľadať' />
                    <MenuOption onSelect={() => LogOut(props) } text='Odhlásiť sa' />
                  </MenuOptions>
                </Menu>    
            </View>
            <View style={styles.box, styles.box_second}>
                
                <Text style={styles.title}>{global.species}</Text>
                <Text style={styles.undertitle}>Vyberte si svojho miláčika!</Text>

                <FlatGrid
                    itemDimension={130}
                    data={items}
                    style={{marginTop: 10,flex: 1}}
                    spacing={20}
                    renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: 'white', borderRadius:20 }]}>
                        <TouchableOpacity onPress={() => {global.kind=item.name; props.navigation.navigate('Kind')}}>
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
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    back:{
      justifyContent: 'left',
      alignItems: 'flex-start',
      paddingBottom: 10,
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
      borderRadius: 30
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
  
 

export default SpeciesScreen;