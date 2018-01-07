import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {TabNavigator} from 'react-navigation';

import Dacjang1 from './components/Dacjang1';
import Dacjang2 from './components/Dacjang2';
import Dacjang3 from './components/Dacjang3';
import Dacjang4 from './components/Dacjang4';


// Commit Test
// //Class
// export default class App extends React.Component {
//   render() {
//       return <Dacjang />
//   }
// }

const App = TabNavigator({
  Tab1: {screen: Dacjang1},
  Tab2: {screen: Dacjang2},
  Tab3: {screen: Dacjang3},
  Tab4: {screen: Dacjang4}
  }, {
    tabBarPosition: 'top',
    animationEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 22,
        fontWeight: 'bold',

      },
      style: {
        backgroundColor: '#215448',
      },
    },
  });

  App.navigationOptions = {
    title: "Tab examples~"
  }

export default App;
