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

export class profile extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <Text>profile page</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(profile)
