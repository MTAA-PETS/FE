import React, { Component } from 'react';
import { StyleSheet, Text , Image , TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

class LogScreen extends React.Component {
    render(){
        return (
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#5EF9D4', 'white']}
                        style={styles.background}>
                    </LinearGradient>

                    <LinearGradient
                        colors={['transparent', 'black']}
                        >
                        <Text style={styles.title}>LOGIN</Text>
                    </LinearGradient>
                    <TouchableOpacity style = { styles.button} onPress={() => this.prihlas()}>
                      <LinearGradient style = { styles.gradient } colors={['#3D66F5', '#76FFEF']}>
                        <Text style = { styles.buttonText }>PRIHLAS MA CHACHA</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                </View>
        );
    }

    //body: JSON.stringify({
     // "nick/email": "skus@1ka.com",
     // "password": "skuska1"
    //})method: 'GET',
      //headers: {
       // Accept: 'application/json',
        //'Content-Type': 'application/json'
      //},


  prihlas(){
    const url = 'https://mtaa-pets.herokuapp.com/user/1/';
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
  };
    fetch(url, options)
      .then(response => {
        console.log(response);
      });
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5EF9D4',
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 600,
    },
    button: {
      padding: 15,
      alignItems: 'center',
      borderRadius: 5,
    },
    title: {
      //backgroundColor: 'transparent',
      alignItems: 'center',
      fontSize: 45,
      fontFamily: 'Lucida',
      color: '#3253FF',
    },
  });

export default LogScreen;