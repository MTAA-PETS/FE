import React, { Component, useState, useEffect } from 'react';
import { Image, TextInput, Alert, StyleSheet, Text, Button, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {Menu, MenuOptions,MenuOption, MenuTrigger} from 'react-native-popup-menu';
import Moment from 'moment';
import {LogOut} from './MainScreen';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;
var start = width / 10;

class ProfileScreen extends Component {
  constructor(){
    super()
    this.state={nick: ""}
    this.state={faktury: ""}
    this.state={email: ""}
    this.state={narodenie: ""}   
  }

  componentDidMount(){
    this.getUser();
  }
  
  render(){
    return(
      <View style={styles.box, styles.container}>

          <LinearGradient
                colors={['#5EF9D4', 'white']}
                style = { styles.background }>

          <View style={styles.box, styles.box_first}>
            <TouchableOpacity onPress={() => {global.species=""; this.props.navigation.goBack()}}>
                <Ionicons name="chevron-back-outline" size={40} style={styles.back}/>
            </TouchableOpacity>
            <Text style={{alignItems: 'flex-start', fontSize: 30}}>Moje konto</Text>
            <Menu style={styles.menu}>
                <MenuTrigger>
                    <Image source={require('./assets/menu.png')} style={{width:40, height:40}}/>
                    <Text>Menu</Text>
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles} optionsContainerStyle={styles.menuOptions}>
                    <MenuOption disabled={true} text='Moje konto' />
                    <MenuOption onSelect={() => alert(`Vyhľadať`)} text='Vyhľadať' />
                    <MenuOption onSelect={() => LogOut(this.props) } text='Odhlásiť sa' />
                </MenuOptions>
            </Menu>
          </View>

          <View style={styles.box, styles.box_second}>
              <View style={styles.data}>
                <Text style={styles.title}>Osobné údaje</Text>
                <TouchableOpacity onPress={() => alert('Tu sa bude dať vložiť')} style={{backgroundColor: 'grey', width: 50, height: 50, margin: 20}}>
                  <Text>Profilovka</Text>
                </TouchableOpacity>
                <Text style={styles.textik}>{this.state.email}</Text>
                <Text style={styles.textik}>{this.state.nick}</Text>
                <Text style={styles.textik}>{this.state.narodenie}</Text>
              </View>
              <View style={styles.invoices}>
                <Text style={styles.title}>Faktúry</Text>
                <Text style={styles.textik}>{this.state.faktury}</Text>
              </View>
          </View>

          </LinearGradient>
      </View>
    );      
  }
  getUser(){

    const url = 'https://mtaa-pets.herokuapp.com/user/'+global.idcko+'/';
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
          console.log(result);
          this.setState({email: "Email: " + result['email']});
          this.setState({nick: "Nick: " + result['nick']});
          this.setState({narodenie: "Narodenie: " + Moment(result['birth']).format("DD.MM.YYYY")});
          var all="";
          if(result['invoices'] && result['invoices'].length>0){
            for (var i=0; i<result['invoices'].length; i++){
              var invoices = result['invoices'][i];
              all += "Číslo faktúry: " + invoices['id'] + "\n";
              all += "Dátum: " + Moment(invoices['date']).format('DD.MM.YY, HH:mm') + "\n";
              all += "Meno zvieratka: " + invoices['name']+ "\n";
              all += "Suma: " + invoices['amount']+ "€\n\n";
            } 
            this.setState({faktury: all});
          }
          else{
            this.setState({faktury: 'Zatiaľ nemáte žiadne faktúry o adopcii.'})
          }
      })
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
  box_first: {
    flex: 0.15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box_second: {
    flex: 0.95,
    padding: start
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  data:{
    flex:0.5,
    backgroundColor: '#EDEDED',
    marginBottom: 30,
    borderRadius: 10,
  },
  invoices:{
    flex:0.5,
    backgroundColor: '#EDEDED',
    borderRadius: 10
    },
  back:{
    justifyContent: 'left',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  button: {
    width: '90%',
    borderRadius:20,
    padding: 5, 
    height: 45,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
   
  },
  btntext: {
    alignItems: 'center',
    fontSize: 16,
    color: 'white',
    flex:.6,
  },
  icon: {
    color: "white",
    flex:.1 ,
  },
  formContainer: {
    padding : 50
  },
  title: {
    alignItems: 'flex-start',
    fontSize: 26,
    margin: 8,
    //fontFamily: 'Lucida',
    color: 'blue',
  },
  inputStyle: {
    padding: 20,
    marginBottom: 5,
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 10,
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
  },
  textik:{
    fontSize: 20,
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 10
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
    margin: 8,
  },
};

export default ProfileScreen;