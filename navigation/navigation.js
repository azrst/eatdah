import React, { Component } from 'react'
import { 
    View,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from '../component/splash'
import loginScreen from '../component/login'
import signUpScreen from '../component/signUp'
import restaurantChoseScreen from '../component/restaurantChose'

import HomeScreen from '../component/bottomTabs/home'
import SearchScreen from '../component/bottomTabs/search'
import ProfileScreen from '../component/bottomTabs/profile'

import Colors from '../style/color'
import Icons from 'react-native-vector-icons/FontAwesome';

const colors = Colors

const Stack = createStackNavigator();
function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="SignUp" component={signUpScreen} />
        <Stack.Screen name="RestaurantChose" component={restaurantChoseScreen} />
        <Stack.Screen name="Homes" component={Homes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator()
function Homes(){
  return(
    <Tab.Navigator
      screenOptions = {({route})=>({
        tabBarIcon : ({focused, color, size})=>{
          let iconName
          let iconColor
          if(route.name == 'Home'){
            iconName = 'leaf'
            iconColor = focused ? colors.primaryOrange : colors.secondaryGrey
          }else if(route.name == 'Search'){
            iconName = 'search'
            iconColor = focused ? colors.primaryOrange : colors.secondaryGrey
          }else if(route.name == 'Profile'){
            iconName = 'user'
            iconColor = focused ? colors.primaryOrange : colors.secondaryGrey
          }

          return <Icons name={iconName} size={size} color={iconColor}/>
        }
      })}
      tabBarOptions={{
        activeTintColor : colors.primaryOrange,
        inactiveTintColor : colors.primaryGrey,
        keyboardHidesTabBar : true,
        // showTabBar : false,
        // allowFontScaling : true,
        activeBackgroundColor : 'white',
        inactiveBackgroundColor : 'white'
      }}
      options={{tabBarVisible : false}}
    >
      <Tab.Screen name = "Home" component={HomeScreen}/>
      <Tab.Screen name = "Search" component={SearchScreen}/>
      <Tab.Screen name = "Profile" component={ProfileScreen}/>
    </Tab.Navigator>
  )
}

export default MainNavigation
