import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'native-base'
import Link from '../link/link'
import Axios from 'axios'

const link = Link


export const cuisinesMenuTown = async(entityId,entitySubzone,lat,lon,cuisinesId)=>{
    console.log('data service : ',entityId,entitySubzone,lat,lon,cuisinesId)
    console.log('masuk service cuisines menu restaurant')
    let haha = await Axios({
        method : 'GET',
        // url : link.zomatoSearch+'lat='+lat+'&lon='+lon+'&cuisines='+cuisinesId+'&sort=real_distance',
        // url : link.zomatoCuisinesRestaurant+'entity_id='+entityId+'&lat=-'+lat+'&lon='+lon+'&cuisines='+cuisinesId+'&sort=real_distance',
        // url : link.zomatoCuisinesRestaurant+'entity_id='+entityId+'&lat=-'+lat+'&lon='+lon+'&cuisines='+cuisinesId,
        url : link.zomatoCuisinesRestaurant+'entity_id='+entityId+'&entity_type='+entitySubzone+'&lat='+lat+'&lon='+lon+'&cuisines='+cuisinesId+'&sort=real_distance',
        headers : {
            'content-type' : 'application/json',
            'user-key': link.zomatoKey
        }
    })
    .then(async(res)=>{
        console.log('service cuisines restaurant : ', res.data.restaurants.length)
        let dumy  = await res.data.restaurants
        return JSON.stringify(dumy)
    })
    .catch((error)=>{
        console.log('cuisinis error service : ', error)
    })
   return haha
}

export default cuisinesMenuTown