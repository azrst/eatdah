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
    Alert,
    AsyncStorage
} from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome'
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
    Toast
}from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import auth from '@react-native-firebase/auth'
import Colors from '../style/color'
// import {connect} from 'react-redux'
import styleGlobal from '../style/styleGlobal'
const ScreensWidh = Dimensions.get('window').width
const ScreensHeight = Dimensions.get('window').height
const colors = Colors

export class login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            hidePassword : true,

            loginButton : false,

        }
    }

    loginValidate = ()=>{
        if(this.state.email == ''){
            Toast.show({
                text : 'Email must be field', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }else if(this.state.password == ''){
            Toast.show({
                text : 'Password must be field', duration : 5000,
                buttonText : 'Okay', position : 'bottom',
                buttonStyle : {backgroundColor : colors.primaryOrange},
            })
        }else{
            this.loginHit()
        } 
    }
    loginHit = async () =>{
        console.log('hit firebase auth')
        this.setState({loginButton : true})
        auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((res)=>{
            console.log('success')
            console.log(res)
            AsyncStorage.setItem('emailUser',this.state.email)
            this.setState({loginButton : false},()=>{
                // this.props.navigation.replace('Homes',{screen : 'Home'})
                this.props.navigation.replace('Homes')
            })
        })
        .catch((error)=>{
            console.log('fail')
            console.log(error)
            Alert.alert('Warning',error.code)
            this.setState({loginButton : false})
        })
    }

    logoRender(){
        return(
            <View style={styleGlobal.logoLoginCover}>
                <Image source={require('../image/logo1.png')} style={{height : ScreensHeight*20/100,width : ScreensHeight*20/100,resizeMode : 'contain'}}/>
            </View>
        )
    }

    loginTextInputRender(){
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
                <View style={[styleGlobal.titleLogin,{flexDirection : 'row'}]}>
                    <View style={{}}>
                        <Text style={styleGlobal.titleLoginText}>Login</Text>
                        <Text style={{color:colors.secondaryGrey}}>Please sign in to continue</Text>
                    </View>
                    <View style={{paddingLeft : 50}}>
                        {this.spinnerRender()}
                    </View>
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
                                {/* <Text>Hide</Text>    */}
                                <TouchableOpacity onPress={()=>{
                                    if(this.state.hidePassword){
                                        this.setState({hidePassword : false})
                                    }else{
                                        this.setState({hidePassword : true})
                                    }
                                }}>
                                    <Icons name={iconType} size={28} color={iconColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    spinnerRender(){
        if(this.state.loginButton == true){
            return(
                <View>
                    <Spinner color={colors.primaryOrange} style={{alignSelf : 'center'}} size ={25}/>
                </View>
            )
        }else{
            return(
                <View>

                </View>
            )
        }
        
    }

    loginButtonRender(){
        return(
            <View style={styleGlobal.loginButtonCover}>
                <TouchableHighlight 
                    onPress={()=>{this.loginValidate()}}
                    disabled = {this.state.loginButton}
                >
                    <LinearGradient start={{x: 0, y: 0}} colors={[colors.secondaryOrange,colors.primaryOrange]} style={styleGlobal.loginButton}>
                        <Text style={styleGlobal.loginButtonText}> Login </Text>
                        {/* <Spinner color={'white'} size={20}/> */}
                    </LinearGradient>
                </TouchableHighlight>
            </View>
        )
    }

    googleFacebookLoginRender(){
        return(
            <View style={{alignItems : 'center'}}>
                <Text style={{color : colors.primaryGrey}}>Or Login with</Text>
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
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUp')}}>
                    <Text style={{color : colors.primaryOrange, fontWeight : 'bold'}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{height : ScreensHeight * 1,backgroundColor:'white',flex : 1}}>
                    <ScrollView>
                    <StatusBar hidden={false} backgroundColor={'white'} barStyle={'dark-content'} />
                        <View style={{height : ScreensHeight * 30/100,justifyContent : 'center', alignItems : 'center', }}>
                            {this.logoRender()}
                        </View>  
                        <KeyboardAvoidingView style={{marginTop  :20}}>
                        <View style={{height : ScreensHeight * 70/100,justifyContent : 'flex-start', alignItems : 'center', width : ScreensWidh*1}}>
                            {this.loginTextInputRender()}
                            <View>
                                {this.loginButtonRender()}
                            </View>
                            <View style={{paddingTop : 100}}>
                                {/* {this.googleFacebookLoginRender()} */}
                            </View>
                            <View style={{justifyContent : 'flex-end'}}>
                                {this.signUpRender()}
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

export default connect(mapStateToProps, mapDispatchToProps)(login)
