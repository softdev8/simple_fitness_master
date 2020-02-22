import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import Profile from "./Profile";

const Navigation = createStackNavigator({
    
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            title: "Profile",
        }),
    },

}, {
    initialRouteName: 'Profile',
    /* The header config from FirstScreen is now here */
    navigationOptions: {

        headerStyle: {
            backgroundColor: '#fbf1dc',
        },
        header: null, 
        headerTintColor: '#000000',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

const TabStack = createAppContainer(Navigation);

export default TabStack;


