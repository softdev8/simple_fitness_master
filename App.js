import React, {Component} from 'react';
import {
    Image
} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation'

import Home from "./src/screens/home/TabStack";
import Library from "./src/screens/library/TabStack";
import Profile from "./src/screens/profile/TabStack";

const Navigation = createBottomTabNavigator({
    
    Home: {
        screen: Home,
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor }) => (
            <Image source={require('./src/resources/home.png')} style={{ height: 24, width: 24 }} />
          )
        }
    },
    Library: {
        screen: Library,
        navigationOptions: {
          tabBarLabel: 'Library',
          tabBarIcon: ({ tintColor }) => (
            <Image source={require('./src/resources/library.png')} style={{ height: 24, width: 20 }} />
          )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => (
            <Image source={require('./src/resources/profile.png')} style={{ height: 22, width: 24 }} />
          )
        }
    }
}, {    
    tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        height:60,
        style: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5
        }
    }
});

const App = createAppContainer(Navigation);

export default App;

