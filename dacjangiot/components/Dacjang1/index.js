import React from 'react';
import {AppRegistry, StyleSheet, WebView, Text, View, Linking, BackHandler, ToastAndroid, Button} from 'react-native';

const SERVER_URL = "http://dacjang.us-east-1.elasticbeanstalk.com";
const THINGSPEAK_SERVER_URL = "https://api.thingspeak.com/channels/305461/feeds.json?results=1&timezone=Asia/Seoul&start=";
// var net = require('react-native-tcp')


export default class Dacjang1 extends React.Component {

  static navigationOptions = {
    tabBarLabel:"1번 막"
  };

  state = {
    djPublicIP: null,
    error: null,
    isloaded: false,
    djUpdateTime: null,
    djTemp: null,
    djHumidity: null,
  };

  componentWillMount() {
    console.log("=== componentWillMount ===");
    this._getDJStartTime();

    this._requestDJPublicIP();

    BackHandler.addEventListener('hardwareBackPress', function() {
     // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
     // Typically you would use the navigator here to go to the last state.

     console.log("=== hardwareBackPress ===");

     // _closeCam();

     ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
     return false;
    });
  }

  componentWillUnmount() {
    console.log("=== componentWillUnmount ===");
  }

  _closeCam = () => {
    console.log("closing dj cam");
    this.setState({
      isloaded: false
    });
  };


  _getDJStartTime = () => {
    let nowTime = new Date();
    nowTime.setMinutes(nowTime.getMinutes() - 30);
    var month   = nowTime.getMonth()+1;
    var nowStr  = month+"/"+nowTime.getDate()+"   "+nowTime.getHours()+":"+nowTime.getMinutes();

    this._requestDJTemp(nowStr);
  };

  _requestDJPublicIP = () => {
    fetch(`${SERVER_URL}/dj`)
      .then(response => response.json())
      .then( json => {
        console.log(json);
        this.setState({
          djPublicIP: json.publicIp,
          isloaded: true
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _requestDJTemp = (queryTime) => {
    // console.log(`Request Temp: ${THINGSPEAK_SERVER_URL}${queryTime}`);
    fetch(`${THINGSPEAK_SERVER_URL}${queryTime}`)
      .then(response => response.json())
      .then( json => {
        if(json.feeds.length > 0)
        {
          var djUpdateDateStr= json.feeds[0].created_at;

          this.setState({
            djTemp: json.feeds[0].field1,
            djHumidity: json.feeds[0].field2,
            djUpdateTime: queryTime
          });
        }else
        {
          this.setState({
            djTemp: "-",
            djHumidity: "-",
            djUpdateTime: "-"
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const {djPublicIP, isloaded, djTemp, djHumidity, djUpdateTime} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.dj_info}>
          <Text style={{color: 'blue'}}
                onPress={() => Linking.openURL(`http://${djPublicIP}/index.html`)}>
            Router: {djPublicIP}
          </Text>
          <Text style={styles.temp_humid}>{djTemp}<Text style={styles.unit}>℃</Text> / {djHumidity}<Text style={styles.unit}>%</Text></Text>
          <Text style={styles.update_date}>({djUpdateTime})</Text>
        </View>

        <View style={styles.dj_cam}>
          {isloaded ?
          (
            // <Text>debug</Text>
            <WebView
              source={{uri: `http://${djPublicIP}:9080/stream`}}
              style={styles.webView}
              cacheEnabled={true}
            />
          ) : (
            <Text>Loading..</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2c627',
    justifyContent: 'flex-end',
  },
  dj_info: {
    marginTop: 22,
    alignItems: 'center',
    flex:3
  },
  update_date: {
    fontSize: 28
  },
  temp_humid: {
    marginTop:20,
    fontSize: 45
  },
  unit: {
    fontSize: 28
  },
  dj_cam: {
    flex: 5
  },
  webView: {
    backgroundColor: '#FDF6AA',
    flex: 1
  }
});

AppRegistry.registerComponent('Dacjang1', () => Dacjang1)
