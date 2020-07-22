import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {connect} from 'react-redux'
import {initializeUser} from './services/authServices'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
  StatusBar,
} from 'react-native';

import Splash from './pages/auth/Splash'
import UserHome from './pages/user/Home'
import Account from './pages/user/Account'
import SignUp from './pages/auth/SignUp'
import Landing from './pages/auth/Landing'

const AuthStack = createStackNavigator();
const UserTabs = createMaterialBottomTabNavigator()

const VibeTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    primary:'mediumseagreen',
    secondary:'mediumspringgreen',
    background:'whitesmoke',
    card:'white',
    textColor:'dimgrey',
    primaryTextColor:'white',
    secondaryTextColor:'black',
    error:'crimson'
  }
}

function App (props){

  useEffect(()=>{
    const _bootstrapAsync = async () =>{
      initializeUser(props.dispatch)
    }
    if(!props.loading && !props.user) _bootstrapAsync()

    return ()=>{
      //cleanup function
    }
  },[])

  if(props.loading){
    return <Splash/>
  }

  return (
    <>
    <StatusBar backgroundColor='white' barStyle='dark-content'/>
    <NavigationContainer theme={VibeTheme}>
      {
        props.user == null ? (
          <AuthStack.Navigator
            screenOptions={{
            headerTitleStyle:{
              fontWeight:'bold'
            }
            }}>
            <AuthStack.Screen name = "Landing" component={Landing}
              options={{
                headerShown:false
              }} />
            <AuthStack.Screen name = 'SignUp' component={SignUp}/>
          </AuthStack.Navigator>
        ):(
          <UserTabs.Navigator
            initialRouteName="Home"
            activeColor="white"
            inactiveColor="gray"
            barStyle={{ backgroundColor: 'black'}}>
            <UserTabs.Screen 
              name = 'Home'
              component={UserHome}
              options={{
                tabBarLabel:'Home',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="home" color={color} size={size}/>
                ),
              }}
              />
            <UserTabs.Screen 
              name = 'Account'
              component={Account}
              options={{
                tabBarLabel:'Account',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="person" color={color} size={size}/>
                ),
              }}
              />
          </UserTabs.Navigator>
        )
      }
    </NavigationContainer>
    </>
  );
};

function mapState(state){
  return{
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error
  }
}

function mapDispatch(dispatch){
  return{
    dispatch: (data) => dispatch(data)
  }
}

export default connect(mapState, mapDispatch)(App);