import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage,
    PermissionsAndroid
} from 'react-native'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
import GetLocation from 'react-native-get-location'
import {
    Spinner
}from 'native-base'
import Colors from '../style/color'
import {connect} from 'react-redux'
import {
    setLocation,
    setSLocation,
    setSNearbyRestaurant
}from '../redux/action/action'

import zomatoLocation from '../service/zomatoLocation'

const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height
const colors = Colors

export class restaurantDumy extends Component {
    constructor(props){
        super(props)
        this.state = {
            

        }
    }

    render() {
        return (
            <View style={{flex : 1, backgroundColor : 'white'}}>
            <StatusBar backgroundColor="white" barStyle={'light-content'}/>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 1,
                    height : ScreensHeight * 25/100,
                    }}>
                </View>
                <View style={{flexDirection : 'row', paddingTop : 20}}>
                    <View style={{
                        backgroundColor : colors.ligthGrey,
                        width : ScreensWidh * 40/100,
                        height : ScreensHeight * 3/100,
                        borderRadius : 5,
                        marginLeft : 20
                    }}></View>
                    <View style={{
                        backgroundColor : colors.ligthGrey,
                        width : ScreensWidh * 40/100,
                        height : ScreensHeight * 3/100,
                        borderRadius : 5,
                        marginLeft : 20
                    }}></View>
                </View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 70/100,
                    height : ScreensHeight * 3/100,
                    borderRadius : 5,
                    marginLeft : 20,
                    marginTop : 10
                }}></View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 60/100,
                    height : ScreensHeight * 3/100,
                    borderRadius : 5,
                    marginLeft : 20,
                    marginTop : 10
                }}></View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 60/100,
                    height : ScreensHeight * 3/100,
                    borderRadius : 5,
                    marginLeft : 20,
                    marginTop : 10
                }}></View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 100/100,
                    height : ScreensHeight * 0.5/100,
                    marginTop : 20
                }}></View>
                <View style={{width : ScreensWidh * 100/100,flexDirection : 'row'}}>
                    <View style={{width : ScreensWidh * 25/100, alignItems : 'center'}}>
                        <View style={{
                            width : ScreensWidh * 13/100,
                            height : ScreensWidh * 13/100,
                            backgroundColor  : colors.ligthGrey,
                            marginVertical  : 15,
                            borderRadius : 50
                        }}>
                        </View>
                    </View>
                    <View style={{width : ScreensWidh * 25/100, alignItems : 'center'}}>
                        <View style={{
                            width : ScreensWidh * 13/100,
                            height : ScreensWidh * 13/100,
                            backgroundColor  : colors.ligthGrey,
                            marginVertical  : 15,
                            borderRadius : 50
                        }}>
                        </View>
                    </View>
                    <View style={{width : ScreensWidh * 25/100, alignItems : 'center'}}>
                        <View style={{
                            width : ScreensWidh * 13/100,
                            height : ScreensWidh * 13/100,
                            backgroundColor  : colors.ligthGrey,
                            marginVertical  : 15,
                            borderRadius : 50
                        }}>
                        </View>
                    </View>
                    <View style={{width : ScreensWidh * 25/100, alignItems : 'center'}}>
                        <View style={{
                            width : ScreensWidh * 13/100,
                            height : ScreensWidh * 13/100,
                            backgroundColor  : colors.ligthGrey,
                            marginVertical  : 15,
                            borderRadius : 50
                        }}>
                        </View>
                    </View>
                </View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 100/100,
                    height : ScreensHeight * 0.5/100,
                }}></View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 70/100,
                    height : ScreensHeight * 3/100,
                    borderRadius : 5,
                    marginLeft : 20,
                    marginTop : 10
                }}></View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 60/100,
                    height : ScreensHeight * 3/100,
                    borderRadius : 5,
                    marginLeft : 20,
                    marginTop : 10
                }}></View>
                <View style={{
                    backgroundColor : colors.ligthGrey,
                    width : ScreensWidh * 60/100,
                    height : ScreensHeight * 3/100,
                    borderRadius : 5,
                    marginLeft : 20,
                    marginTop : 10
                }}></View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        // position : state.position,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLocation : ( Location ) => {
            dispatch ( setLocation ( Location ) )
        },
        setSLocation : (sLocation) =>{
            dispatch (setSLocation (sLocation) )
        },
        setSNearbyRestaurant : (sNearbyRestaurant) =>{
            dispatch (setSNearbyRestaurant (sNearbyRestaurant) )
        },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(restaurantDumy)
