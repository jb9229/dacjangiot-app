import React from 'react';
import {AppRegistry, StyleSheet, WebView, Text, View, Linking, BackHandler, ToastAndroid, Button} from 'react-native';



export default class Dacjang4 extends React.Component {

  static navigationOptions = {
    tabBarLabel:"4번 막"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> 준비 중... </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2c627',
    justifyContent: 'flex-end',
  }
});


AppRegistry.registerComponent('Dacjang4', () => Dacjang4)
