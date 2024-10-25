import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CONSTDATAS } from '../constdata';

class Settings extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Image
        source={{uri:'https://www.shutterstock.com/image-vector/cogwheel-gear-mechanism-vector-settings-260nw-226269949.jpg'}}
        style={styles.logo}
        />
      <Text style={styles.description}>{"\n"}Configure your HyGrow app settings here.{"\n"}</Text>

      <Image
        source={{uri:'https://c8.alamy.com/comp/2RG75E4/collection-of-connect-icons-contact-us-icon-set-contact-and-communication-icons-set-of-communication-icon-2RG75E4.jpg'}}
        style={styles.logo}
        />
      <Text style={styles.content}>Apps - Recent, Default{"\n"}</Text>
      <Image
        source={{uri:'https://www.shutterstock.com/image-vector/notification-icon-vector-material-design-260nw-759841507.jpg'}}
        style={styles.logo}
        />
        <Text style={styles.content}>Notifications - History, Conversations{"\n"}</Text>
        <Image
        source={{uri:'https://bluecrest.edu.gh/images/Cyber-Security.png'}}
        style={styles.logo}
        />
        <Text style={styles.content}>Security - Password, fingerprint, face{"\n"}</Text>
        <Image
        source={{uri:'https://www.cookieyes.com/wp-content/uploads/2023/03/privacy-by-design.png'}}
        style={styles.logo}
        />
        <Text style={styles.content}>Privacy - Permissions, personal data{"\n"}</Text>
        <Image
        source={{uri:'https://media.istockphoto.com/id/1423854750/vector/industrial-worker-holding-safety-first-sign-engineer-with-his-personal-protective-equipment.jpg?s=612x612&w=0&k=20&c=g1Dk752yoyWfapIRDlp8YUxKPrOdEAB8MNOAhBRbz04='}}
        style={styles.logo}
        />
        <Text style={styles.content}>Safety & Emergency - SOS, alerts</Text>
        <Text style={styles.content}>IP address:{CONSTDATAS.server_ip}</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    color: '#00796b',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#00796b',
    textAlign: 'left',
  },
  logo:{
    width:30,
    height:30,
    marginRight:10,
  },
  content:{
    fontSize:16,
    color:'#00008b',
    textAlign:'left'
  }
});

export default Settings;