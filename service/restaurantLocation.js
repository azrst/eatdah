import React, { Component } from 'react'
import {
    
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { View } from 'native-base'
import Link from '../link/link'

const link = Link


export const restaurantLocation = async (entityID,entityType)=>{
    console.log('restaurantLocation data : ',entityID,entityType)
    console.log('get in restaurantLocation service')

    let data = await axios({
        method : 'GET',
        url : 'https://developers.zomato.com/api/v2.1/location_details?entity_id=72929&entity_type=subzone',
        url : link.zomatoRestaurantLocation+'entity_id='+entityID+'&entity_type='+entityType,
        headers : {
            'user-key' : link.zomatoKey
        }
    })
    .then(async(res)=>{
        let hasil = await res.data.best_rated_restaurant
        console.log('res service Rlocation : ', hasil.length)

        return JSON.stringify(hasil)
    })
    .catch((error)=>{
        console.log('restaurant locarion error : ', error)
    })

    return data
}

export default restaurantLocation