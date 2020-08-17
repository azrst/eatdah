import {
    StyleSheet,
    Dimensions,
}from 'react-native'
import Colors from './color'

const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height
const colors = Colors

export default StyleSheet.create({

    reviewContainer : {
        width  :ScreensWidh * 95/100,
        paddingVertical : 15,
        paddingHorizontal : 20,
        marginBottom : 20,
        backgroundColor : 'white',
        borderRadius : 10,
        elevation : 2
    },
    midleBarTouch : {
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 10
    },
    midleBar : {
        width : ScreensWidh* 15/100,
        height : ScreensWidh* 15/100,
        justifyContent  :'center', 
        alignItems : 'center', 
        backgroundColor : 'white',
        borderRadius : 100,
        elevation : 2
    },
    restauranLocationDescUderTitleText : {
        color : colors.primaryGrey,
        fontSize : 14
    },
    restaurantLocationDescContainer : {
        borderBottomWidth : 0.5,
        borderLeftWidth :   0.5,
        borderRightWidth :  0.5, 
        borderColor : colors.secondaryGrey, 
        borderBottomRightRadius : 5,
        borderBottomLeftRadius : 5,
    },
    restaurantLocationDumyImage:{
        height : ScreensHeight * 25/100,
        width : ScreensWidh * 95/100,
        // backgroundColor : 'grey'
        // marginRight : 10
    },
    restaurantLocationDumy:{
        height : ScreensHeight * 25/100,
        width : ScreensWidh * 95/100,
        borderRadius : 10,
        // paddingTop : 20,
        // backgroundColor : 'grey'
        // marginRight : 10
    },
    collectionDumny : {
        height : ScreensWidh * 70/100,
        width : ScreensWidh * 70/100,
        borderRadius : 10,
        marginRight : 10
    },
    cuisinesTitleText : {
        fontSize : 16,
        fontWeight : 'bold',
        color : colors.primaryGrey
    },
    cuisinesDescText : {
        fontSize : 12,
        color : colors.primaryGrey
    },
    cuisinesDumyDesc : {
        width : ScreensWidh * 30/100,
        borderBottomRightRadius : 10,
        borderBottomLeftRadius : 10,
        marginRight : 10,
        backgroundColor : colors.ligthGrey
    },
    cuisinesDumy : {
        height : ScreensHeight * 15/100,
        width : ScreensWidh * 30/100,
        marginRight : 10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10
    },
    townMenuHeader : {
        width : ScreensWidh *1,
        // backgroundColor : colors.primaryOrange,
        borderTopLeftRadius : 10
    },
    townMenuHeaderText : {
        paddingVertical : 5,
        paddingLeft : 10,
        color : 'white',
        fontWeight : 'bold'
    },
    locationHeaderText : {
        color : colors.primaryGrey,
        fontWeight : 'bold',
        fontSize : 18,
    },
    loginAuthCover : {
        width : ScreensWidh * 90/100,
        justifyContent : 'center',
        alignItems : 'center',
        paddingBottom : 40
    },
    loginBtnCover : {
        width: ScreensWidh * 50/100, 
        alignItems : 'center',
        justifyContent : 'center', 
        flexDirection : 'row',
    },
    loginAuthButton : {
        width : ScreensWidh * 10/100,
        backgroundColor : 'white',
        elevation : 2,
        borderRadius : 20,
        justifyContent : 'center',
        alignItems :'center',
        paddingVertical : 20,
        marginVertical : 5,
        marginHorizontal : 10
    },
    loginButtonCover : {
        width:ScreensWidh * 80/100,
        alignItems : 'flex-end',
        justifyContent : 'center',
        // backgroundColor : 'grey',
        paddingVertical : 25
    },
    loginButton : {
        borderRadius : 25,
        elevation : 3
    },
    loginButtonText : {
        marginVertical : 10,
        marginHorizontal : 30,
        color : 'white',
        fontSize: 25,
        fontWeight : "bold"
    },
    titleLogin : {
        alignSelf : 'flex-start', 
        paddingLeft : ScreensWidh * 3/100,
        paddingBottom : 20,
    },
    titleLogin2 : {
        alignSelf : 'flex-start', 
        paddingLeft : ScreensWidh * 3/100,
        paddingBottom : 20,
    },
    titleLoginText : {
        fontSize : 30,
        fontWeight  :'bold',
        color : colors.primaryGrey
    },
    titleH1Text : {
        fontSize : 26,
        fontWeight  :'bold',
        // color : colors.primaryGrey
    },
    titleH2Text : {
        fontSize : 22,
        fontWeight  :'bold',
        // color : colors.primaryGrey
    },
    titleTownMenu : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    titleH3Text : {
        fontSize : 12,
    },
    logoLoginCover : {
        backgroundColor : 'white',
        borderRadius : 25,
        elevation:5
    },
    loginCover : {
        width : ScreensWidh * 90/100,
        // height : ScreensHeight * 25/100,
        backgroundColor : 'white',
        alignItems : 'center',
        paddingBottom : 20,
        borderRadius : 10,
        elevation : 2
    },
    textInputCover : {
        width : ScreensWidh * 80/100,
        height : ScreensHeight * 8/100,
        // backgroundColor : 'white',
        // borderRadius : 15,
        borderBottomWidth : 1,
        // elevation : 5,
        marginBottom : 7,
        borderColor : colors.secondaryGrey,
        justifyContent: 'center',
    },

})