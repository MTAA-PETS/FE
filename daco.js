import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 2;
var box_height = height / box_count;
var start = width / 6;
var half = width / 2;

function Daco() {
    const [items] = React.useState([
      { name: 'Cicavce', source: require('./assets/cicavce.jpg')},
      { name: 'Plazy', source: require('./assets/plazy.jpg')},
      { name: 'Obojživelníky', source: require('./assets/obojzivelniky.jpg')},
      { name: 'Hmyz', source: require('./assets/hmyz.jpg')},
      { name: 'Ryby', source: require('./assets/ryby.jpg')},
      { name: 'Vtáky', source: require('./assets/vtaky.jpg')},
    ]);
  
    return (
        <View style = {styles.container}>
            <LinearGradient
                colors={['#5EF9D4', 'white']}
                style = { styles.background }>
            <View style={styles.box, styles.box_first}>
                        
            </View>
            <View style={styles.box, styles.box_second}>
                <Text style={styles.title}>Druhy zvierat</Text>
                <Text style={styles.undertitle}>Vyberte si svojho miláčika</Text>
                <FlatGrid
                    itemDimension={130}
                    data={items}
                    style={{marginTop: 10,flex: 1}}
                    spacing={20}
                    renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: 'white', borderRadius:20 }]}>
                        <TouchableOpacity onPress={() => console.log("Pressed")}>
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
        flex: 0.72,
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

export default Daco;