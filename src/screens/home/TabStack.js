import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import Home from "./Home";
import Session from "./Session";

const Navigation = createStackNavigator({
    
    Home: {
        screen: Home, 
        navigationOptions: ({ navigation }) => ({
            title: "Home",
        }),
    },
    Session: {
        screen: Session, 
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
            tabBarVisible: false,
        }
    },

}, {
    initialRouteName: 'Home',
    /* The header config from FirstScreen is now here */
    navigationOptions: {

        headerStyle: {
            backgroundColor: '#fbf1dc',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

const TabStack = createAppContainer(Navigation);

export default TabStack;

