import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList} from 'react-native';

import SessionItem from '../../components/SessionItem';

let sessionData = [
    {
        title: "Session Name1",
        user: "@creatorhandle",
        avatar: require('../../resources/avatar.png'),
        subImage: [
            {
                thumbnail: require('../../resources/image1.png')
            }, 
            {
                thumbnail: require('../../resources/image2.png')
            },
            {
                thumbnail: require('../../resources/image3.png')
            }       
        ],
        subExercise: [
            {
                value: 3,
                title: "Overhead Press (Dumbbell)"
            }, 
            {
                value: 5,
                title: "Clean and Press"
            },
            {
                value: 7,
                title: "Hang Clean"
            }
        ]
    },
    {
        title: "Session Name2",
        user: "@mykhailo",
        avatar: require('../../resources/avatar.png'),
        subImage: [
            {
                thumbnail: require('../../resources/image4.png')
            },
            {
                thumbnail: require('../../resources/image5.png')
            }       
        ],
        subExercise: [
            {
                value: 3,
                title: "Overhead Press (Dumbbell)"
            }, 
            {
                value: 5,
                title: "Clean and Press"
            },
            {
                value: 5,
                title: "Hang Clean"
            },
            {
                value: 7,
                title: "Different Exercise"
            }
        ]
    }
]

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arrData: sessionData
        }
    }

    pushScreen = (item) => {

    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.arrData}
                    keyExtractor={(item, index) => item.index}
                    renderItem={({item}) => 
                        <SessionItem title={item.title} avatar={item.avatar} user={item.user} imgData={item.subImage} subExercise={item.subExercise} status={0} navigation={this.props.navigation} />
                    }
                />
            </View>
        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});