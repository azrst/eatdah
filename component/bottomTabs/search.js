import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'
import {connect} from 'react-redux'
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

export class search extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        console.log('cuisines menu search : ',this.props.cuisinesMenu.length)
    }

    render() {
        return (
            <View>
                <Text>search page</Text>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        // position : state.position,
        cuisinesMenu : state.cuisinesMenu,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setLocation : ( Location ) => {
        //     dispatch ( setLocation ( Location ) )
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(search)
