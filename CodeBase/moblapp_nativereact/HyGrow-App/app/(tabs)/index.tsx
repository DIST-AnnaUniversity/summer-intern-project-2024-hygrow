import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
      <>
      <View style={styles.container}>
                <Image
                source={require('../../resource/images/hygrow.png')}
                style={styles.logo}
                />
                <Text style={styles.title}>
                Welcome to HyGrow!
                </Text>
                <Text style={styles.description}>ANYTIME ANYWHERE{"\n\n\n"}Your smart solution for remote plant watering.{"\n"}</Text>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 8,
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    color: 'darkgreen',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight:'bold',
  },
  description:{
    fontSize:16,
    color:'green',
    textAlign:'center',
  },
});
