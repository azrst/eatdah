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

export class splash extends Component {
    constructor(props){
        super(props)
        this.state = {
            lat : '',
            long : ''

        }
    }

    componentDidMount(){
        this.locationEnableCheck()
        // this.zomatoService()
    }

    locationEnableCheck = async () =>{
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval : 10000,fastInterval : 10000})
        .then(()=>{
            console.warn('gps on')
            this.getPhoneLocation()
        })
        .catch(()=>{
            this.locationEnableCheck()
        })
    }
    getPhoneLocation = async() =>{
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            title : 'Location Permission',
            message : 'eatdah need your location for finding nearest wonderful place',
            buttonNegative : 'Cancel',
            buttonPositive : 'OK'
        })
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
            console.warn('location active')
            GetLocation.getCurrentPosition({
                enableMediumAccuracy : true,
                timeout : 15000
            })
            .then(async(res)=>{
                console.log(res)
                let lat =  await res.latitude
                let lon = await res.longitude
                this.props.setLocation(
                    {
                        lat:res.latitude, 
                        lon:res.longitude
                    }
                )
                this.setState({
                    lat:res.latitude,   
                    lon:res.longitude
                },()=>{
                    this.zomatoService()
                })
            })
            .catch((error)=>{
                const {code,message} = error
                console.warn(code,message)
                this.getPhoneLocation()
            })
        }else{
            this.locationEnableCheck()
            console.warn('location denied')
        }
        
    }

    zomatoService = async () =>{
        const zLocation = await zomatoLocation(this.state.lat,this.state.lon)
        .then((res)=>{
            let data = JSON.parse(res)
            // console.log('res splash : ',data.location)
            // console.log('res restaurant : ',data.nearbyRestaurant)
            this.props.setSLocation(data.location)
            this.props.setSNearbyRestaurant(data.nearbyRestaurant)
        })

        this.endSpinner()
    }

    endSpinner = async () =>{
        let email = await AsyncStorage.getItem('emailUser')
        console.log('userEmail : ',email)
        if(email !=null){
            console.log('isi : ',email)
            this.props.navigation.replace('Homes')
        }else{
            console.log('kosong : ',email)
            this.props.navigation.replace('Login')
        }
    }

    render() {
        return (
            <View style={{flex : 1 , backgroundColor : 'white'}}>
                <StatusBar hidden={true} />
                <ImageBackground source={require('../image/splashBG.png')} style={{flex : 1}}>
                    <View style={{alignItems : 'center', justifyContent : 'center', height : ScreensHeight * 90/100}}>
                        {/* <Text>splash screen</Text> */}
                        <Image source = {require('../image/logo1.png')} style={{resizeMode : 'contain',width : ScreensWidh * 80/100, height : ScreensWidh * 80/100}}></Image>
                        <TouchableOpacity onPress={()=>{this.endSpinner()}}>
                            <Spinner color={colors.primaryOrange} />
                        </TouchableOpacity>
                        {/* <Text>sample dumy log</Text> */}
                    </View> 
                    <View style={{alignItems : 'center',justifyContent : 'flex-end',height : ScreensHeight * 10/100, backgroundColor : 'transparent',}}>
                        <View style={{flexDirection : 'row'}}>
                            <Text style={{color : colors.secondaryGrey}}>Demo App by </Text>
                            <Text style={{color : colors.primaryOrange}}>gihub.com/azrst</Text>
                        </View>
                    </View>
                </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(splash)
