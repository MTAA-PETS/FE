import React, { Component} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {Menu, MenuOptions,MenuOption, MenuTrigger} from 'react-native-popup-menu';
import { Formik } from 'formik';
import { Input } from 'react-native-elements';
import {LogOut} from './MainScreen';
import { SliderBox } from "react-native-image-slider-box";
import KindImgs from '../KindImgs';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;
var start = width / 10;

global.pet = 'Fretka domáca';

export default class FondScreen extends Component {
  constructor(){
    super()
    this.state={
        images: [],
        errorfond: '',
    }
  }

  errorfond(){
    this.setState({errorfond: 'Minimálna čiastka je 5€'})
  }

  componentDidMount(){
    var imgs = [];
    imgs = KindImgs[global.pet];
    this.setState({images: imgs})
  }

  checkFond(values){
    if(values['fond']<5.0){
      this.errorfond();
    }
    else{
      this.setState({errorfond: ''});
      //tu bude prepnutie
    }
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
            <Text style={styles.title}>Podpora</Text>
            <Menu style={styles.menu}>
                <MenuTrigger>
                    <Image source={require('../assets/menu.png')} style={{width:40, height:40}}/>
                    <Text>Menu</Text>
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles} optionsContainerStyle={styles.menuOptions}>
                    <MenuOption onSelect={() => this.props.navigation.navigate('MyProfile')} text='Moje konto' />
                    <MenuOption onSelect={() => alert(`Vyhľadať`)} text='Vyhľadať' />
                    <MenuOption onSelect={() => LogOut(this.props) } text='Odhlásiť sa' />
                </MenuOptions>
            </Menu>
          </View>

          <View style={styles.box, styles.anotherbox}>
              <Text style={styles.textik}>Zadajte čiastku pre zvoleného miláčika!</Text>
                <SliderBox
                    images={this.state.images}
                    sliderBoxHeight={240}
                    sliderBoxWidth={start}
                    sliderBox
                    dotColor="#92FCE9"
                    inactiveDotColor="#90A4AE"
                    paginationBoxVerticalPadding={20}
                    resizeMethod={'scale'}
                    paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 10
                    }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "rgba(128, 128, 128, 0.92)"
                    }}
                    ImageComponentStyle={{borderRadius: 15, width: '90%', marginTop: 5}}
                    imageLoadingColor="#2196F3"
                />
              </View>
        

          <View style={styles.box, styles.box_second}>
            <Formik
              initialValues={{ fond: ''}}
              onSubmit={values => this.checkFond(values)}
            >
              {({ values, handleChange, setFieldTouched, handleSubmit }) => (
              <View style={styles.formContainer}>
                <View style={styles.box, styles.box_half}>
                  <Input
                    leftIcon={{ type: 'ionicon', name: 'logo-euro', color: 'grey'}}
                    value={values.fond}
                    style={styles.inputStyle}
                    onChangeText={handleChange('fond')}
                    onBlur={() => setFieldTouched('fond')}
                    placeholder="5"
                  />   
                  <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errorfond}</Text>
                </View>
                <View style={styles.box, styles.box_quartersecond}>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <LinearGradient colors={['#3D66F5', '#76FFEF']} style={styles.button}>
                            <Text style={styles.btntext}>PODPORIŤ</Text>
                        </LinearGradient>
                  </TouchableOpacity>
                </View>
             </View>
             )}
            </Formik> 
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
  box_first: {
    flex: 0.15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box_second: {
    flex: 0.05,
    padding: start,
    marginTop: 50
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  anotherbox:{
    flex:0.4,
    marginBottom: 30,
  },
  box_quartersecond: {
    flex: 0.05,
    alignItems: 'center',
    padding: start,
    justifyContent:'center',
    marginTop: 20
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
  title: {
    alignItems: 'flex-start',
    fontSize: 26,
    margin: 10,
    fontWeight: 'bold'
    //fontFamily: 'Lucida',
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
    fontSize: 18,
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 20
  },
  inputStyle: {
    padding: 20,
    marginBottom: 5,
    fontSize: 15,
    backgroundColor: 'white',
    flex: .5,
    borderRadius: 10,
  },
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
  }
};
