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
var start = width / 6;

export default class AdoptScreen extends Component {
  constructor(){
    super()
    this.state={
        images: [],
        errorName: '',
        errorStreet: '',
        errorCity: '',
        errorZip: ''
    }
  }

  componentDidMount(){
    var imgs = [];
    imgs = KindImgs[global.pet];
    this.setState({images: imgs})
  }

  checkAdoption(values){
    var what = 0;
    if(values['namesurname']==''){
        this.setState({errorName: 'Toto pole je povinné'});
    }
    else{
        this.setState({errorName: ''});
        what += 1;
    }
    if(values['street']==''){
        this.setState({errorStreet: 'Toto pole je povinné'});
    }
    else{
        this.setState({errorStreet: ''});
        what += 1;
    }
    if(values['zip']==''){
        this.setState({errorZip: 'Toto pole je povinné'});
    }
    else if(values['zip'].length<5 || isNaN(values['zip'])){
        this.setState({errorZip: 'Zlý formát. Je potrebných 5 číslic.'})
    }
    else{
        this.setState({errorZip: ''})
        what += 1;
    }
    if(values['city']==''){
        this.setState({errorCity: 'Toto pole je povinné'});
    }
    else{
        this.setState({errorCity: ''});
        what += 1;
    }
    global.from = 'adopt';
    if(what==4){
      this.props.navigation.navigate('Summary');
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
            <Text style={styles.title}>Adopcia</Text>
            <Menu style={styles.menu}>
                <MenuTrigger>
                    <Image source={require('../assets/menu.png')} style={{width:40, height:40}}/>
                    <Text>Menu</Text>
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles} optionsContainerStyle={styles.menuOptions}>
                    <MenuOption onSelect={() => this.props.navigation.navigate('MyProfile')} text='Moje konto' />
                    <MenuOption onSelect={() => this.props.navigation.navigate('Filter')} text='Vyhľadať' />
                    <MenuOption onSelect={() => LogOut(this.props) } text='Odhlásiť sa' />
                </MenuOptions>
            </Menu>
          </View>

          <View style={styles.box, styles.anotherbox}>
              <Text style={styles.textik}>Vyplňte údaje pre adopciu miláčika!</Text>
                <SliderBox
                    images={this.state.images}
                    sliderBoxHeight={180}
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
              initialValues={{ namesurname: '', street:'', zip:'', city:''}}
              onSubmit={values => this.checkAdoption(values)}
            >
              {({ values, handleChange, setFieldTouched, handleSubmit }) => (
              <View style={styles.formContainer}>
                  <Input
                    leftIcon={{ type: 'ionicon', name: 'person-outline', color: 'grey'}}
                    label='Meno a priezvisko'
                    value={values.namesurname}
                    style={styles.inputStyle}
                    onChangeText={handleChange('namesurname')}
                    onBlur={() => setFieldTouched('namesurname')}
                    placeholder="Lilly Penson"
                  />   
                  <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errorName}</Text>
                  <Input
                    leftIcon={{ type: 'ionicon', name: 'business-outline', color: 'grey'}}
                    label='Ulica a číslo'
                    value={values.street}
                    style={styles.inputStyle}
                    onChangeText={handleChange('street')}
                    onBlur={() => setFieldTouched('street')}
                    placeholder="Javorová 8"
                  />     
                  <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errorStreet}</Text>
                  <Input
                    leftIcon={{ type: 'ionicon', name: 'business-outline', color: 'grey'}}
                    label='PSČ'
                    value={values.zip}
                    style={styles.inputStyle}
                    onChangeText={handleChange('zip')}
                    onBlur={() => setFieldTouched('zip')}
                    maxLength={5} 
                    placeholder="099345"
                  />     
                  <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errorZip}</Text>
                  <Input
                    leftIcon={{ type: 'ionicon', name: 'business-outline', color: 'grey'}}
                    label='Mesto'
                    value={values.city}
                    style={styles.inputStyle}
                    onChangeText={handleChange('city')}
                    onBlur={() => setFieldTouched('city')}
                    placeholder="Žilina"
                  />     
                  <Text style={{ fontSize: 12, color: 'red', alignSelf: 'flex-end' }}>{this.state.errorCity}</Text>
                
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <LinearGradient colors={['#3D66F5', '#76FFEF']} style={styles.button}>
                            <Text style={styles.btntext}>POTVRDIŤ</Text>
                        </LinearGradient>
                  </TouchableOpacity>
                
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
    flex: 0.8,
    padding: start,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  anotherbox:{
    flex:0.35,
    marginBottom: 20,
  },
  box_quartersecond: {
    flex: 0.05,
    alignItems: 'flex-start',
    padding: start,
    justifyContent:'top',
    marginTop: 20
  },
  back:{
    justifyContent: 'left',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  button: {
    width: '100%',
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
    padding: 12,
    height:40,
    width:300,
    marginBottom: 5,
    fontSize: 10,
    backgroundColor: 'white',
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
