import React, { useState, useEffect } from "react";
import styles from "../../css/style.css";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";

import { Accelerometer } from "expo-sensors";
import { filter, dotProduct } from "../utils/utilities";
import { LineChart } from 'react-native-chart-kit';

const hzMapping = {
    0: 0.0000000001,
    1: 1,
    2: 5,
    3: 10,
    4: 20,
    5: 50,
};

let tempData=[];
const DATASET_LENGTH = 19;


let AccelerometerApp = (props) => {
    //Accelerometer State variables 
    const [filteredData, setFilteredData] = useState([]);
    const [accel1D] = useState([]);
    const [freqValue, setFreqValue] = useState(0);
    const [accelCount, setAccelCount] = useState(0);

    const [started, setStarted] = useState(false);

    //Frequency Handler
    const handleValueChange = (value) => {
        let realValue = hzMapping[value];
        setFreqValue(realValue);
        let v = parseInt(1000.0 / parseFloat(realValue));
        Accelerometer.setUpdateInterval(v);
    };

    useEffect(() => {
        Accelerometer.removeAllListeners()
        if(!started) {
            setAvailable(Accelerometer.isAvailableAsync());
            setStarted(true);
            handleValueChange("0");
        }
        Accelerometer.addListener(accelerometerData => {
            setAccelCount(accelCount + 1);
            tempData.push({
              "data": accelerometerData,  // {x: Number, y: Number, z: Number}
              "timestamp": Date.now(),    // Number 
            });  
            
            if(accelCount === DATASET_LENGTH){
              setFilteredData(filter(tempData, {type: "lowPass", freq: 0}));
              for(let i in filteredData){
                accel1D.push(dotProduct(filteredData[i][0], filteredData[i][1]));
              }
              setGraphData(accel1D.splice(-100));
              tempData = [];
              setAccelCount(0);
            }            
        })
        return () => Accelerometer.removeAllListeners();
    }, [tempData]);

    return(
        <View>
            <View>
                <View style={styles.titleContainer}>
                    <View style={styles.counter}>
                        <Text style={styles.counterText}>{accelCount}</Text>
                    </View>
                    <Text style={styles.title}>
                        ACCELEROMETER
                    </Text>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.text}>{freqValue} Hz</Text>  
                    <Slider 
                        style={{width: "100%", height: 10}}
                        minimumValue={0}
                        maximumValue={5}
                        value={0}
                        minimumTrackTintColor="#344763"
                        maximumTrackTintColor="#000"
                        flex={4}
                        step={1}
                        onSlidingComplete={handleValueChange}
                    />
                </View>
                <View style={{marginVertical: 10}}>
                <LineChart 
                    data={{
                        datasets:[
                            {
                                data: tempData.data.x,
                                strokeWidth: 2,
                                withDots: false,
                                color: () => `rgb(255, 0, 0)`,
                            },
                            {
                                data: -5, //min
                                withDots: false,
                            },
                            {
                                data: 5, //max
                                withDots: false,
                            }
                        ],
                        legend: ['accel1D'],
                    }}
                    width={Dimensions.get('window').width}
                    height={350}
                    withShadow={false}
                    chartConfig={{
                        backgroundGradientFrom: "#081f41",
                        backgroundGradientTo: "#081f41",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    style={{
                        marginHorizontal: 10,
                    }}
                    bezier
                    fromZero={true}
                />
                </View>
            </View>
        </View>
    );
}