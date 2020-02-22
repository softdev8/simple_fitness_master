import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";

import Swiper from 'react-native-swiper';

var deviceWidth = Dimensions.get('window').width;

export default class SesstionItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: props.avatar,
            title: props.title,
            user: props.user,
            imgData: props.imgData,
            subExercise: props.subExercise,
            status: props.status,
            navigation: props.navigation
        };
    }

    renderItem(item, index) {
        console.log("item: " + item);
        return (
            <View style={styles.slide1}>
                <Image source={ item.thumbnail } style={{resizeMode: 'stretch', width: deviceWidth, height: 200}}/>
            </View>
        );
    }

    renderExerciseItem(item, index, status) {
        return (
            <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                <View style={{width: 30, height: 30, backgroundColor: 'grey', borderRadius: 15, justifyContent: 'center', marginLeft: 10}}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>{item.value}</Text>
                </View>

                <Text style={{fontSize: 18, marginLeft: 10, color: 'grey'}}>X</Text>
                <Text style={[styles.container, {marginLeft: 15, fontSize: 18, color: 'black'}]}>{item.title}</Text>
                {(status == 2) ? <Image source={ require('../resources/checked.png') } style={{resizeMode: 'stretch', width: 24, height: 24, marginRight: 10}}/> : null}
            </View>
        );
    }

    onSession = () => {
        this.state.navigation.navigate('Session')
    }

    render() {

        console.log("imgData" + this.state.imgData);

        let listPages = this.state.imgData.map((item, index) => {
            return this.renderItem(item, index);
        });     
        
        let exerciseList = this.state.subExercise.map((item, index) => {
            return this.renderExerciseItem(item, index, this.state.status);
        });  
        
        return (
            <TouchableOpacity onPress={() => this.onSession()}>
                <View style={{backgroundColor: 'white', marginBottom: 25, borderColor: 'grey', borderWidth: 1}}>
                    <View style={{flexDirection: 'row', height: 65, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={ this.state.avatar } style={{resizeMode: 'stretch', width: 50, height: 50, marginLeft: 10}}/>
                        <View style={{flexDirection: 'column', flex: 1, marginLeft: 15}}>
                            <Text style={{fontSize: 18}}>{this.state.title}</Text>
                            <Text style={{color: '#4489DB', marginTop: 3}}>{this.state.user}</Text>
                        </View>
                        { (this.state.status != 2) ? 
                            <Image source={ (this.state.status === 0) ? require('../resources/status.png') : require('../resources/status1.png') } style={{resizeMode: 'stretch', width: 23, height: 36, marginRight: 15}}/> :
                            null
                        }
                    </View>

                    <View style={{width: deviceWidth, height: 200}}>
                        <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
                            {listPages}
                        </Swiper>
                    </View>

                    <View style={{marginTop: 15, marginBottom: 10}}>
                        {exerciseList}
                    </View>                
                </View>
            </TouchableOpacity>
        );
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
