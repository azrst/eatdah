import React, { Component } from 'react'
import{
    View,
    Text,
    Dimensions,
    FlatList,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground
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


import Colors from '../../../style/color'
import styleGlobal from '../../../style/styleGlobal'
import cuisinesMenuTown from '../../../service/cuisinesMenuTown'
import cuisinesRestaurant from '../../../service/cuisinesRestaurant'

import {
    setRestaurantChoseID,
    setCuisinesMenu
} from '../../../redux/action/action'


import {withNavigation} from '@react-navigation/native'
// import {withNavigation} from '@react-navigation/stack'

const colors = Colors
const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height

export class cuisines extends Component {
    constructor(props){
        super(props)
        this.state={
            cuisinesData : [],
            restaurantData : [],

            restaurantRender : false,
            menuRender : false,
            sLocation : this.props.sLocation,
            location : this.props.location
        }
    }

    componentDidMount(){
        // console.log('mount location : ',this.props.location)
        this.getServiceCuisines()
    }
    getServiceCuisines = async () =>{
        let cuisines = await cuisinesMenuTown(this.state.sLocation.city_id,this.state.location.lat,this.state.location.lon)
        .then(async(res)=>{
            let data = await JSON.parse(res)
            let dumy = data
            this.props.setCuisinesMenu(data)
            data.map((item,index)=>{
                if(index == 6){
                    dumy[index] = {
                        cuisine : {
                            cuisine_id : dumy[index].cuisine.cuisine_id,
                            cuisine_name : dumy[index].cuisine.cuisine_name,
                            bool : true
                        }
                    }
                }else{
                    dumy[index] = {
                        cuisine : {
                            cuisine_id : dumy[index].cuisine.cuisine_id,
                            cuisine_name : dumy[index].cuisine.cuisine_name,
                            bool : false
                        }
                    }
                }
            })
            this.setState({cuisinesData : dumy},()=>{
                console.log('render menu length : ',this.state.cuisinesData.length)
                this.setState({menuRender : true})
                this.getServiceCuisinesRestaurant(
                    this.state.cuisinesData[6].cuisine.cuisine_id
                )
            })
        })
    }
    getServiceCuisinesRestaurant = async (cuisinesId) =>{
        this.setState({restaurantRender : false})
        let cId = cuisinesId
        console.log('cId : ',cId)
        let restaurant  = await cuisinesRestaurant(
                this.state.sLocation.entity_id,
                this.state.sLocation.entity_type,
                this.state.location.lat,
                this.state.location.lon,
                cId
            )
        .then(async(res)=>{
            let data = await JSON.parse(res)
            // console.log('cuisines restaurant render : ', data[0].restaurant)
            // this.setState({restaurantData : data})
            // console.log('dari render res : ', data[0])
            this.setState({restaurantData : data},()=>{
                this.setState({restaurantRender : true})
            })
        })
    }

    titleRender(){
        return(
            <View style={{paddingLeft : 10, paddingBottom  :10, paddingTop : 20}}>
                <View style={{flexDirection : 'row', width : ScreensWidh * 1}}>
                    <View style={{width : ScreensWidh * 45/100}}>
                        <Text style={{color:colors.primaryGrey, fontSize : 18, fontWeight : 'bold'}}>Nearest Cuisines</Text>
                    </View>
                    <View style={{alignItems : 'flex-end',width : ScreensWidh * 50/100, justifyContent : 'center'}}>
                        <TouchableOpacity 
                            onPress={()=>{console.log('menu pressed')}}
                            disabled = {!this.state.menuRender}
                        >
                            <Text style={{color:colors.primaryOrange, fontSize : 14}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    menuSetFalse = (idx) =>{
        let dumy = this.state.cuisinesData
        this.state.cuisinesData.map((item,indexs)=>{
            if(dumy[indexs].cuisine.bool){
                dumy[indexs].cuisine.bool = false
            }
            if(indexs == this.state.cuisinesData.length-1){
                dumy[idx].cuisine.bool = true
            }
        })
        this.setState({cuisinesData : dumy},()=>{
            this.getServiceCuisinesRestaurant(this.state.cuisinesData[idx].cuisine.cuisine_id)
        })  
    }
    menuChossen = async (index) =>{
        this.menuSetFalse(index)
        console.log('menu chossen idx : ', index)
    }
    cuisinesMenuRender(){
        if(this.state.menuRender){
            return(
                <View style={{flexDirection : 'row', justifyContent  :'center',paddingLeft : 10}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.state.cuisinesData.map((item,index)=>{
                            if(this.state.cuisinesData[index].cuisine.bool){
                                return(
                                    <View style={{backgroundColor : colors.primaryOrange, borderRadius : 5, marginRight : 20}}>
                                        <Text style={{fontWeight : 'bold', paddingVertical : 5, paddingHorizontal: 5, color : 'white'}}>{this.state.cuisinesData[index].cuisine.cuisine_name}</Text>
                                    </View>
                                )
                            }else{
                                return(
                                    <View>
                                        <TouchableOpacity onPress={()=>{this.menuChossen(index)}}>
                                            <Text style={{paddingTop : 2, paddingRight : 20, color : colors.primaryOrange}}>{this.state.cuisinesData[index].cuisine.cuisine_name}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        })}
                    </ScrollView>
                </View>
            )
        }
    }

    goToRestaurant = async (index) =>{
        this.props.setRestaurantChoseID(this.state.restaurantData[index].restaurant.id)
        this.props.navigation.navigate('RestaurantChose')
    }   

    renderRestaurant(index){
        if(this.state.restaurantData[index].restaurant.thumb !=''){
            return(
                <View>
                    <View style={styleGlobal.cuisinesDumy}>
                        <ImageBackground source={{uri : this.state.restaurantData[index].restaurant.thumb}} style={styleGlobal.cuisinesDumy}>
                            <TouchableOpacity onPress={()=>{this.goToRestaurant(index)}}>
                                <LinearGradient 
                                // start={{x: 1, y: 0}} end={{x: 0, y: 0}}
                                colors={['rgba(0,0,0,0.05)','rgba(0,0,0,0.1)']} 
                                style={[styleGlobal.cuisinesDumy,{backgroundColor : 'rgba(255,255,255,0.1)'}]}
                                >
                                    
                                </LinearGradient>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styleGlobal.cuisinesDumyDesc}>
                        <View style={{paddingLeft : 5, paddingRight : 5}}>
                            <View>
                                <Text style={[styleGlobal.cuisinesTitleText,{height : ScreensHeight * 5.2/100}]}>{this.state.restaurantData[index].restaurant.name}</Text>
                            </View>
                            <View>
                                <Text style={[styleGlobal.cuisinesDescText,{height : ScreensHeight * 4/100}]}>{this.state.restaurantData[index].restaurant.location.locality}</Text>
                            </View>
                            <View style={{alignItems : 'flex-start', paddingRight : 5, paddingTop : 5, paddingBottom : 5, flexDirection : 'row'}}>
                                <View style={{backgroundColor : '#'+this.state.restaurantData[index].restaurant.user_rating.rating_color, borderRadius : 5, marginRight : 5}}>
                                    <Text style={{color : 'white', paddingVertical : 1, paddingHorizontal : 3, fontWeight  :'bold', fontSize : 12}}>{this.state.restaurantData[index].restaurant.user_rating.aggregate_rating}</Text>
                                </View>
                                <View>
                                    <Text style={[styleGlobal.cuisinesDescText,{color : colors.secondaryGrey}]}>({this.state.restaurantData[index].restaurant.user_rating.votes})</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View></View>
            )
        }
        
    }
    dataRender(){
        return(
            <View>
                {this.titleRender()}
                <View style={{height : ScreensHeight * 5/100, paddingLeft : 10}}>
                    {this.cuisinesMenuRender()}
                </View>
                
                <FlatList
                data={this.state.restaurantData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <View>
                        {this.renderRestaurant(index)}
                    </View>
                }
                keyExtractor={(item,index) => index.toString()}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{paddingLeft : 10, paddingTop : 5}}
                initialNumToRender={5}
                />

            </View>
        )
    }


    renderDumy(){
        let data = []
        for(let i=0;i<4;i++){
            data.push(
                <View>
                    <LinearGradient start={{x: 0, y:0}} colors={[colors.ligthGrey,colors.secondaryGrey]} style={styleGlobal.cuisinesDumy}></LinearGradient>
                    <View style={styleGlobal.cuisinesDumyDesc}>
                        <View style={{paddingLeft : 5}}>
                            <View>
                                <Text style={[styleGlobal.cuisinesTitleText,{height : ScreensHeight * 5/100}]}></Text>
                            </View>
                            <View>
                                <Text style={[styleGlobal.cuisinesDescText,{height : ScreensHeight * 4/100}]}></Text>
                            </View>
                            <View style={{alignItems : 'flex-start', paddingRight : 5, paddingTop : 5, paddingBottom : 5, flexDirection : 'row'}}>
                                {/* <View style={{backgroundColor : 'orange', borderRadius : 5, marginRight : 5}}>
                                    <Text style={{color : 'white', paddingVertical : 1, paddingHorizontal : 3, fontWeight  :'bold', fontSize : 12}}> </Text>
                                </View> */}
                                <View>
                                    <Text style={[styleGlobal.cuisinesDescText,{color : colors.secondaryGrey}]}>( )</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return data
    }
    dataDumyRender(){
        return(
            <View>
                {this.titleRender()}
                {this.cuisinesMenuRender()}
                <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
                    <View style={{flexDirection : 'row', paddingLeft : 10, paddingTop : 10}}>
                        {this.renderDumy()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    render() {
        if(this.state.restaurantRender == true){
            return (
                <View>
                    {this.dataRender()}
                </View>
            )
        }else if(this.state.restaurantRender == false){
            return(
                <View>
                    {this.dataDumyRender()}
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
        setCuisinesMenu  : (cuisinesMenu) =>{
            dispatch(setCuisinesMenu(cuisinesMenu))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(cuisines)
