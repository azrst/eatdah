import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableHighlight,
    Alert
} from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'
import {connect} from 'react-redux'
import {
    setLocation,
}from '../redux/action/action'
import {
    Spinner,
    Tabs,
    Tab,
    ScrollableTab,
    InputGroup,
    Input,
    Toast,
}from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import Colors from '../style/color'
import styleGlobal from '../style/styleGlobal'
const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height
const colors = Colors

export class signUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            username : '',
            firstname : '',
            lastname : '',
            password : '',
            repassword : '',

            toastText : '',

            hidePassword : true,
            registerButton : false,
        }
    }

    registerValidate = () =>{
        if(this.state.email == ''){
            Toast.show({
                text : 'Email must be field', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }
        else if(this.state.username == ''){
            Toast.show({
                text : 'Username must be field', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }
        else if(this.state.firstname == ''){
            Toast.show({
                text : 'Firstname must be field', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }
        else if(this.state.lastname == ''){
            Toast.show({
                text : 'Lastname be field', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }
        else if(this.state.password == ''){
            Toast.show({
                text : 'Password must be field', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }
        else if(this.state.password.length < 6){
            Toast.show({
                text : 'Password length must be greater than 6', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }
        else if(this.state.repassword != this.state.password){
            Toast.show({
                text : 'Password not match', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }else{
            this.registerHit()
        }
    }
    registerHit = () =>{
        console.log('masuk regis hit')
        this.setState({registerButton : true})
        auth().createUserWithEmailAndPassword(this.state.email,this.state.repassword)
        .then((res)=>{
            console.log('masuk regis success')
            console.log(res)
            this.setState({registerButton : false},()=>{
                this.props.navigation.navigate('Login')
            })
        })
        .catch((error)=>{
            console.log('masuk regis fail')
            console.log(error)
            Alert.alert('warning',error.code)
            this.setState({registerButton : false})
        })
    }

    // ================================================================================================================================================
    // ================================================================================================================================================
    // ================================================================================================================================================
    // ================================================================================================================================================

    registerTextInputRender(){
        let iconType = ''
        let iconColor = ''
        if(this.state.hidePassword == true){
            iconType = 'eye'
            iconColor = colors.primaryGrey
        }else{
            iconType = 'eye-slash'
            iconColor = colors.lightBlue
        }
        return(
            <View>
                <View style={styleGlobal.titleLogin}>
                    <Text style={styleGlobal.titleLoginText}>Sign Up</Text>
                    <Text style={{color:colors.secondaryGrey}}>Please sign Up to create account</Text>
                </View>
                <View style={styleGlobal.loginCover}>
                    <View style={styleGlobal.textInputCover}>
                        <TextInput
                            placeholder={'email'}
                            keyboardType ={"email-address"}
                            value={this.state.email}
                            onChangeText={(value)=>{this.setState({email : value})}}
                        >

                        </TextInput>
                    </View>
                    <View style={styleGlobal.textInputCover}>
                        <TextInput
                            placeholder={'username'}
                            value={this.state.username}
                            onChangeText={(value)=>{this.setState({username : value})}}
                        >

                        </TextInput>
                    </View>
                    <View style={styleGlobal.textInputCover}>
                        <TextInput
                            placeholder={'First Name'}
                            value={this.state.firstname}
                            onChangeText={(value)=>{this.setState({firstname : value})}}
                        >

                        </TextInput>
                    </View>
                    <View style={styleGlobal.textInputCover}>
                        <TextInput
                            placeholder={'Last Name'}
                            value={this.state.lastname}
                            onChangeText={(value)=>{this.setState({lastname : value})}}
                        >

                        </TextInput>
                    </View>
                    <View style={styleGlobal.textInputCover}>
                        <View style={{flexDirection : 'row'}}>
                            <View style={{alignSelf : 'flex-start'}}>
                                <TextInput
                                    style={{width : ScreensWidh*70/100}}
                                    placeholder={'password'}
                                    secureTextEntry={this.state.hidePassword}
                                    value={this.state.password}
                                    onChangeText={(value)=>{this.setState({password : value})}}
                                >  
                                </TextInput>
                            </View>
                            <View style={{alignSelf:'center'}}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        if(this.state.hidePassword){
                                            this.setState({hidePassword : false})
                                        }else{
                                            this.setState({hidePassword : true})
                                        }
                                    }}
                                >
                                    <Icons name={iconType} size={28} color={iconColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styleGlobal.textInputCover}>
                        <View style={{flexDirection : 'row'}}>
                            <View style={{alignSelf : 'flex-start'}}>
                                <TextInput
                                    style={{width : ScreensWidh*70/100}}
                                    placeholder={'repassword'}
                                    secureTextEntry={this.state.hidePassword}
                                    value={this.state.repassword}
                                    onChangeText={(value)=>{this.setState({repassword : value})}}
                                >  
                                </TextInput>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    registerButtonRender(){
        return(
            <View style={styleGlobal.loginButtonCover}>
                <TouchableHighlight 
                    onPress={()=>{this.registerValidate()}}
                    disabled={this.state.registerButton}>
                    <LinearGradient start={{x: 0, y: 0}} colors={[colors.secondaryOrange,colors.primaryOrange]} style={styleGlobal.loginButton}>
                        <Text style={styleGlobal.loginButtonText}> Register </Text>
                        {/* <Spinner color={'white'} size={20}/> */}
                    </LinearGradient>
                </TouchableHighlight>
            </View>
        )
    }

    googleFacebookLoginRender(){
        return(
            <View style={{alignItems : 'center'}}>
                <Text style={{color : colors.primaryGrey}}>Or Sign Up with</Text>
                <View style={styleGlobal.loginAuthCover}>
                    <View style={styleGlobal.loginBtnCover}>
                        <View style={styleGlobal.loginAuthButton}>
                            {/* <Text>Facebook</Text> */}
                        </View>
                        <View style={styleGlobal.loginAuthButton}>
                            {/* <Text>Facebook</Text> */}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    signUpRender(){
        return(
            <View style={{flexDirection : 'row'}}>
                <Text style={{color: colors.primaryGrey}}>Dont have Account? </Text>
                <TouchableOpacity onPress={()=>{console.log('pressed')}}>
                    <Text style={{color : colors.primaryOrange, fontWeight : 'bold'}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{height : ScreensHeight * 1,backgroundColor:'white',flex : 1}}>
                    <ScrollView>
                        <StatusBar backgroundColor={colors.secondaryGrey}></StatusBar>
                        <KeyboardAvoidingView style={{marginTop  :20}}>
                        <View style={{height : ScreensHeight * 100/100,justifyContent : 'flex-start', alignItems : 'center', width : ScreensWidh*1}}>
                            {this.registerTextInputRender()}
                            <View>
                                {this.registerButtonRender()}
                            </View>
                            <View>
                                {/* {this.googleFacebookLoginRender()} */}
                            </View>
                        </View>
                        
                        </KeyboardAvoidingView>
                    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(signUp)
