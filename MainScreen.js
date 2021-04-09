import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatGrid } from 'react-native-super-grid';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 2;
var box_height = height / box_count;
var start = width / 6;
var half = width / 2;

class MainScreen extends React.Component {
    render(){
        return (
                <View style = { styles.container }>
                    <LinearGradient
                        colors={['#5EF9D4', 'white']}
                        style = { styles.background }>
                      <View style={styles.box, styles.box_first}>
                        <Text style={styles.title}>Druhy zvierat</Text>
                        <Text style={styles.undertitle}>Vyberte si svojho miláčika</Text>
                      </View>
                      <View style={styles.box, styles.box_second, styles.firsthalf}>
                        <Image source={require('./assets/logo.png')} alt={"logo"} style={{flex: 1, width: '90%', height: 100, resizeMode: 'contain'}} /> 
                      </View>
                      <View style={styles.box, styles.box_second, styles.sechalf}>
                        <Image source={require('./assets/logo.png')} alt={"logo"} style={{flex: 1, width: '90%', height: 100, resizeMode: 'contain'}} /> 
                      </View>
                    </LinearGradient>
                </View>
        );
    }
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
    firsthalf: {
      flex: 0.5,
      alignItems: 'flex-start',
      backgroundColor:'blue',
      justifyContent:'center',
    },
    sechalf: {
      flex: 0.5,
      alignItems: 'flex-start',
      backgroundColor:'yellow',
      justifyContent:'center',
    },
    box_first: {
      flex: 0.2,
      alignItems: 'flex-start',
      padding: 10,
      justifyContent:'center',
    },
    box_second: {
      flex: 0.8,
      alignItems: 'center',
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
      //fontFamily: 'Lucida',
      color: 'black',
    },
    undertitle: {
      alignItems: 'flex-start',
      fontSize: 15,
      margin: 0,
      //fontFamily: 'Lucida',
      color: 'grey',
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
      borderRadius: 30
    },
    button: {
      width: '50%',
      height: 45,
      margin: 5,
    },
    buttonText: {
      alignItems: 'center',
      fontSize: 16,
      color: 'white',
    }
  });

export default MainScreen;