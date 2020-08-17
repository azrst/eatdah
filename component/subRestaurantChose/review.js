import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Dimensions,
    Image,
    FlatList,
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
    Spinner,
    Thumbnail,
}from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import {connect} from 'react-redux'
import Icons from 'react-native-vector-icons/FontAwesome'

import Colors from '../../style/color'
import styleGlobal from '../../style/styleGlobal'

const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height
const colors = Colors

export class Review extends Component {
    constructor(props){
        super(props)
        this.state = {
            reviewData : this.props.data,
            reviewDataText : JSON.stringify(this.props.data)
        }
    }

    componentDidMount(){
        console.log(this.state.reviewData)
    }

    renderReview(index){
        let starFill = this.state.reviewData[index].review.rating
        let starEmpty = 5-this.state.reviewData[index].review.rating
        let renderFill=[]
        let renderEmpty=[]
        for(let i=0;i<starFill;i++){
            renderFill.push(
                <View key={i}>
                    <Icons name={'star'} size={18} color={colors.primaryOrange}/>
                </View>
            )
        }
        for(let i=0;i<starEmpty;i++){
            renderEmpty.push(
                <View key={i}>
                    <Icons name={'star-o'} size={18} color={colors.primaryOrange}/>
                </View>
            )
        }
        // if(this.state.reviewData[index].review.review_text != ''){
            return(
                <View style={styleGlobal.reviewContainer}>
                    <View>
                        <View style={{flexDirection : 'row'}}>
                            <View>
                                <TouchableOpacity
                                    onPress={()=>{console.log('ava pressed')}}
                                >
                                    <Thumbnail source={{ uri: this.state.reviewData[index].review.user.profile_image }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingLeft : 15, width : ScreensWidh * 40/100}}>
                                <View>
                                    <Text style={[{color : colors.primaryOrange,fontSize : 18, fontWeight : 'bold'}]}>
                                        {this.state.reviewData[index].review.user.name}
                                    </Text>
                                    <View style={{flexDirection : 'row'}}>
                                        <Text style={{color : colors.primaryGrey}}>Level </Text>
                                        <Text style={{color : colors.primaryGrey}}>{this.state.reviewData[index].review.user.foodie_level} </Text>
                                        <Text style={{color : colors.primaryGrey}}>({this.state.reviewData[index].review.user.foodie_level_num}) </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{width : ScreensWidh * 30/100, justifyContent : 'center', paddingLeft : 20}}>
                                <View style={{flexDirection : 'row'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        {renderFill}
                                    </View>
                                    <View style={{flexDirection : 'row'}}>
                                        {renderEmpty}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[styleGlobal.titleH2Text,{color : colors.primaryGrey, paddingTop : 10}]}>{this.state.reviewData[index].review.rating_text}</Text>
                        <Text style={{color : colors.primaryGrey, paddingTop : 10}}>{this.state.reviewData[index].review.review_text}</Text>
                        <Text style={{color : colors.secondaryGrey, paddingTop : 10}}>{this.state.reviewData[index].review.review_time_friendly}</Text>
                    </View>
                    {/* <Text>asuw</Text> */}
                </View>
            )
        // }
    } 

    render() {
        return (
            <View>
                <FlatList
                data={this.state.reviewData}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>
                    <View style={{width  :ScreensWidh * 95/100, justifyContent : 'center', alignItems : 'center'}}>
                        {this.renderReview(index)}
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
}

function mapStateToProps(state) {
    return {
        // restaurantChoseID : state.restaurantChoseID,

        // restaurantReviewChose : state.restaurantReviewChose

    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setLocation : ( Location ) => {
        //     dispatch ( setLocation ( Location ) )
        // },
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
