import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableHighlightBase,
    ImageBackground,
    AsyncStorage,
    PermissionsAndroid,
    ScrollView,
    Modal,
    Linking,
    TouchableWithoutFeedback,
    Share
} from 'react-native'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
import GetLocation from 'react-native-get-location'
import {
    Spinner
}from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../style/color'
import {connect} from 'react-redux'
import {
    setLocation,
    setSLocation,
    setSNearbyRestaurant,
    setRestaurantReviewChose,
}from '../redux/action/action'
import RestaurantDumy from './restaurantDumy'
import zomatoLocation from '../service/zomatoLocation'
import restaurantDetail from '../service/restaurantDetail'
import restaurantReview from '../service/restaurantReview'

import Review from './subRestaurantChose/review'

// import ParallaxView from 'react-native-parallax-view'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import styleGlobal from '../style/styleGlobal'
import Icons from 'react-native-vector-icons/FontAwesome'

const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height
const colors = Colors

const d = new Date()

export class restaurantChose extends Component {
    constructor(props){
        super(props)
        this.state = {
            restaurantID : this.props.restaurantChoseID,
            restaurantRender : false,

            restaurantData : [],
            restaurantDataReview : [],
            reviewData : [],

            statusBar : {
                bg : 'transparent',
                bStyle : 'light-content',
                trans : true
            },

            hour : d.getHours()
        }
    }

    componentDidMount(){
        console.log('res id chose : ', this.state.restaurantID)
        this.getServiceRestaurant()
        console.log(this.state.hour)
    }
    getServiceRestaurant = async () =>{
        this.setState({restaurantRender : false})
        let restaurant  = await restaurantDetail(this.state.restaurantID)
        .then(async(res)=>{
            let hasil = await JSON.parse(res)
            console.log('resDetail render : ',hasil)
            this.setState({restaurantData : hasil},()=>{
                this.getServiceReview()
            })
        })
    }
    getServiceReview = async () =>{
        let review = await restaurantReview(this.state.restaurantID,30)
        .then(async(res)=>{
            // console.log(res)
            let aa = await JSON.parse(res)
            // console.log('review render : ',aa[0])
            this.setState({restaurantDataReview : aa},()=>{
                this.props.setRestaurantReviewChose(aa)
                setTimeout(()=>{
                    this.setState({restaurantRender : true})
                },1500 )
            })
        })
    }

    renderImageParallax () {
        return(
            <ParallaxScrollView
                    backgroundColor="rgba(255,255,255,0.2)"
                    parallaxHeaderHeight={ScreensHeight * 40/100}
                    renderForeground={()=>(
                        <View>
                            <Image 
                            style={{height : ScreensHeight * 40/100, width : ScreensWidh * 1,}}
                            source={{uri : this.state.restaurantData.featured_image}}/>
                        </View>
                    )}
                    onScroll={(event)=>{
                        let y = event.nativeEvent.contentOffset.y
                        // console.log(y)
                        let yy = parseInt(y)
                        if(yy  > 220){
                            // console.log('aa')
                            this.setState({statusBar : {
                                bg : 'white',
                                bStyle : 'dark-content',
                                trans : false
                            }})
                        }else{
                            this.setState({statusBar : {
                                bg : 'transparent',
                                bStyle : 'light-content',
                                trans : true
                            }})
                        }
                    }}
                    >
                    <View style={{flex : 1}}>
                        {this.renderTest()}
                        {this.renderBiasa()}
                        <Review data={this.state.restaurantDataReview}/>
                    </View>
            </ParallaxScrollView>
        )
    }

