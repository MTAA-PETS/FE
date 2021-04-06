import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import logo from './assets/logo.png';

var { height } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;


class HomeScreen extends React.Component {
    render(){
        return (
                <View style = { styles.container }>
                    <LinearGradient
                        colors={['#5EF9D4', 'white']}
                        style = { styles.background }>
                      <View style={styles.box, styles.box_quarterfirst} >
                        <Text style={styles.title}>Pets</Text>
                      </View>
                      <View style={styles.box, styles.box_half}>
                        <Image source={require('./assets/logo.png')} alt={"logo"} width = "box_height" height = "box_height"/> 
                      </View>
                      <View style={styles.box, styles.box_quartersecond}>
                        <TouchableOpacity style = { styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                          <LinearGradient style = { styles.gradient } colors={['#3D66F5', '#76FFEF']}>
                            <Text style = { styles.buttonText }>PRIHLÁSENIE</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style = { styles.button} onPress={() => this.props.navigation.navigate('Registration')}>
                          <LinearGradient style = { styles.gradient } colors={['#3D66F5', '#76FFEF']}>
                            <Text style = { styles.buttonText }>REGISTRÁCIA</Text>
                          </LinearGradient>
                        </TouchableOpacity>
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
    box_quarterfirst: {
      flex: 0.25,
      alignItems: 'center',
      justifyContent:'center',
    },
    box_quartersecond: {
      flex: 0.25,
      alignItems: 'center',
    },
    box_half: {
      flex: 0.5,
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
      alignItems: 'center',
      fontSize: 95,
      fontFamily: 'Lucida',
      color: 'black',
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
      borderRadius: 100
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

  

export default HomeScreen;