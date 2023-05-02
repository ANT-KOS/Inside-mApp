import * as React from 'react';
import styles from '../../css/style.css';
import { Text, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Will call <DataLines x= y= z= />

export default class DataLines extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xData: [],
            yData: [],
            zData: [],
            min: Infinity,
            max: -Infinity,
            border: 0,
        }
    }

    findMin(arrX, arrY, arrZ) {
        for(let i=0, len = arrX.length ; i<len; i++){
            this.state.min = Math.min(this.state.min, arrX[i], arrY[i], arrZ[i]);
        }
    }
    
    findMax(arrX, arrY, arrZ) {
        for(let i=0, len = arrX.length ; i<len; i++){
            this.state.max = Math.max(this.state.max, arrX[i], arrY[i], arrZ[i]);
        }
    }

    updateData(){
        this.state.xData.push(this.props.x);
        this.state.yData.push(this.props.y);
        this.state.zData.push(this.props.z);


        this.findMin(this.state.xData, this.state.yData, this.state.zData)
        this.findMax(this.state.xData, this.state.yData, this.state.zData);

        this.state.border = Math.max(Math.abs(this.state.max), Math.abs(this.state.min));
    }

    render(){
        this.updateData();

        return(
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {this.props.label}
                    </Text>
                </View>
                <LineChart 
                    data={{
                        datasets:[
                            {
                                data: this.state.xData,
                                strokeWidth: 2,
                                withDots: false,
                                color: () => `rgb(255, 0, 0)`,
                            },
                            {
                                data: this.state.yData,
                                strokeWidth: 2,
                                withDots: false,
                                color: () => `rgb(0, 255, 0)`,
                            },
                            {
                                data: this.state.zData,
                                strokeWidth: 2,
                                withDots: false,
                                color: () => `rgb(0, 0, 255)`,
                            },
                            {
                                data: [this.state.border], //min
                                withDots: false,
                            },
                            {
                                data: [-this.state.border], //max
                                withDots: false,
                            }
                        ],
                        legend: ['x', 'y', 'z'],
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
        );
    }
}