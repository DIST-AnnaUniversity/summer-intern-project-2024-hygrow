import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch, Alert } from 'react-native';
import { CONSTDATAS } from '../constdata';

interface MyProps{

}
interface MotorState {
  motorStatus: boolean;
}

class Motor extends Component<MyProps, MotorState> {
    url:string= CONSTDATAS.server_ip + '/relay/';
    
    constructor(props: MyProps) {
        super(props);
        this.state = {
          motorStatus: false
        };
        this.getMotorStatus();
      }
    
      getMotorStatus = () => {
        fetch(this.url)
          .then((res: any) => res.text())
          .then((res) => {
            console.log("Successful");
            console.log(res);
            this.setState({ motorStatus: res === 'Motor On' });
          })
          .catch((error: any) => {
            console.log("Failed to return motor status");
            console.log(error);
            this.setState({ motorStatus: false });
          });
      };
    
      setMotorStatus = (sta: string) => {
        fetch(this.url + sta) 
          .then((res: any) => res.text())
          .then((res) => {
            console.log("Successful");
            console.log(res);
            this.setState({ motorStatus: res === 'Motor On' });
          })
          .catch((error: any) => {
            console.log("Failed to return motor status");
            console.log(error);
            this.setState({ motorStatus: false });
          });
      };
    
      toggleMotor = (value: boolean) => {
        console.log(value);
        this.setState({ motorStatus: value }, () => {
          let sta = this.state.motorStatus ? 'on' : 'off';
          Alert.alert('Motor Status', `Motor is now ${this.state.motorStatus ? 'ON' : 'OFF'}`);
          this.setMotorStatus(sta);
        });
      };
    

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Motor{"\n"}</Text>
        <Text style={styles.content}>Check out the status of motor here!!{"\n"}</Text>
        <Text style={styles.motorStatus}>Motor Status: {this.state.motorStatus ? 'ON' : 'OFF'} {"\n"}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.state.motorStatus ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={this.toggleMotor}
          value={this.state.motorStatus}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },

  title: {
    fontSize: 30,
    color: '#191970',
    fontWeight: 'semibold',
  },

  motorStatus: {
    fontSize: 20,
    marginBottom: 10,
    color: 'purple',
  },

  content: {
    fontSize: 20,
    color: '#800080',
    fontWeight: 'semibold',
  },
});

export default Motor;
