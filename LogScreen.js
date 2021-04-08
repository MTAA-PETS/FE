import React, { Component } from 'react';
import { TextInput, Alert, StyleSheet, Text, Button, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;
var start = width / 6;

var ApiUtils = {  
  checkStatus: function(response) {
    if (response.ok) {
        return response;
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
  };

class LogScreen extends React.Component{
    render(){
      const inputStyle = {
        padding: 12,
        marginBottom: 5,
        fontSize: 15,
      };
      return(
        <Formik
        initialValues={{ 
          emailnick: '',
          password: '' 
        }}
        onSubmit={values => this.login(values)}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
            <LinearGradient
                        colors={['#5EF9D4', 'white']}
                        style = { styles.background }>
              <View style={styles.box, styles.box_quarterfirst} >
                <Text style={styles.title}>Prihlásenie</Text>
                <Text style={styles.undertitle}>Vitajte späť!</Text>
              </View>
              <View style={styles.box, styles.box_half}>
                <Input
                  leftIcon={{ type: 'font-awesome', name: 'user', color: 'grey'}}
                  value={values.emailnick}
                  style={inputStyle}
                  onChangeText={handleChange('emailnick')}
                  onBlur={() => setFieldTouched('emailnick')}
                  placeholder="E-mail alebo nick"
                />   
                {touched.email && errors.email &&
                    <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                }
                <Input
                  value={values.password}
                  style={inputStyle}
                  onChangeText={handleChange('password')}
                  placeholder="Heslo"
                  onBlur={() => setFieldTouched('password')}
                  secureTextEntry={true}
                  leftIcon={{ type: 'font-awesome', name: 'key', color:'grey'}}
                />
                {touched.password && errors.password &&
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                }
              </View>
              <View style={styles.box, styles.box_quartersecond}>
                <TouchableOpacity disabled={!isValid} style={styles.button} onPress={handleSubmit}>
                      <LinearGradient colors={['#3D66F5', '#76FFEF']} style={styles.button}>
                          <Text style={styles.btntext}>PRIHLÁSENIE</Text>
                          <Icon style = {styles.icon} name="sign-in" size={20} resizeMode="contain" />
                      </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.undertitle}>Ešte nemáte účet? <Text style={{fontWeight:'bold'}} onPress={() => this.props.navigation.navigate('Registration')}>Registrácia</Text></Text>
              </View>
            </LinearGradient>  
          </View>
        )}
      </Formik> 
      );      
    }
  login(values){
    const url = 'https://mtaa-pets.herokuapp.com/user/login/';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        'nick/email': values['emailnick'],
        'password': values['password'],
      })
    };
    fetch(url, options)
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .catch(e => e)
      .then(jsondata => console.log(jsondata))
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
    flex: 0.25,
    alignItems: 'left',
    padding: start,
    justifyContent:'center',
  },
  box_quartersecond: {
    flex: 0.25,
    alignItems: 'center',
    padding: start,
    justifyContent:'center',
  },
  box_half: {
    flex: 0.5,
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
    flex:.8,
  },
  icon: {
    color: "white",
    flex:.2 ,
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  formContainer: {
    padding : 50
  },
  title: {
    alignItems: 'left',
    fontSize: 30,
    margin: 8,
    fontFamily: 'Lucida',
    color: 'black',
  },
  undertitle: {
    alignItems: 'left',
    fontSize: 15,
    margin: 8,
    fontFamily: 'Lucida',
    color: 'grey',
  },
});

export default LogScreen;