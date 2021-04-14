import React, { Component, useState } from 'react';
import { TextInput, Alert, StyleSheet, Text, Button, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ErrorMessage, Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;
var start = width / 10;

class RegScreen extends Component {
  constructor(){
    super()
    this.state={errormessage1: ""}
    this.state={errormessage2: ""}
    this.state={errormessage3: ""}
    this.state={errormessage4: ""}
    this.state={errormessage5: ""}
    this.state={errormessage6: ""}
    this.state={errormessage7: ""}
    this.state={errormessage8: ""}
    this.state={errormessage9: ""}
  }
  errorbademail(){
    this.setState({errormessage1: "Nesprávny tvar emailu"})
  }
  erroremailduplicate(){
    this.setState({errormessage2: "Tento email alebo nick už existuje"})
  }
  erroremailblank(){
    this.setState({errormessage3: "Toto pole je povinné"})
  }
  errornickblank(){
    this.setState({errormessage4: "Toto pole je povinné"})
  }
  errorpassword(){
    this.setState({errormessage5: "Heslá sa nezhodujú"})
  }
  errorpassword1blank(){
    this.setState({errormessage6: "Toto pole je povinné"})
  }
  errorpassword2blank(){
    this.setState({errormessage7: "Toto pole je povinné"})
  }
  errordate(){
    this.setState({errormessage8: "Nesprávny tvar. Zadajte v tvare RRRR-MM-DD"})
  }
  errorunder18(){
    this.setState({errormessage9: "Je potrebné mať aspoň 18 rokov"})
  }
  
  render(){
    return(
      <Formik
        initialValues={{ emai: '', nick:'', password: '' , password2: '', birth: ''}}
        onSubmit={values => this.login(values)}
      >
      {({ values, handleChange, setFieldTouched, handleSubmit }) => (
        <View style={styles.formContainer}>
          <LinearGradient
                      colors={['#5EF9D4', 'white']}
                      style = { styles.background }>
            <View style={styles.box, styles.box_quarterfirst} >
              <Text style={styles.title}>Registrácia</Text>
              <Text style={styles.undertitle}>Vytvorte si nový účet!</Text>
            </View>
            <View style={styles.box, styles.box_half}>
              <Input
                leftIcon={{ type: 'ionicon', name: 'person-outline', color: 'grey'}}
                value={values.emailnick}
                style={styles.inputStyle}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeholder="lill@ly.com"
                label="E-mail"
              />   
              <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end'}}> {this.state.errormessage1} {this.state.errormessage2} {this.state.errormessage3}</Text>
              <Input
                leftIcon={{ type: 'ionicon', name: 'person-circle-outline', color: 'grey'}}
                value={values.nick}
                style={styles.inputStyle}
                onChangeText={handleChange('nick')}
                onBlur={() => setFieldTouched('nick')}
                placeholder="lilly9"
                label="Nick"
              />   
              <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errormessage2} {this.state.errormessage4} </Text>
              <Input
                value={values.password}
                style={styles.inputStyle}
                onChangeText={handleChange('password')}
                placeholder="******"
                label="Heslo"
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
                leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color:'grey'}}
              />
              <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errormessage5} {this.state.errormessage6}</Text>
              <Input
                value={values.password2}
                style={styles.inputStyle}
                onChangeText={handleChange('password2')}
                placeholder="******"
                onBlur={() => setFieldTouched('password2')}
                secureTextEntry={true}
                leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color:'grey'}}
                RightIcon={{ type: 'ionicon', name: 'lock-closed-outline', color:'grey'}}
                label="Overenie hesla"
              />
              <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errormessage7}</Text>
              <Input
                leftIcon={{ type: 'ionicon', name: 'calendar-outline', color: 'grey'}}
                value={values.birth}
                style={styles.inputStyle}
                onChangeText={handleChange('birth')}
                onBlur={() => setFieldTouched('birth')}
                placeholder="1998-12-25"
                label="Dátum narodenia"
              />   
              <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errormessage8} {this.state.errormessage9}</Text>
            </View>
            <View style={styles.box, styles.box_quartersecond}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <LinearGradient colors={['#3D66F5', '#76FFEF']} style={styles.button}>
                        <Text style={styles.btntext}>REGISTRÁCIA</Text>
                        <Ionicons style = {styles.icon} name="log-in-outline" size={20} color="white" resizeMode="contain" />
                    </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.undertitle}>Už máte účet? <Text style={{fontWeight:'bold'}} onPress={() => this.props.navigation.navigate('Login')}>Prihlásenie</Text></Text>
            </View>
          </LinearGradient>
        </View>
      )}
    </Formik> 
    );      
  }
  login(values){
    //const [state, dispatch] = useReducer(reducer, initialArg, init);
    const url = 'https://mtaa-pets.herokuapp.com/user/signup/';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        'nick': values['nick'],
        'email': values['email'],
        'birth': values['birth'],
        'password': values['password'],
      })
    };
    fetch(url, options)
        .then(result => {
            if (!result.ok) throw result;
            return result.json();
        })
        .then(result => {
            global.idcko = result['id'];
            console.log(result);
            this.props.navigation.navigate('MainScreen');
        })
        .catch(error => {
          //console.log(error);
          error.json().then( errorMes => {
            console.log(errorMes);
            this.setState({errormessage1: ""});
            this.setState({errormessage2: ""});
            this.setState({errormessage3: ""});
            this.setState({errormessage4: ""});
            this.setState({errormessage5: ""});
            this.setState({errormessage6: ""});
            this.setState({errormessage7: ""});
            this.setState({errormessage8: ""});
            this.setState({errormessage9: ""});
            if (values['password'] != values['password2']){
              this.errorpassword();
            }
            if(errorMes["errors"]["birth"] != undefined){
              if("Date has wrong format. Use one of these formats instead: YYYY-MM-DD." == errorMes["errors"]["birth"]){
                this.errordate();
              }}
            if("Not adult" == errorMes["errors"]){
              this.errorunder18();
            }
            if("Duplicate values" == errorMes["errors"]){
              this.erroremailduplicate();
            }
            if("This field is required." == errorMes["errors"]["email"] || "This field may not be blank." == errorMes["errors"]["email"]){
              this.erroremailblank();
            }
            if("Enter a valid email address." == errorMes["errors"]["email"]){
              this.errorbademail();
            }
            if(errorMes["errors"]["nick"] != undefined){
              if("This field may not be blank." == errorMes["errors"]["nick"]){
                this.errornickblank();
              }else{
                this.erroremailduplicate();
              }
            }
            if(errorMes["errors"]["password"] != undefined){
              if("This field may not be blank." == errorMes["errors"]["password"]){
                this.errorpassword1blank();
              }
            if("" == values["password2"]){
              this.errorpassword2blank();
            }
              this.error
            }
          })
        })
    }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  box: {
    height: box_height,
  },
  box_quarterfirst: {
    flex: 0.1,
    alignItems: 'baseline',
    padding: start,
    justifyContent:'center',
  },
  box_quartersecond: {
    flex: 0.05,
    alignItems: 'center',
    padding: start,
    justifyContent:'center',
  },
  box_half: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent:'center',
    padding: start,
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
    fontSize: 30,
    margin: 8,
    //fontFamily: 'Lucida',
    color: 'black',
  },
  undertitle: {
    alignItems: 'flex-start',
    fontSize: 15,
    margin: 8,
    //fontFamily: 'Lucida',
    color: 'grey',
  },
  inputStyle: {
    padding: 20,
    marginBottom: 5,
    fontSize: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default RegScreen;