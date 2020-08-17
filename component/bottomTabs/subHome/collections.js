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
import collectionService from '../../../service/collectionService'
import { scrollView } from 'react-native-parallax-scroll-view/src/styles'

import {
    setRestaurantChoseID
} from '../../../redux/action/action'

const colors = Colors
const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height

export class collections extends Component {
    constructor(props){
        super(props)
        this.state={
            collectionRender : false,
            collectionData : [],

            sLocation : this.props.sLocation,
            location : this.props.location
        }
    }

    componentDidMount(){
        this.getService()
    }
    getService = async() =>{
        this.setState({collectionRender : false})
        let service =  await collectionService(
            this.state.sLocation.city_id,
            this.state.location.lat,
            this.state.location.lon,
            6
        )
        .then(async(res)=>{
            let data = JSON.parse(res)
            console.log('service render : ', data.length)
            this.setState({collectionData : data},()=>{
                this.setState({collectionRender : true})
            })
        })
    }

    titleRender(){
        return(
            <View style={{paddingLeft : 10, paddingBottom  :10, paddingTop : 15}}>
                <View style={{flexDirection : 'row', width : ScreensWidh * 1}}>
                    <View style={{width : ScreensWidh * 45/100}}>
                        <Text style={{color:colors.primaryGrey, fontSize : 18, fontWeight : 'bold'}}>Collections this town</Text>
                    </View>
                    <View style={{alignItems : 'flex-end',width : ScreensWidh * 50/100, justifyContent : 'center'}}>
                        <TouchableOpacity 
                            onPress={()=>{console.log('menu pressed')}}
                            disabled = {!this.state.collectionRender}
                        >
                            <Text style={{color:colors.primaryOrange, fontSize : 14}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


    renderDumy(){
        let data = []
        for(let i =0;i<5;i++){
            data.push(
                <LinearGradient key={i} start={{x: 0, y:0}} colors={[colors.ligthGrey,colors.secondaryGrey]}  style={styleGlobal.collectionDumny}>
                    
                </LinearGradient>
            )
        }
        return data
    }
    dumyRender(){
        return(
            <View style={{flexDirection : 'row', paddingLeft : 10}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.renderDumy()}
                </ScrollView>
            </View>
        )
    }

    
    renderCollection(index){
        return(
            <View>
                <LinearGradient start={{x: 0, y:0}} colors={[colors.ligthGrey,colors.secondaryGrey]}  style={styleGlobal.collectionDumny}>
                    <ImageBackground 
                    source={{uri : this.state.collectionData[index].collection.image_url}}
                    style={styleGlobal.collectionDumny}
                    >
                        <TouchableOpacity onPress={()=>{console.log('restaurant Chose')}}>
                            <LinearGradient colors={['rgba(0,0,0,0.05)','rgba(0,0,0,0.6)']} style={styleGlobal.collectionDumny}>
                                <View style={{height : ScreensWidh * 10/100, width : ScreensWidh * 45/100,}}>

                                </View>
                                <View style={{justifyContent : 'flex-end',height : ScreensWidh * 60/100, width : ScreensWidh * 60/100,}}>
                                    <View style={{paddingLeft : 10, paddingBottom : 20}}>
                                        <Text style={{color : 'white'}}>{this.state.collectionData[index].collection.description}</Text>
                                        <Text style={[styleGlobal.titleH1Text,{color : 'white'}]}>{this.state.collectionData[index].collection.title}</Text>
                                        <Text style={{color : colors.secondaryGrey}}>{this.state.collectionData[index].collection.res_count} places</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ImageBackground>
                </LinearGradient>
            </View>
        )
    }
    collectionRender(){
        return(
            <View>
                <FlatList
                data={this.state.collectionData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <View>
                        {this.renderCollection(index)}
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

    render() {
        if(this.state.collectionRender){
            return (
                <View>
                    {this.titleRender()}
                    {this.collectionRender()}
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

export default connect(mapStateToProps, mapDispatchToProps)(collections)