import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';

var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = height / box_count;
var url = ""

function changeUrl(){
    if(global.species == 'Cicavce'){
        url = 'https://mtaa-pets.herokuapp.com/pets/?species=cicavec';
    }
    if(global.species == 'Plazy'){
        url = 'https://mtaa-pets.herokuapp.com/pets/?species=plaz';
    }
    if(global.species == 'Obojživelníky'){
        url = 'https://mtaa-pets.herokuapp.com/pets/?species=obojživelník';
    }
    if(global.species == 'Hmyz'){
        url = 'https://mtaa-pets.herokuapp.com/pets/?species=hmyz';
    }
    if(global.species == 'Ryby'){
        url = 'https://mtaa-pets.herokuapp.com/pets/?species=ryba';
    }
    if(global.species == 'Vtáky'){
        url = 'https://mtaa-pets.herokuapp.com/pets/?species=vták';
    }
    const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain'
        },
      };
    fetch(url, options)
        .then(result => {
            if (!result.ok) throw result;
            return result.json();
        })
        .then(result => {
            idcko = result['id'];
            console.log(result);
            this.props.navigation.navigate('MainScreen');
        })
        .catch(error => {
            console.log(error);
        })

  }

function SpeciesScreen(props) {
  
    const [items] = React.useState([
      { name: 'Cicavce', source: require('./assets/cicavce.jpg')},
      { name: 'Plazy', source: require('./assets/plazy.jpg')},
      { name: 'Obojživelníky', source: require('./assets/obojzivelniky.jpg')},
      { name: 'Hmyz', source: require('./assets/hmyz.jpg')},
      { name: 'Ryby', source: require('./assets/ryby.jpg')},
      { name: 'Vtáky', source: require('./assets/vtaky.jpg')},
    ]);
    console.log(global.species);
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
                        <TouchableOpacity onPress={() => {global.spieces = item.name; changeUrl(); props.navigation.navigate('Species')}}>
                            <Image source={item.source} style={{flex: 1, width: '90%', height: 100, resizeMode: 'contain'}} /> 
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
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: 'black',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });

export default SpeciesScreen;