const initialState = {
    location : {},
    sLocation : {},

    sNearbyRestaurant : [],
    cuisinesMenu : [],

    restaurantChoseID : '',
    restaurantReviewChose : [],
}

export default function reducer (state = initialState , action){
    switch (action.type){

        case 'setLocation' : 
            return {
                ...state,
                location : action.payload,
            }

        case 'setSLocation' : 
            return{
                ...state,
                sLocation : action.payload,
            }

        case 'setSNearbyRestaurant' : 
            return{
                ...state,
                sNearbyRestaurant : action.payload,
            }

        case 'setCuisinesMenu'  :
            return{
                ...state,
                cuisinesMenu : action.payload,
            }

        case 'setRestaurantChoseID' : 
            return{
                ...state,
                restaurantChoseID : action.payload,
            }

        case 'setRestaurantReviewChose' : 
        return{
            ...state,
            restaurantReviewChose : action.payload,
        }
       
    }
}
