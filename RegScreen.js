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
    this.state={errormessage: ""}
    this.state={errormessage2: ""}
    this.state={errormessage3: ""}
    this.state={errormessage4: ""}
    this.state={errormessage5: ""}
    this.state={errormessage6: ""}
    this.state={errormessage7: ""}
    this.state={errormessage8: ""}
    this.state={errormessage9: ""}
  }
  updateerror(){
    this.setState({errormessage: "Heslá sa nezhodujú"})
  }
  updateerrormail(){
    this.setState({errormessage2: "Nesprávny tvar emailu"})
  } 
  updateerrormailduplicate(){
    this.setState({errormessage3: "Tento email alebo nick už existuje"})
  }
  updateerrordate(){
    this.setState({errormessage4: "Nesprávny tvar. Zadajte v tvare RRRR-MM-DD"})
  }
  updateerrornick(){
    this.setState({errormessage5: "Tento užívateľ už existuje"})
  }
  updateerrornick2(){
    this.setState({errormessage6: "Toto pole je povinné"})
  }
  updateerrordate2(){
    this.setState({errormessage7: "Bohužial nemáš 18 rokov"})
  }
  updateerrorblank(){
    this.setState({errormessage8: "Toto pole je povinné"})
  }
  updateerrorblankmail(){
    this.setState({errormessage9: "Toto pole je povinné"})
  }
  
  render(){
    return(
      <Formik
        initialValues={{ emai: '', nick:'', password: '' , password2: '', birth: ''}}
        onSubmit={values => this.login(values)}
      >
      {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
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
              {touched.email && errors.email &&
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
              }
              <Text style={{ fontSize: 12, color: 'red' }}> {this.state.errormessage9} {this.state.errormessage2} {this.state.errormessage3}</Text>
              <Input
                leftIcon={{ type: 'ionicon', name: 'person-circle-outline', color: 'grey'}}
                value={values.nick}
                style={styles.inputStyle}
                onChangeText={handleChange('nick')}
                onBlur={() => setFieldTouched('nick')}
                placeholder="lilly9"
                label="Nick"
              />   
              {touched.nick && errors.nick &&
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.nick}</Text>
              }
              <Text style={{ fontSize: 12, color: 'red' }}>{this.state.errormessage3} {this.state.errormessage5} {this.state.errormessage8}</Text>
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
              {touched.password && errors.password &&
                <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
              }
              <Text style={{ fontSize: 12, color: 'red' }}>{this.state.errormessage8}</Text>
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
              {touched.password2 && errors.password2 &&
                <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password2}</Text>
              }
              <Text style={{ fontSize: 12, color: 'red' }}>{this.state.errormessage}</Text>
              <Input
                leftIcon={{ type: 'ionicon', name: 'calendar-outline', color: 'grey'}}
                value={values.birth}
                style={styles.inputStyle}
                onChangeText={handleChange('birth')}
                onBlur={() => setFieldTouched('birth')}
                placeholder="1998-08-08"
                label="Dátum narodenia"
              />   
              {touched.birth && errors.birth &&
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.birth}</Text>
              }
              <Text style={{ fontSize: 12, color: 'red' }}>{this.state.errormessage4} {this.state.errormessage7}</Text>
            </View>
            <View style={styles.box, styles.box_quartersecond}>
              <TouchableOpacity disabled={!isValid} style={styles.button} onPress={handleSubmit}>
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
    if (values['password'] != values['password2']){
      this.updateerror();
      return 0;
    }
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
            if(errorMes["errors"]["birth"] != undefined){
              if("Date has wrong format. Use one of these formats instead: YYYY-MM-DD." == errorMes["errors"]["birth"]){
                this.updateerrordate();
              }}
            if("Not adult" == errorMes["errors"]){
              this.updateerrordate2();
            }
            if("Duplicate values" == errorMes["errors"]){
              this.updateerrormailduplicate();
            }
            if(errorMes["errors"]["email"] != undefined){
              if("This field may not be blank." == errorMes["errors"]["email"]){
                this.updateerrorblankmail();
              }
              if("Enter a valid email address." == errorMes["errors"]["email"]){
                this.updateerrormail();
              }
            }
            if(errorMes["errors"]["nick"] != undefined){
              if("This field may not be blank." == errorMes["errors"]["nick"]){
                this.updateerrorblank();
              }else{
                this.updateerrornick();
              }
            }
            if(errorMes["errors"]["password"] != undefined){
              if("This field may not be blank." == errorMes["errors"]["password"]){
                this.updateerrorblank();
              }
            }
          })
            if(error['status'] == 403){
              if("This field may not be blank." == errorMes["errors"]["birth"]){
                this.updateerrorblank();
              }
              this.updateerrormailduplicate();
            }
            //this.updateerror();
        })
    }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#5EF9D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    flex: 0.15,
    alignItems: 'center',
    padding: start,
    justifyContent:'center',
  },
  box_half: {
    flex: 0.7,
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
  text: {
    color: 'white',
    fontSize: 16
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