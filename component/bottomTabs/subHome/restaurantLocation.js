import React, { Component } from 'react'
import{
    View,
    Text,
    Dimensions,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Clipboard,
    Share
}from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {
    Spinner,
    Tabs,
    Tab,
    ScrollableTab,
    InputGroup,
    Input,
    Toast,
    Header,
    Left,
    Body,
    Right,
}from 'native-base'
import Carousel from 'react-native-snap-carousel'
import LinearGradient from 'react-native-linear-gradient'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import {
    setRestaurantChoseID
} from '../../../redux/action/action'

import Colors from '../../../style/color'
import styleGlobal from '../../../style/styleGlobal'
import restaurantLocationService from '../../../service/restaurantLocation'
import { scrollView } from 'react-native-parallax-scroll-view/src/styles'

const colors = Colors
const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height

export class restaurantLocation extends Component {
    constructor(props){
        super(props)
        this.state={

            restauranRender : false,
            restaurantData : [],

            sLocation : this.props.sLocation,
            location : this.props.location
        }
    }

    componentDidMount(){
        this.getService()
    }
    getService = async() =>{
        this.setState({restauranRender : false})
        let service =  await restaurantLocationService(this.state.sLocation.entity_id,this.state.sLocation.entity_type)
        .then(async(res)=>{
            let data = JSON.parse(res)
            console.log('service render : ', data.length)
            this.setState({restaurantData : data},()=>{
                this.setState({restauranRender : true})
            })
        })
        
    }

    titleRender(){
        return(
            <View style={{paddingLeft : 10, paddingBottom  :10, paddingTop : 15}}>
                <View style={{flexDirection : 'row', width : ScreensWidh * 1}}>
                    <View style={{width : ScreensWidh * 45/100}}>
                        <Text style={{color:colors.primaryGrey, fontSize : 18, fontWeight : 'bold'}}>Near from You</Text>
                    </View>
                    <View style={{alignItems : 'flex-end',width : ScreensWidh * 50/100, justifyContent : 'center'}}>
                        {/* <TouchableOpacity 
                            onPress={()=>{console.log('menu pressed')}}
                            disabled = {!this.state.collectionRender}
                        >
                            <Text style={{color:colors.primaryOrange, fontSize : 14}}>See all</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </View>
        )
    }


    renderDumy(){
        let data = []
        for(let i =0;i<3;i++){
            data.push(
                <LinearGradient key={i} start={{x: 0, y:0}} colors={[colors.ligthGrey,colors.secondaryGrey]}  style={[styleGlobal.restaurantLocationDumyImage,{marginTop : 20}]}>
                    
                </LinearGradient>
            )
        }
        return data
    }
    dumyRender(){
        return(
            <View style={{justifyContent : 'center', alignItems : 'center'}}>
               {this.renderDumy()}
            </View>
        )
    }

    shareButton = async (index) =>{
        try {
        const result = await Share.share({
            message:
            'Hi there, Eatdah is using data from zomato \n\n'+
            this.state.restaurantData[index].restaurant.url
            
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

    goToRestaurant = async (index) =>{
        this.props.setRestaurantChoseID(this.state.restaurantData[index].restaurant.id)
        this.props.navigation.navigate('RestaurantChose')
    } 
    renderRestaurant(index){
        if(this.state.restaurantData[index].restaurant.featured_image !=''){
            return(
                <View>
                    <LinearGradient start={{x: 0, y:0}} colors={[colors.ligthGrey,colors.secondaryGrey]}  style={[styleGlobal.restaurantLocationDumy,{marginTop : 30}]}>
                        <TouchableOpacity onPress={()=>{this.goToRestaurant(index)}}>
                            <ImageBackground 
                            source={{uri : this.state.restaurantData[index].restaurant.featured_image}}
                            style={styleGlobal.restaurantLocationDumyImage}
                            >
                                <View style={{justifyContent : 'flex-start', alignItems : 'flex-end', paddingTop : 10}}>
                                    <View style={{backgroundColor : '#'+this.state.restaurantData[index].restaurant.user_rating.rating_color, borderRadius : 5, marginRight : 15}}>
                                        <Text style={{color : 'white', paddingVertical : 1, paddingHorizontal : 3, fontWeight  :'bold', fontSize : 18}}>{this.state.restaurantData[index].restaurant.user_rating.aggregate_rating}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={styleGlobal.restaurantLocationDescContainer}>
                        <View style={{paddingLeft : 10, paddingBottom : 15}}>
                            <View style={{flexDirection : 'row', paddingTop : 5}}>
                                <View style={{width : ScreensWidh *80/100}}>
                                    <Text style={[styleGlobal.titleH1Text,{color : colors.primaryGrey, fontSize : 20}]}>{this.state.restaurantData[index].restaurant.name}</Text>
                                </View>
                                <View style={{justifyContent : 'center'}}>
                                    <TouchableOpacity onPress={()=>{this.shareButton(index)}}>
                                        <Icons name={'share-alt'}color={colors.secondaryGrey} size={20} style={{paddingLeft : 10}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{width : ScreensWidh * 90/100}}>
                                <Text style={styleGlobal.restauranLocationDescUderTitleText}>{this.state.restaurantData[index].restaurant.cuisines}</Text>
                                <Text style={styleGlobal.restauranLocationDescUderTitleText}>{this.state.restaurantData[index].restaurant.location.address}</Text>
                                <View style={{flexDirection : 'row'}}>
                                    <Text style={styleGlobal.restauranLocationDescUderTitleText}>{this.state.restaurantData[index].restaurant.currency} </Text>
                                    <Text style={styleGlobal.restauranLocationDescUderTitleText}>{this.state.restaurantData[index].restaurant.average_cost_for_two} </Text>
                                    <Text style={styleGlobal.restauranLocationDescUderTitleText}>for two</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View>

                </View>
            )
        }
        
    }
    restaurantRender(){
        return(
            <View>
                <FlatList
                data={this.state.restaurantData}
                // LisHeaderComponent={
                //     <Text>{'My Title'}</Text>
                // }
                renderItem={({ item, index }) =>
                    <View>
                        {this.renderRestaurant(index)}
                    </View>
                }
                // ListFooterComponent={
                //     <View></View>
                // }
                keyExtractor={(item,index) => index.toString()}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{justifyContent : 'center', alignItems : 'center'}}
                initialNumToRender={5}
                />
            </View>
        )
    }

    render() {
        if(this.state.restauranRender){
            return (
                <View>
                    {this.titleRender()}
                    {this.restaurantRender()}
                    {this.restaurantRender()}
                </View>
            )
        }else{
            return(
                <View>
                    {this.titleRender()}
                    {this.dumyRender()}
                </View>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        // position : state.position,
        location : state.location,
        sLocation : state.sLocation
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setRestaurantChoseID : ( restaurantChoseID ) => {
            dispatch ( setRestaurantChoseID ( restaurantChoseID ) )
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(restaurantLocation)