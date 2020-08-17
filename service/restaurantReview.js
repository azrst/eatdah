import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'native-base'
import Link from '../link/link'
import Axios from 'axios'

const link = Link


export const restaurantReview = async(restaurantID,c)=>{
    console.log('masuk service restaurant detail')
    let data = await Axios({
        method : 'GET',
        // url : 'https://developers.zomato.com/api/v2.1/collections?city_id=74&lat=-6.301752&lon=106.820786&count=5',
        url : link.zomatoRestaurantReview+'res_id='+restaurantID+'&count='+c,
        headers : {
            'user-key' : link.zomatoKey
        }
    })
    .then(async(res)=>{
        let hasil = await res.data.user_reviews
        console.log('service review : ',hasil.length)
        return JSON.stringify(hasil)
    })

    return data
}

export default restaurantReview