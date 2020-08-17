import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'native-base'
import Link from '../link/link'
import Axios from 'axios'

const link = Link


export const collectionService = async(cityId,lat,lon,c)=>{
    console.log('masuk service collection')
    let data = await Axios({
        method : 'GET',
        // url : 'https://developers.zomato.com/api/v2.1/collections?city_id=74&lat=-6.301752&lon=106.820786&count=5',
        url : link.zomatoCollections+'city_id='+cityId+'&lat='+lat+'&lon='+lon+'&count='+c,
        headers : {
            // "content-type": "application/json",
            'user-key' : link.zomatoKey
        }
    })
    .then((res)=>{
        console.log('service collection : ',res.data.collections.length)
        let hasil = res.data.collections
        return JSON.stringify(hasil)
    })
    .catch((error)=>{
        console.log('service collection error : ', error)
    })

    return data
}

export default collectionService