import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView} from 'react-native';

import Swiper from 'react-native-swiper';
import SessionItem from '../../components/SessionItem';

var deviceWidth = Dimensions.get('window').width;

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

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionData: sessionData
        }
    }

    renderListItem(item, index) {

        return (
            <SessionItem title={item.title} avatar={item.avatar} user={item.user} imgData={item.subImage} subExercise={item.subExercise} status={2} navigation={this.props.navigation} />
        );
    }

    render() {

        let listPages = this.state.sessionData.map((item, index) => {
            return this.renderListItem(item, index);
        });

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{flexDirection: 'row', width: deviceWidth, height: 100, alignItems: 'center'}}>
                        <Image source={ require('../../resources/avatar1.png') } style={{resizeMode: 'stretch', width: 75, height: 75, marginLeft: 25}}/>

                        <View style={{width: deviceWidth - 140, height:30, marginLeft: 30, marginTop: -20, marginRight: 10, borderRadius: 5, borderColor: 'black', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                            <Text >Edit Profile</Text>
                        </View>
                    </View>
                    
                    <Text style={{fontSize: 22, marginLeft: 20}}>Mykhailo Storozhuk</Text>
                    <Text style={{color: '#4489DB', fontSize: 17, marginTop: 5, marginLeft: 20}}>@mykhailo</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 20}}>
                        <Text style={{fontSize: 15}}>London - </Text>
                        <Image source={ require('../../resources/gb.png') } style={{resizeMode: 'stretch', width: 16, height: 16, marginLeft: 10}}/>
                    </View>
                    <Text style={{marginLeft: 20, color: '#434343', marginRight: 10}}>lorem empsun lorem empsun lorem empsun lorem empsun lorem empsun lorem empsun</Text>
                    <View style={{height: 1, width: deviceWidth, backgroundColor: 'grey', marginTop: 15}} />

                    <View style={{width: deviceWidth, marginTop: 25}}>
                        {listPages}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});