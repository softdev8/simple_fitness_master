import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView} from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

var deviceWidth = Dimensions.get('window').width;

var sprintf = require("sprintf-js").sprintf

let sessionData = {
    "sessionId":"1123",
    "sessionCreatorId":"1233",
    "sessionCreatorName":"@janeSmith123",
    "sessionDescriptions":"lorem empsun lorem empsun lorem empsun lorem empsun lorem empsun lorem empsun",
    "sessionImages": [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    "sessionVideos": [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    "sessionName":"super session 1",
    "noOfExercises":2,
    "exercises": [
        {
          "id":"1",
          "exerciseId":"2",
          "exerciseNo":"1",
          "exerciseName":"Pull ups",
          "colour":"#f9f9f9",
          "sets": [
            {
                "setNo":"1",
                "repsRequired":12,
                "repsCompleted":12,
                "isComplete":false,
                "weight":67,
                "weightMetric":"KG",
                "previousWeight":50,
                "previousReps":10,
                "exerciseTime":90,
            },
            {
                "setNo":"1",
                "repsRequired":10,
                "repsCompleted":10,
                "isComplete":false,
                "weight":50,
                "weightMetric":"KG",
                "previousWeight":67,
                "previousReps":12,
                "exerciseTime":60,
            },
            {
                "setNo":"1",
                "repsRequired":5,
                "repsCompleted":5,
                "isComplete":false,
                "weight":40,
                "weightMetric":"KG",
                "previousWeight":50,
                "previousReps":10,
                "exerciseTime":30,
            },
          ]
        },
    ]
}

export default class Session extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionData: sessionData,
            timer: null,
            isCounting: false,
            isNote: true
        }
    }
    
    onComplete = (key, index, value) => {
        
        if (!this.state.isCounting) {
            
            clearInterval(this.state.timer);

            this.state.sessionData.exercises[0].sets[index].isComplete = true

            this.setState({
                progress: 100,
                time_limit: value,
                index: index
            })

            let timer = setInterval(() => {
                
                if ((this.state.progress) < (100/value)) {

                    this.setState({
                        progress: 0,
                        time_limit: value,
                        isCounting: false
                    })
                    
                    alert("Please go ahead to next exercise.");
                    clearInterval(this.state.timer);
    
                } else {
                    this.setState({
                        [key]: this.state[key] - 100/value,
                        time_limit: parseInt(this.state.time_limit, 10) - 1,
                        isCounting: true
                    });
                }
            }, 1000);
            this.setState({timer});

        }
    }

    renderExerciseItem(exerciseName, exerciseCount, item, index) {

        var previous = `Previous: ${item.previousWeight}${item.weightMetric} x ${item.previousReps}`;
        var stepExerciseLabel = `${index + 1}/${exerciseCount}`;

        return (
            <View style={{flexDirection: 'row', height: 190, marginTop: 10}}>
                <View style={[{width: 40, height: 40, borderRadius: 20, justifyContent: 'center'}, (item.isComplete) ? {backgroundColor: '#7DCD54'} : {backgroundColor: '#D3D3D3'}]}>
                    <Text style={[{fontSize: 18, textAlign: 'center'}, (item.isComplete) ? {color: 'white'} : {color: '#727272'}]}>{stepExerciseLabel}</Text>
                </View>
                <View style={{flex: 1, marginLeft: 15}}>
                    <View style={{height: 135, backgroundColor: '#4489DB', borderRadius: 5}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
                            <Text style={{flex: 1, fontSize: 20, color: 'white', marginLeft: 10}}>{exerciseName}</Text>
                            <Image source={ require('../../resources/ic_options.png') } style={{resizeMode: 'stretch', width: 30, height: 8, marginRight: 10}}/>
                        </View>
                        <View style={{flexDirection: 'row', height: 55, marginLeft: 10}}>
                            <View style={{width: 70}}>
                                <View style={styles.weightBg}>
                                    <Text style={styles.weightFont}>{item.weight}</Text>
                                </View>
                                <Text style={styles.label}>Weight</Text>
                            </View> 
                            <View style={{width: 70, marginLeft: 15}}>
                                <View style={styles.weightBg}>
                                    <Text style={styles.weightFont}>{item.repsRequired}</Text>
                                </View>
                                <Text style={styles.label}>Reps</Text>
                            </View>                               
                        </View>

                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: 150, height:20, backgroundColor: 'white', marginLeft: 10, marginTop: 8, borderRadius: 5, borderColor: 'black', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: "#4B4B4B"}}>{previous}</Text>
                            </View>

                            <TouchableOpacity style={{position: 'absolute', right: 10, bottom: 6}} onPress={this.onComplete.bind(this, 'progress', index, item.exerciseTime)}>
                                <Image source={ (item.isComplete) ? require('../../resources/ic_complete_check.png') : require('../../resources/ic_uncomplete_check.png') } style={{resizeMode: 'stretch', width: 33, height: 33, alignSelf: 'flex-end'}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                        <View style={[styles.viewBorder, {height: 50, backgroundColor: 'white', marginTop: 5, paddingLeft: 10, paddingRight: 10, alignItems: 'center', justifyContent: 'center'}]}>
                            <ProgressBarAnimated
                                width={deviceWidth - 105}
                                height={10}
                                // backgroundColor={(item.isComplete) ? "#D3D3D3" : "#148cF0"}
                                value={(this.state.index == index) ? this.state.progress : ((item.isComplete) ? 0 : 100)}
                            />

                            <View style={{width: 60, height:25, backgroundColor: 'white', borderRadius: 5, borderColor: 'black', borderWidth: 0.5, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
                                <Text style={[{fontWeight: 'bold'}, (item.isComplete) ? {color: '#7DCD54'} : {color: "#4489DB"}]}>{ (this.state.time_limit && this.state.index === index) ? sprintf("%02d:%02d", parseInt(this.state.time_limit / 60, 10), this.state.time_limit % 60): sprintf("%02d:%02d", parseInt(item.exerciseTime / 60, 10), item.exerciseTime % 60)}</Text>
                            </View>
                        </View>
                </View>
            </View>
        );
    }

    isShowDescription(status) {
        this.setState({
            isNote: !status
        })
    }

    render() {

        let exerciseName = this.state.sessionData.exercises[0].exerciseName
        let exerciseCount = this.state.sessionData.exercises[0].sets.length
        let createorId = this.state.sessionData.sessionCreatorName
        let description = this.state.sessionData.sessionDescriptions

        let exerciseList = this.state.sessionData.exercises[0].sets.map((item, index) => {
            return this.renderExerciseItem(exerciseName, exerciseCount, item, index);
        });  

        
        return (
            <View style={styles.container}>

                <View style={{flexDirection: 'row', alignItems: 'center', height: 60, width: deviceWidth, backgroundColor: 'white'}}>
                    <Image source={ require('../../resources/ic_timer.png') } style={{resizeMode: 'stretch', width: 20, height: 18, marginLeft: 15, marginTop: 15}}/>
                    <Text style={{flex: 1, fontSize: 22, marginLeft: 15, marginTop: 15}}>Session</Text>
                    <View style={[styles.weightBg, {height: 30, backgroundColor: '#7DCD54', paddingLeft: 10, paddingRight: 10, marginTop: 15, marginRight: 15}]}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>Finish</Text>
                    </View>
                </View>

                <View style={{height: 1, width: deviceWidth, backgroundColor: 'grey'}} />

                <ScrollView>
                    <View style={{flexDirection: 'row', alignItems: 'center', height: 50, width: deviceWidth - 30, marginTop: 10, marginLeft: 15, backgroundColor: '#4489DB', borderRadius: 5}}>
                        <Text style={{flex: 1, fontSize: 25, color: 'white', marginLeft: 10}}>Title Example</Text>
                        <Image source={ require('../../resources/ic_options.png') } style={{resizeMode: 'stretch', width: 30, height: 8, marginRight: 10}}/>
                    </View>

                    <View style={{width: deviceWidth - 30, marginLeft: 15}}>
                        {exerciseList}
                    </View>

                    <TouchableOpacity onPress={() => this.isShowDescription(this.state.isNote)}>
                        <View style={[styles.viewBorder, {width: deviceWidth - 30, marginLeft: 15}]}>
                            <View style={styles.subView}>
                                <Text style={styles.subViewTitle}>{createorId}</Text>
                                <Image source={ require('../../resources/ic_options1.png') } style={styles.contextMenu}/>
                            </View>
                            {(this.state.isNote) ? 
                                <Text style={{marginLeft: 10, color: '#434343', marginBottom: 10}}>{description}</Text>: null
                            }
                        </View>
                    </TouchableOpacity>

                    <View style={[styles.viewBorder, {width: deviceWidth - 30, marginLeft: 15}]}>
                        <View style={styles.subView}>
                            <Image source={ require('../../resources/ic_eye.png') } style={styles.imgEye}/>
                            <Text style={styles.subViewTitle}>Note</Text>
                            <Image source={ require('../../resources/ic_options1.png') } style={styles.contextMenu}/>
                        </View>
                    </View>

                    <View style={[styles.viewBorder, {width: deviceWidth - 30, marginLeft: 15}]}>
                        <View style={styles.subView}>
                            <Image source={ require('../../resources/ic_eye.png') } style={styles.imgEye}/>
                            <Text style={styles.subViewTitle}>Photo</Text>
                            <Image source={ require('../../resources/ic_options1.png') } style={styles.contextMenu}/>
                        </View>
                    </View>

                    <View style={[styles.viewBorder, {width: deviceWidth - 30, marginLeft: 15}]}>
                        <View style={styles.subView}>
                            <Image source={ require('../../resources/ic_eye.png') } style={styles.imgEye}/>
                            <Text style={styles.subViewTitle}>Video</Text>
                            <Image source={ require('../../resources/ic_options1.png') } style={styles.contextMenu}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    weightBg: {
        height: 35, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', justifyContent: 'center'
    },
    weightFont: {
        fontSize: 25, color: 'black', fontWeight: 'bold'
    },
    label: {
        color: 'white', fontSize: 12, marginTop: 3
    },
    viewBorder: {
        borderRadius: 5, borderWidth: 1, borderColor: '#4489DB', marginTop: 10
    },
    subView: {
        flexDirection: 'row', alignItems: 'center', height: 40
    },
    subViewTitle: {
        flex: 1, marginLeft: 10
    },
    imgEye: {
        resizeMode: 'stretch', width: 20, height: 20, marginLeft: 10
    },
    contextMenu: {
        resizeMode: 'stretch', width: 30, height: 8, marginRight: 10
    }

});

