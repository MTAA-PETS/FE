import React, { Component} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {Menu, MenuOptions,MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {LogOut} from './MainScreen';
import { SliderBox } from "react-native-image-slider-box";
import KindImgs from './KindImgs';

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;
var start = width / 10;

class PetScreen extends Component {
  constructor(){
    super()
    this.state={
        name: "",
        age: "",
        weight: "",
        food: "",
        info: "",
        price: "",
        images: []
    }
  }

  componentDidMount(){
    this.getPet();
    var imgs = [];
    imgs = KindImgs[global.pet];
    this.setState({images: imgs})
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
            <Text style={{alignItems: 'flex-start', fontSize: 17}}>{global.pet}</Text>
            <Menu style={styles.menu}>
                <MenuTrigger>
                    <Image source={require('./assets/menu.png')} style={{width:40, height:40}}/>
                    <Text>Menu</Text>
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles} optionsContainerStyle={styles.menuOptions}>
                    <MenuOption onSelect={() => props.navigation.navigate('MyProfile')} text='Moje konto' />
                    <MenuOption onSelect={() => alert(`Vyhľadať`)} text='Vyhľadať' />
                    <MenuOption onSelect={() => LogOut(this.props) } text='Odhlásiť sa' />
                </MenuOptions>
            </Menu>
          </View>

          <View style={styles.anotherbox}>
                <SliderBox
                    images={this.state.images}
                    sliderBoxHeight={240}
                    sliderBoxWidth={start}
                    sliderBox
                    dotColor="#92FCE9"
                    inactiveDotColor="#90A4AE"
                    paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
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
              <View style={styles.data}>
                <Text style={styles.title}>Špecifikácia</Text>
                <Text style={styles.textik}>{this.state.name}</Text>
                <Text style={styles.textik}>{this.state.age}</Text>
                <Text style={styles.textik}>{this.state.weight}</Text>
                <Text style={styles.textik}>{this.state.food}</Text>
                <Text style={styles.textik}>{this.state.price}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>Popis</Text>
                <Text style={styles.textik}>{this.state.info}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style= {{alignItems:'flex-start', justifyContent: 'left'}}>
                    <TouchableOpacity style={styles.button}>
                            <LinearGradient colors={['#3D66F5', '#76FFEF']} style={styles.button}>
                                <Text style={styles.btntext}>PODPORA</Text>
                            </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style = {{alignItems:'flex-end', justifyContent: 'right'}}>
                    <TouchableOpacity style={styles.button}>
                        <LinearGradient colors={['#3D66F5', '#76FFEF']} style={styles.button}>
                            <Text style={styles.btntext}>ADOPCIA</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
              </View>
          </View>

          </LinearGradient>
      </View>
    );      
  }
  getPet(){

    const url = 'https://mtaa-pets.herokuapp.com/pets/?breed='+global.pet;
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
          this.setState({name: "Meno: " + result[0]['name']});
          this.setState({age: "Vek(roky): " + result[0]['age']});
          this.setState({weight: "Váha: " + result[0]['weight'] + " kg"});
          this.setState({food: "Potrava: " + result[0]['food']});
          this.setState({info: result[0]['info']});
          this.setState({price: "Cena: " + result[0]['price'] + "€"});
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
    flex: 0.8,
    padding: start
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
  data:{
    flex:0.6,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
  },
  info:{
    flex:0.35,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10
    },
  back:{
    justifyContent: 'left',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  button: {
    width: '120%',
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
    margin: 8,
    //fontFamily: 'Lucida',
    color: 'blue',
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
    fontSize: 16,
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
  }
};

export default PetScreen;