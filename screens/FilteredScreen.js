import React ,{ useState, useEffect }  from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PetsImgs from '../PetsImgs.js';
import {Menu, MenuOptions,MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {LogOut} from './MainScreen';

var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = height / box_count;
var url = ""

function getPets(){
    const [data, setData] = useState([])
    url = 'https://mtaa-pets.herokuapp.com/pets/search/?species=' + global.search[0] + '&age__lte=' + global.search[1] + '&price__lte=' + global.search[2];
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
    
    if (data.length>0 && data != undefined){
      return data;
    }
  }


export default function FilteredScreen(props){

    const [items] = React.useState([]);
    var count = 0

    var trash = getPets();
    var res = []
    var cpavok = []
    var reslength = 0
    if (trash!=undefined){
      res = trash
      reslength = res.length;
      console.log(res)
      for (var i = 0; i < reslength; i++) {
        cpavok.push(res[i]['breed']);
        } 
        count = cpavok.length
    }
 
    
    for (var i = 0; i < reslength; i++) {
      var src = PetsImgs[cpavok[i]]
      console.log(src)
      var namik = cpavok[i]
      console.log(namik)
      if(namik.length > 16){
        namik = namik.slice(0,13);
        namik += "..."
      }
      items.push({name: cpavok[i], name2: namik, source: src});
    }

    return (
        <View style = {styles.container}>
            <LinearGradient
                colors={['#5EF9D4', 'white']}
                style = { styles.background }>
            <View style={styles.box, styles.box_first}>
                <TouchableOpacity onPress={() => {global.kind=""; props.navigation.goBack()}} style={styles.back}>
                  <Ionicons name="chevron-back-outline" size={40}/>
                </TouchableOpacity>   
                <Text style={{alignItems: 'flex-start', fontSize: 17, fontWeight: 'bold'}}>Výsledok</Text>
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

                <Text style={styles.undertitle}>Počet výsledkov: {count}</Text>

                <FlatGrid
                    itemDimension={130}
                    data={items}
                    style={{marginTop: 10,flex: 1}}
                    spacing={20}
                    renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: 'white', borderRadius:20 }]}>
                        <TouchableOpacity onPress={() => {global.pet=item.name; props.navigation.navigate('Pet')}}>
                            <Image source={item.source} style={{width: 100, height: 100}}/>
                            <Text style={styles.itemName}>{item.name2}</Text>
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
  