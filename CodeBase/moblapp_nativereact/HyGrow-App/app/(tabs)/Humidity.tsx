import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { CONSTDATAS } from '../constdata';

class Humidity extends React.Component<MyProps,MyHumidityState>{
    url:string= CONSTDATAS.server_ip + '/humidity';
    getHumidity=()=>{
        fetch(this.url)
        .then((res1:any) => res1.text())
        .then((res) => {
            console.log("Successful");
            console.log(res);
            this.setState({humiditytxt:res})
        })
        .catch((error:any) => {
            console.log("Failed to return humidity");
            console.log(error);
            this.setState({humiditytxt:'Undefined'})
        })
    };
    constructor(props:any) {
        super(props);
        this.state = {
            humiditytxt: ''
        };
        this.getHumidity();
      }
    render(){
        return(
            <>
        <View style={styles.container}>
        <Text style={styles.title}>Humidity{"\n"}</Text>
        <Text style={styles.content}>Check out the humidity updates here!!{"\n"}</Text>
            <View style={styles.humidityContainer}>
                <Text style={styles.humidity}>{this.state.humiditytxt}%</Text>
                <Text style={styles.subtitle}>Current Humidity</Text>
                <Image
                source={{uri:'https://st3.depositphotos.com/1020091/13934/v/450/depositphotos_139346110-stock-illustration-humidity-icon-with-shadow-design.jpg'}}
                style={styles.logo}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.getHumidity()}>
                <Text style={styles.buttonText}>Check Humidity</Text>
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
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#e0ffff',
    },

    title:{
        fontSize:30,
        color:'#1e90ff',
        fontWeight:'semibold',
    },

    logo:{
        width:100,
        height:100,
        marginRight:10,
    },

    content:{
        fontSize:18,
        color:'black',
        fontWeight:'normal',
    },

    humidityContainer:{
        alignItems:'center',
        backgroundColor:'#fff',
    },

    humidity:{
        fontSize: 24,
        fontWeight:'medium',
        color: '#00bfff',
    },

    subtitle:{
        fontSize: 15,
        color: 'black',
    },

    image: {
        width: 100,
        height: 100,
        marginTop: 20,
      },
    
    button: {
        backgroundColor: '#00bfff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

interface MyHumidityState {
    humiditytxt: string
  }
  
  interface MyProps {
  
    }

export default Humidity;