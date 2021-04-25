import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, Image, TextInput} from 'react-native';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import {Menu, MenuOptions,MenuOption, MenuTrigger} from 'react-native-popup-menu';
import {LogOut} from './MainScreen';
import { SliderBox } from "react-native-image-slider-box";

var { height } = Dimensions.get('window');
var { width } = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;
var start = width / 6;

global.search=[]

class FilterScreen extends React.Component {

    state={
        species: 'Cicavec', 
        age: '',
        price: '',
        errorMess: ''
    }

    handleAge = (text) => {
        this.setState({ age: text })
    }

    handlePrice = (text) => {
        this.setState({ price: text })
    }

    search(species, age, price){
        if(age=='' || price==''){
            this.setState({errorMess: 'Všetky polia sú povinné'});
        }
        else{
            global.search = [species, age, price];
            this.props.navigation.navigate('Filtered');
        }
    }
    
  render(){

    return (

      <View style = { styles.container }>

          <LinearGradient
              colors={['#5EF9D4', 'white']}
              style = { styles.background }>

            <View style={styles.box, styles.box_first}>
                <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={styles.back}>
                  <Ionicons name="chevron-back-outline" size={40}/>
                </TouchableOpacity>   
                <Text style={{alignItems: 'flex-start', fontSize: 24}}>Vyhľadávanie</Text>
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
                <SliderBox
                    images={[require('../assets/collage.jpg')]}
                    sliderBoxHeight={280}
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
                        
            <View style={styles.box, styles.box_half}>

                <View style={{zIndex: 10, flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                    <Text style={styles.textik}> Druh:       </Text>
                    <DropDownPicker
                        items={[
                            {label: 'Cicavec', value: 'Cicavec'},
                            {label: 'Hmyz', value: 'Hmyz'},
                            {label: 'Obojživelník', value: 'Obojživelník' },
                            {label: 'Plaz', value: 'Plaz' },
                            {label: 'Ryba', value: 'Ryba' },
                            {label: 'Vták', value: 'Vták' },
                        ]}
                        
                        defaultValue={this.state.species}
                        containerStyle={{height: 40, width: 200}}
                        style={{backgroundColor: 'white'}}
                        itemStyle={{justifyContent: 'flex-start'}}
                        labelStyle={{
                            fontSize: 18,
                            textAlign: 'left',
                            color: '#000'
                        }}
                        selectedLabelStyle={{
                            color: 'blue'
                        }}
                        dropDownStyle={{backgroundColor: 'white'}}
                        onChangeItem={item => this.setState({
                            species: item.value
                        })}
                    />
                </View>
                <View style={styles.nextto}>
                    <Text style={styles.textik}>Max. vek: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handleAge}
                        placeholder="1"
                        keyboardType="numeric"
                    />  
                </View>

                <View style={styles.nextto}>
                    <Text style={styles.textik} textAlign={'center'}> Max. cena: </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={this.handlePrice}
                        placeholder="30"
                        keyboardType="numeric"
                    />  
                </View>
                <Text style={{ fontSize: 17, color: 'red'}}>{this.state.errorMess}</Text>
            </View>
            
            <View style={styles.box, styles.box_quartersecond}>
              
              <TouchableOpacity style = { styles.button} onPress={() => this.search(this.state.species,this.state.age, this.state.price)}>
                <LinearGradient style = { styles.gradient } colors={['#3D66F5', '#76FFEF']}>
                  <Text style = { styles.buttonText }>VYHĽADAŤ</Text>
                </LinearGradient>
              </TouchableOpacity>

            </View>
          </LinearGradient>
      </View>
    )
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
    back:{
        justifyContent: 'left',
        alignItems: 'flex-start',
        paddingBottom: 10,
      },
    box_quarterfirst: {
      flex: 0.25,
      alignItems: 'center',
      justifyContent:'center',
    },
    box_quartersecond: {
      flex: 0.25,
      alignItems: 'center',
    },
    box_half: {
      flex: 0.8,
      alignItems: 'center',
      justifyContent:'center',
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
    nextto: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 120
    },
    box_second: {
        flex: 0.85,
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: height,
    },
    title: {
      alignItems: 'center',
      fontSize: 95,
      //fontFamily: 'Lucida',
      color: 'black',
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
    input: {
        margin: 15,
        height: 40,
        width:40,
        backgroundColor: 'white',
        borderRadius: 5,
        textAlign: 'center'
    },
    textik:{
        fontSize: 18,
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingBottom: 10,
        fontWeight: 'bold'
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
      },
    };
    

export default FilterScreen;