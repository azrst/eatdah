import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'native-base'
import Link from '../link/link'
import Axios from 'axios'

const link = Link


export const cuisinesMenuTown = async(cityId,lat,lon)=>{
    console.log('masuk service cuisines menu town')

    let data = await Axios({
        method : 'GET',
        url : link.zomatoCuisines+'city_id='+cityId+'&lat='+lat+'&lon='+lon,
        headers : {
            'user-key': link.zomatoKey
        }
    })
    .then((res)=>{
        console.log('cuisines service',res.data.cuisines.length)
        // let hasil = []
        let hasil = res.data.cuisines
        
        return JSON.stringify(hasil)
    })
    .catch((error)=>{
        console.log('cuisines service error : ',error)
    })

    return data
}

export default cuisinesMenuTown