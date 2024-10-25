import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { CONSTDATAS } from '../constdata';

class Temperature extends React.Component<MyProps,MyTemperatureState>{
    url:string= CONSTDATAS.server_ip + '/temperature';
    getTemperature=()=>{
        fetch(this.url)
        .then((res1:any) => res1.text())
        .then((res) => {
            console.log("Successful");
            console.log(res);
            this.setState({temperaturetxt:res})
        })
        .catch((error:any) => {
            console.log("Failed to return temperature");
            console.log(error);
            this.setState({temperaturetxt:'Undefined'})
        })
    };
    constructor(props:any) {
        super(props);
        this.state = {
            temperaturetxt: ''
        };
        this.getTemperature();
      }
    render(){
    return(
        <>
        <View style={styles.container}>
        <Text style={styles.title}>Temperature{"\n"}</Text>
        <Text style={styles.content}>Check out the temperature updates here!!{"\n"}</Text>
            <View style={styles.temperatureContainer}>
                <Text style={styles.temperature}>{this.state.temperaturetxt}°C</Text>
                <Text style={styles.subtitle}>Current Temperature</Text>
                <Image
                source={{uri:'https://static.vecteezy.com/system/resources/thumbnails/009/251/684/small_2x/thermometer-with-cold-and-hot-symbol-for-web-and-mobile-app-icon-free-vector.jpg'}}
                style={styles.logo}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.getTemperature()}>
                <Text style={styles.buttonText}>Check Temperature</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
}
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffe4b5',
        alignItems:'center',
        justifyContent:'center',
    },

    logo:{
        width:100,
        height:100,
        marginRight:10,
    },

    title:{
        fontSize:30,
        color:'#ff6347',
        fontWeight:'semibold',
    },

    content:{
        fontSize:18,
        color:'#4682b4',
        fontWeight:'semibold',
    },

    temperatureContainer:{
        alignItems:'center',
        backgroundColor:'#fff',
    },

    temperature:{
        fontSize: 24,
        fontWeight:'medium',
        color: '#ff6347',
    },

    subtitle:{
        fontSize: 15,
        color: '#4682b4',
        fontWeight:'condensed',
    },

    image: {
        width: 100,
        height: 100,
        marginTop: 20,
      },
    
    button: {
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

interface MyTemperatureState {
  temperaturetxt: string
}

interface MyProps {

  }
export default Temperature;