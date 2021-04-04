import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';
//import { LinearGradient } from 'expo';

class EventList extends Component {
    render(){
        return (
            //<Text>Sejusky</Text>

                <View style={styles.container}>
                    <LinearGradient
                        colors={['#5EF9D4', 'white']}
                        style={styles.background}>
                    </LinearGradient>

                    <LinearGradient
                        // Button Linear Gradient
                        colors={['transparent', 'white']}
                        //style={styles.button}
                        >
                        <Text style={styles.title}>Pets</Text>
                    </LinearGradient>
                </View>
        );
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
      fontFamily: 'Lucida Handwriting',
      color: '#3253FF',
    },
  });

export default EventList;