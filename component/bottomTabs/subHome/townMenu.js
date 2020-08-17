import React, { Component } from 'react'
import{
    View,
    Text,
    Dimensions,
    FlatList,
    ScrollView,
    Image
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


const colors = Colors
const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height

export class townMenu extends Component {
    constructor(props){
        super(props)
        this.state={

            data : [
                {
                    title : 'Scan QR Code',
                    desc : 'you can scan qr code for access anything',
                    image : '',
                },
                {
                    title : 'Place your Orders',
                    desc : 'this is sample description for another',
                    image : '',
                },
                {
                    title : 'Pay to Check Out',
                    desc : 'free sample text',
                    image : '',
                },
            ]

        }
    }

    townMenuListRender(){
        return(
            <FlatList
                data={this.state.data}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) =>
                    <View style={{flexDirection : 'row', marginRight : 5, borderRadius : 5, backgroundColor  :colors.ligthGrey, }}>
                        <View style={{width : ScreensWidh * 40/100, paddingLeft : 10, paddingBottom : 5, paddingTop : 10}}>
                            <Text style={[styleGlobal.titleTownMenu,{}]}>{item.title}</Text>
                            <Text style={{color : colors.primaryGrey}}>{item.desc}</Text>    
                        </View>
                        <View style={{width : ScreensWidh * 20/100, justifyContent : 'flex-end',alignItems : 'flex-end', paddingLeft : 10, backgroundColor : 'grey'}}>
                            <Image source={require('../../../image/logo1.png')} style={{width : ScreensWidh * 20/100,height : ScreensWidh * 30/100,resizeMode:'contain'}}/>
                        </View>
                    </View>
                }
                keyExtractor={(item,index) => index.toString()}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{paddingLeft : 10, paddingTop : 5}} 
            />
        )
    }

    render() {
        return (
            <View>
                <View style={{paddingLeft : 10}}>
                    <LinearGradient start={{x: 0, y: 0}} colors={[colors.primaryOrange,colors.secondaryOrange]} style={styleGlobal.townMenuHeader}>
                        <Text style={styleGlobal.townMenuHeaderText}>Will help you more than anything</Text>
                    </LinearGradient>
                </View>
                <View>
                    {this.townMenuListRender()}
                </View>
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
        // setLocation : ( Location ) => {
        //     dispatch ( setLocation ( Location ) )
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(townMenu)
