import React, { Component } from 'react'
import {
    
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { View } from 'native-base'
import Link from '../link/link'

const link = Link


export const zomatoLocation = async (lat,lon)=>{
    console.log('get in location service')

    let data = await axios({
        method : 'GET',
        url : link.zomatoGeocode+'lat='+lat+'&lon='+lon,
        headers : {
            'user-key': link.zomatoKey
        }
    })
    .then((res)=>{
        let hasil = {}
        // console.log('res location : ',res.data.location)
        // console.log('res nearby : ', res.data.nearby_restaurants)
        hasil = {
            location : res.data.location,
            nearbyRestaurant : res.data.nearby_restaurants
        }
        console.log('location service getted : ',res.data.location)
        return JSON.stringify(hasil)

    })
    .catch((error)=>{
        console.log('zomato location error : ', error)
    })

    return data
}

export default zomatoLocation