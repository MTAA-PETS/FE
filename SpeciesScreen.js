import React ,{ useState, useEffect }  from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import PetsImgs from './PetsImgs.js';
import { Ionicons } from '@expo/vector-icons';

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
    console.log("DACO");
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
                        
            </View>
            <View style={styles.box, styles.box_second}>
                <TouchableOpacity onPress={() => {global.species=""; props.navigation.navigate('MainScreen')}}>
                  <Ionicons name="chevron-back-outline" size={40} style={styles.back}/>
                </TouchableOpacity>
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
        flex: 0.05,
        alignItems: 'flex-start',
        padding: 10,
        justifyContent:'center',
      },
      box_second: {
        flex: 0.95,
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
  });

export default SpeciesScreen;