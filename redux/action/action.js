
export function setLocation (location){
    return{
        type : 'setLocation',
        payload : location
    }
}

export function setSLocation (sLocation){
    return{
        type : 'setSLocation',
        payload  : sLocation
    }
}

export function setSNearbyRestaurant (sNearbyRestaurant){
    return{
        type : 'setSNearbyRestaurant',
        payload  : sNearbyRestaurant
    }
}

export function setCuisinesMenu(cuisinesMenu){
    return{
        type : 'setCuisinesMenu',
        payload : cuisinesMenu
    }
}

export function setRestaurantChoseID (restaurantChoseID){
    return{
        type : 'setRestaurantChoseID',
        payload  : restaurantChoseID
    }
}

export function setRestaurantReviewChose (restaurantReviewChose){
    return{
        type : 'setRestaurantReviewChose',
        payload  : restaurantReviewChose
    }
}