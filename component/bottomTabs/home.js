import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    AsyncStorage,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native'
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
import Colors from '../../style/color'
import styleGlobal from '../../style/styleGlobal' 
import recomendedNear from '../../service/cuisinesMenuTown'
import TownMenu from './subHome/townMenu'
import Cuisines from './subHome/cuisines'
import Collections from './subHome/collections'
import RestaurantLocation from './subHome/restaurantLocation'


import {
    setRestaurantChoseID
} from '../../redux/action/action'
const colors = Colors
const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height

// const recomendedNear = RecomendedNear

export class home extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : this.props.sNearbyRestaurant,
            entries : [
                {
                    title : 'Ayam Bakar Pecicilan',
                    image : 'https://hdwallpaperim.com/wp-content/uploads/2017/08/31/164248-steak-748x499.jpg',
                    desc : 'sample address',
                    text1 : 'cost for two - Rp.sample'
                },
                {
                    title : 'Nasi Kulit titit',
                    image : 'https://c0.wallpaperflare.com/preview/111/581/300/food-steak-meat-soup.jpg',
                    desc : 'Jalan sample address, jakarta',
                    text1 : 'cost for two - Rp.sample'
                },
                {
                    title : 'Nasi Kulit Titit',
                    image : 'https://c0.wallpaperflare.com/preview/111/581/300/food-steak-meat-soup.jpg',
                    desc : 'sample description',
                },
            ]
        }   
    }

    componentDidMount(){
        // console.warn(recomendedNear)
        // console.warn(recomendedNear(2))
    }

    logOut=()=>{
        console.log('log out pressed')
        AsyncStorage.getItem('emailUser')
        .then(res=>{
            console.log('async useremail',res)
            AsyncStorage.removeItem('emailUser')
        })
        .then(()=>{
            this.props.navigation.replace('Login')
        })
        // AsyncStorage.setItem('emailUser','false')
    }
    headerRender(){
        return(
            <Header androidStatusBarColor={'white'} androidStatusBarStyle={'dark-content'} style={{backgroundColor : 'white' }}>
                <Left>
                    <Icons name={'map-marker'}color={colors.primaryOrange} size={25} style={{paddingLeft : 10}}/>
                </Left>
                <Body>
                    <Text style={styleGlobal.locationHeaderText}>{this.props.sLocation.title}, {this.props.sLocation.city_name}</Text>
                </Body>
                <Right>
                    <TouchableOpacity onPress={()=>{
                        this.logOut()
                    }}>
                        <Icons name={'user-circle-o'}color={colors.primaryGrey} size={30} style={{paddingRight : 10}}/>
                    </TouchableOpacity>
                </Right>
            </Header>
        )
    }

    goToRestaurant = async (index) =>{
        this.props.setRestaurantChoseID(this.state.data[index].restaurant.id)
        this.props.navigation.navigate('RestaurantChose')
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{elevation : 20}}>
                <ImageBackground source={{uri : this.state.data[index].restaurant.featured_image}} 
                style={{height  :ScreensHeight *26/100,width : ScreensWidh * 80/100,resizeMode : 'stretch'}}>
                    {/* <Text style={{backgroundColor : 'grey'}}>{ item.title }</Text> */}
                    <TouchableOpacity onPress={()=>{this.goToRestaurant(index)}}>
                        <LinearGradient 
                            start={{x: 1, y: 0}} end={{x: 0, y: 0}}
                            colors={['rgba(0,0,0,0.2)','rgba(0,0,0,0.8)']} style={{height  :ScreensHeight *26/100,width : ScreensWidh * 80/100}}>
                            <View style={{alignItems : 'flex-end', paddingRight : 20, paddingTop : 10}}>
                                <View style={{backgroundColor : '#'+this.state.data[index].restaurant.user_rating.rating_color, borderRadius : 5}}>
                                    <Text style={{color : 'white', paddingVertical : 3, paddingHorizontal : 6, fontWeight  :'bold', fontSize : 16}}>{this.state.data[index].restaurant.user_rating.aggregate_rating}</Text>
                                </View>
                            </View>
                            <View style={{paddingLeft : 10, paddingTop : 40}}>
                                <Text style={[styleGlobal.titleH2Text,{color : 'white'}]}>{this.state.data[index].restaurant.name}</Text>
                                <Text style={[styleGlobal.titleH3Text,{color : 'white'}]}>{this.state.data[index].restaurant.location.address}</Text>
                                <View style={{flexDirection : 'row'}}>
                                    <Text style={[styleGlobal.titleH3Text,{color : 'white'}]}>Average cost for two </Text>
                                    <Text style={[styleGlobal.titleH3Text,{color : 'white'}]}>{this.state.data[index].restaurant.currency} </Text>
                                    <Text style={[styleGlobal.titleH3Text,{color : 'white'}]}>{this.state.data[index].restaurant.average_cost_for_two}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </ImageBackground>
                
            </View>
        );
    }
    snapcarouselRender(){
        return(
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.data}
              renderItem={this._renderItem}
              sliderWidth={ScreensWidh * 1}
              itemWidth={ScreensWidh * 80/100}
              itemHeight={ScreensHeight * 1/2.5}
            //   initialScrollIndex={1}
            //   initialNumToRender={1}
              firstItem={1}
            
            />
        )
    }

    render() {
        return (
            <View style={{flex :1}}>
                {this.headerRender()}
                <StatusBar hidden={false} backgroundColor={'white'} barStyle={'dark-content'} />
                {/* <Text>home page</Text> */}

                <ParallaxScrollView
                    backgroundColor="rgba(255,255,255,0.2)"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={ScreensHeight * 38/100}
                    renderForeground={() => (
                        <View style={{backgroundColor : 'white'}}>
                            <View style={{paddingLeft : 10, paddingBottom  :10}}>
                                <Text style={styleGlobal.titleH1Text}>Recomended</Text>
                                <Text style={{color:colors.primaryGrey}}>Always best place near you</Text>
                            </View>
                            {this.snapcarouselRender()}
                        </View>
                    )}>
                
                    <View style={{flex  :1}}>
                        <TownMenu/>
                        <Cuisines navigation={this.props.navigation}/>
                        <View style={{paddingTop : 20}}>
                            <Collections/>
                        </View>
                        <SafeAreaView style={{flex : 1, backgroundColor : 'white'}}>
                            <View>
                                <RestaurantLocation navigation={this.props.navigation}/>
                            </View>
                        </SafeAreaView>
                        <View style={{paddingTop  :50}}></View>
                    </View>
                </ParallaxScrollView>
                
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        // position : state.position,
        sLocation : state.sLocation,

        sNearbyRestaurant : state.sNearbyRestaurant,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        setRestaurantChoseID : ( restaurantChoseID ) => {
            dispatch ( setRestaurantChoseID ( restaurantChoseID ) )
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(home)