    LinkNav = () =>{
        Linking.canOpenURL('google.navigation:q='+this.state.restaurantData.location.latitude+'+'+this.state.restaurantData.location.longitude)
        .then((support)=>{
            if(support){
                Linking.openURL('google.navigation:q='+this.state.restaurantData.location.latitude+'+'+this.state.restaurantData.location.longitude)
            }else{
                console.warn('cant open google maps')
            }
        })
    }
    LinkShare = async () =>{
        try {
            const result = await Share.share({
                message:
                'Hi there, eatdah is using data from zomato \n\n'+
                'Thank for using eatdah, have a nice day \n\n'+
                this.state.restaurantData.url
                
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            } catch (error) {
            alert(error.message);
        }
    }
    midleBar(){
        return(
            <View style={{justifyContent  :'center', alignItems : 'center', paddingTop : 5}}>
                <View style={{width : ScreensWidh * 95/100,borderRadius : 10, backgroundColor : 'transparent', marginVertical : 10}}>
                    <View style={{flexDirection : 'row', paddingVertical : 10, justifyContent : 'center', alignItems  :'center'}}>
                        <TouchableOpacity 
                                style={styleGlobal.midleBarTouch}
                                onPress={()=>{Linking.openURL('tel:${'+this.state.restaurantData.phone_numbers+'}')}}>
                            <View style={styleGlobal.midleBar}>
                                <Icons name={'phone'} color={colors.primaryOrange} size={24}/>
                            </View>
                            <Text style={{paddingTop : 5, color : colors.secondaryGrey}}>Call</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity 
                                style={styleGlobal.midleBarTouch}
                                onPress={()=>{this.LinkNav()}}>
                            <View style={styleGlobal.midleBar}>
                                <Icons name={'map-o'} color={colors.primaryOrange} size={24}/>
                            </View>
                            <Text style={{paddingTop : 5, color : colors.secondaryGrey}}>Navigation</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity 
                                style={styleGlobal.midleBarTouch}
                                onPress={()=>{this.LinkShare()}}>
                            <View style={styleGlobal.midleBar}>
                                <Icons name={'share-square-o'} color={colors.primaryOrange} size={24}/>
                            </View>
                            <Text style={{paddingTop : 5, color : colors.secondaryGrey}}>Share</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity 
                                style={styleGlobal.midleBarTouch}
                                // onPress={()=>{this.componentDidMount()}}
                                >
                            <View style={styleGlobal.midleBar}>
                                <Icons name={'plus-square-o'} color={colors.primaryOrange} size={24}/>
                            </View>
                            <Text style={{paddingTop : 5, color : colors.secondaryGrey}}>Save</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    highlightsRender(){
        return(
            <View>
                <View style={{paddingLeft : 10}}>
                    <View style={{paddingTop : 20}}>
                        <Text style={[styleGlobal.titleH2Text,{color : colors.primaryGrey}]}>Highlights</Text>
                    </View>
                </View>
                <View style={{width : ScreensWidh*1, flexDirection : 'row', paddingLeft : 10, paddingTop : 20}}>
                    <View style={{width : ScreensWidh * 1/2, justifyContent : 'center', alignItems : 'flex-start'}}>
                        {this.state.restaurantData.highlights.map((item,index)=>{
                            if(index%2==0){
                                return(
                                    <View key={index}>
                                        <Text style={{paddingVertical  : 2, color : colors.primaryOrange}}>
                                            {this.state.restaurantData.highlights[index]}
                                        </Text>
                                    </View>
                                )
                            }
                        })}
                    </View>
                    <View style={{width : ScreensWidh * 1/2, justifyContent : 'center', alignItems : 'flex-start'}}>
                        {this.state.restaurantData.highlights.map((item,index)=>{
                            if(index%2!=0){
                                return(
                                    <View key={index}>
                                        <Text style={{paddingVertical  : 2, color : colors.primaryOrange}}>
                                            {this.state.restaurantData.highlights[index]}
                                        </Text>
                                    </View>
                                )
                            }
                        })}
                    </View>
                </View>
            </View>
        )
    }

    renderTest(){
        let star = Math.floor(this.state.restaurantData.user_rating.aggregate_rating)
        let renderStar = []
        for(let i =0;i<star;i++){
            renderStar.push(
                <View key={i} style={{paddingRight : 5}}>
                    <Icons name={'star'} color={colors.primaryOrange} size={20}/>
                </View>
            )
        }
        
        return(
            <View style={{paddingLeft : 10, flexDirection : 'row', paddingTop : 20}}>
                <View style={{width  :ScreensWidh * 60/100}}>
                    <View style={{flexDirection : 'row', paddingBottom : 5}}>
                        {renderStar}
                        <View style={{paddingHorizontal : 10}}><Text>{this.state.restaurantData.user_rating.aggregate_rating}</Text></View>
                        <View style={{}}>
                            <Text style={{color : colors.secondaryGrey}}>( {this.state.restaurantData.user_rating.votes} Review)</Text>
                        </View>
                    </View>
                    <LinearGradient 
                    start={{x: 1, y: 0}} end={{x: 0, y: 0}}
                    colors={[colors.primaryOrange,colors.secondaryOrange]} style={{marginRight : 10, marginVertical : 10}}>
                        <Text style={[styleGlobal.titleH1Text,{color : 'white', paddingLeft : 10}]}>{this.state.restaurantData.name}</Text>
                    </LinearGradient>
                    <View>
                        <Text style={{color : colors.primaryGrey}}>{this.state.restaurantData.cuisines}</Text>
                    </View>
                    <View>
                        <Text style={{color : colors.primaryGrey}}>{this.state.restaurantData.location.locality_verbose}</Text>
                    </View>
                    <View style={{flexDirection : 'row', paddingTop : 5}}>
                        <Text style={{color : colors.primaryGrey}}>Cost for two </Text>
                        <Text style={{color : colors.primaryGrey}}>{this.state.restaurantData.currency} </Text>
                        <Text style={{color : colors.primaryGrey}}>{this.state.restaurantData.average_cost_for_two} </Text>
                    </View>
                </View>
                <View style={{width : ScreensWidh*35/100, justifyContent : 'center', alignItems : 'center', backgroundColor : colors.ligthGrey}}>
                    <Text>mini map here</Text>
                </View>
            </View>
        )
    }

    renderBiasa(){
        return(
            <View>
                {this.midleBar()}
                <View style={{paddingLeft : 10}}>
                    <View style={{paddingTop : 20}}>
                        <Text style={[styleGlobal.titleH2Text,{color : colors.primaryGrey}]}>Address</Text>
                        <View style={{paddingVertical : 10}}>
                            <Text style={{color : colors.primaryGrey}}>{this.state.restaurantData.location.address}</Text>
                        </View>
                    </View>
                </View>
                {this.highlightsRender()}
            </View>
        )
    }

    render() {
        if(this.state.restaurantRender){
            return (
                <View style={{flex : 1,}}>
                    <StatusBar translucent={this.state.statusBar.trans} backgroundColor={this.state.statusBar.bg} barStyle={this.state.statusBar.bStyle}/>
                    {this.renderImageParallax()}
                </View>
            )
        }else{
            return(
                <View style={{flex : 1}}>
                    <RestaurantDumy/>
                </View>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        restaurantChoseID : state.restaurantChoseID,

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

        setRestaurantReviewChose : (restaurantReviewChose) =>{
            dispatch(setRestaurantReviewChose(restaurantReviewChose))
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(restaurantChose)
