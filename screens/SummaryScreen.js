import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;
var daco, suma;

class SummaryScreen extends React.Component {

    constructor(){
     super()
        this.state={
            image: '',
            undertitle: '',
            text: '',
            doručenie: '',
            celkova_suma: '',
     }
   }

   componentDidMount(){
       this.getInfo();
   }

   

   getInfo(){
       if (global.from == 'adopt'){
        this.setState({image: require('../assets/adopt.jpg')});
        this.setState({undertitle: 'Vaše zvieratko je na ceste!'});
        this.addInvoice();
       }
       else{
        this.setState({image: require('../assets/fond.jpg')});
        this.setState({undertitle: 'Ďakujeme za príspevok!'});
        this.addFond();
       }
   }

   addFond(){
    const url = 'https://mtaa-pets.herokuapp.com/pets/addFond/'+global.id_pet;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        'amount': global.fond
      })
    };
    fetch(url, options)
      .then(result => {
          return result.json();
      }).then(()=> {
        fetch('https://mtaa-pets.herokuapp.com/pets/fond/'+global.pet)
        .then(result => {
          if (!result.ok) throw result;
          return result.json();
        })
        .then(result => {
          //console.log(result['fond']);
          this.setState({text: 'Vďaka tvojmu príspevku má '+ global.pet +' už ' + result['fond'] + '€.'});
        })
      })
   }

   addInvoice(){
    const url = 'https://mtaa-pets.herokuapp.com/invoice/';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        'id_pet': global.id_pet,
        'id_user': global.idcko
      })
    };
    const url2 = 'https://mtaa-pets.herokuapp.com/user/addInvoice/';
    const options2 = {
      method: 'PUT',
      headers: {
        'Content-Type': 'text/plain'
      },
    };
    const url3 = 'https://mtaa-pets.herokuapp.com/pets/delete/';
    const options3 = {
      method: 'DEL',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        'id': global.id_pet
      })
    };
    fetch(url, options)
      .then(result => {
        this.setState({text: 'Adopcia '+ global.price + '€.'});
        this.setState({doručenie: 'Doručenie 10€.'});
        this.setState({celkova_suma: 'Celková cena ' + (parseFloat(global.price)+10) + '€.'});
      }).then(() => {
        fetch(url2, options2)
        .then(response => {
          console.log("USPECH");
        })
      }).then(()=> {
        fetch(url3, options3)
        .then(vysledok => {
          console.log("VYMAZANY CPAVOK");
        })
      })
   }

    render(){
        return (

        <View style = { styles.container }>

            <LinearGradient
                colors={['#5EF9D4', 'white']}
                style = { styles.background }>

                <View style={styles.box, styles.box_half}>
                    <Text style={styles.title}>Potvrdenie objednávky</Text>
                    <Image source={this.state.image} style={{width: 300, height: 300, resizeMode: 'contain'}} /> 
                    <Text style = {styles.undertitle}>{this.state.undertitle}</Text>
                    <Text>{this.state.text}</Text>
                    <Text>{this.state.doručenie}</Text>
                    <Text>{this.state.celkova_suma}</Text>
                </View>

                <View style={styles.box, styles.box_quarter}>
                
                <TouchableOpacity style = { styles.button} onPress={() => this.props.navigation.navigate('MainScreen')}>
                    <LinearGradient style = { styles.gradient } colors={['#3D66F5', '#76FFEF']}>
                    <Text style = { styles.buttonText }>HLAVNÁ STRÁNKA</Text>
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
    box_quarter: {
      flex: 0.25,
      alignItems: 'center',
      justifyContent:'center',
    },
    box_half: {
      flex: 0.8,
      marginTop:100,
      marginRight:10,
      marginLeft:10,
      alignItems: 'center',
      backgroundColor: 'white', 
      borderRadius: 10
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: height,
    },
    title: {
      alignSelf: 'flex-start',
      fontSize: 20,
      fontWeight: 'bold',
      //fontFamily: 'Lucida',
      color: 'black',
    },
    undertitle: {
        fontSize: 20,
        color: 'grey',
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
      borderRadius: 20
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

export default SummaryScreen;