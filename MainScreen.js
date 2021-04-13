import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import PetsSrcs from './PetsImgs';

var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = height / box_count;
global.spieces = "";

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
        flex: 0.1,
        alignItems: 'flex-start',
        padding: 10,
        justifyContent:'center',
      },
      box_second: {
        flex: 0.9,
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
  });

export default MainScreen;