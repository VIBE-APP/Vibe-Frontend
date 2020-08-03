import {setUser, removeUser, setLoading, setError} from '../redux/actions/authActions'
import axios from 'axios'
import decode from 'jwt-decode'
import localStorage from '@react-native-community/async-storage'

const USER_KEY = 'userToken' 
const MEMORY_KEY = 'rememberMe'
const SERVER_URL = ''

export const logIn = async (dispatch, email, password, rememberMe) => {
    dispatch(setUser({name:'Sathira', id:'id'}))
    return {name:'Sathira', id:'id'}
    console.log('logging in')
    let user = null
    dispatch(setLoading(true))
    
    await axios.post(SERVER_URL + 'api/v1/login', {
        email: email,
        password: password,
        grant_type: 'password'
    }).then(async res => {
        const token = res.data
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`
        try{
            await localStorage.setItem(MEMORY_KEY, JSON.stringify(rememberMe))
            await localStorage.setItem(USER_KEY, JSON.stringify(token))
            const decoded = decode(token.access_token)
            user = decoded.user
            dispatch(setUser(user))
            dispatch(setError(''))
        }catch(e){
            dispatch(setError(e.message || 'Error saving credentials'))
            dispatch(removeUser())
            delete axios.defaults.headers.common['Authorization']
        }
        dispatch(setLoading(false))
    }).catch(e => {
        dispatch(removeUser())
        let message = e.response && e.response.data && e.response.data.response_message
        console.log('error message', message)
        dispatch(setError(message || e.message || 'Username and/or Password are incorrect'))
        dispatch(setLoading(false))
        delete axios.defaults.headers.common['Authorization']
    })
    return user
}

export const signUp = async (dispatch, name, email, password) => {
    return true
    console.log('signing in')
    let registered = null
    dispatch(setLoading(true))
    await axios.post(SERVER_URL + 'api/v1/register', {
        name: name,
        email: email,
        password: password,
    }).then(res => {
        registered = res.data
        dispatch(setError(''))
        dispatch(setLoading(false))
    }).catch(e => {
        let message = e.response && e.response.data && e.response.data.response_message
        console.log('error message', message)
        dispatch(setError(message || e.message || 'Error registering user'))
        dispatch(setLoading(false))
    })
    return registered
}

export const initializeUser = async (dispatch) => {
    return null
    console.log('initialize user called')
    dispatch(setLoading(true))

    let token = null
    let rememberMe = false

    try{
        const tokenJSON = await localStorage.getItem(USER_KEY)
        token = JSON.parse(tokenJSON)
        const rememberMeJSON = await localStorage.getItem(MEMORY_KEY)
        rememberMe = JSON.parse(rememberMeJSON)
    }catch(e){
        console.log('Error getting stored data')
    }

    console.log('token is ', token)

    if(!token){
        //if no stored token user must log in again
        if(axios.defaults.headers.common['Authorization']) delete axios.defaults.headers.common['Authorization']
        dispatch(removeUser())
        dispatch(setLoading(false))
        return null
    }else{
        let user = null
        const expiryTime = token.expires_in + token.created_at
        const currentTime = new Date().getTime()/1000
        const expired = currentTime > expiryTime
        
        if(expired && rememberMe){
            console.log('refresh call sent')
            //refresh token if out of date
            await axios.post(SERVER_URL + 'api/v1/refresh', {
                refresh_token: token.refresh_token,
                grant_type: 'refresh_token'
            }).then(async res => {
                token = res.data
                axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`
                try{
                    await localStorage.setItem(USER_KEY, JSON.stringify(token))
                    let decoded = decode(token.access_token)
                    user = decoded.user
                    dispatch(setError(''))
                    dispatch(setUser(user))
                }catch(e){
                    dispatch(setError(e.message || 'Error restoring user'))
                    dispatch(removeUser())
                    user = null
                }
                dispatch(setLoading(false))
            }).catch(e => {
                user = null
                console.log('error message', e.message)
                dispatch(removeUser())
                dispatch(setError(e.message || 'Error restoring user'))
                dispatch(setLoading(false))
            })
        }else if(!expired){
            // if token is stil valid update headers and get user object
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`
            try{
                const decoded = decode(token.access_token)
                user = decoded.user
                dispatch(setError(''))
                dispatch(setUser(user))
            } catch (e){
                console.log('error message', e.message)
                dispatch(setError('Error restoring user'))
                dispatch(removeUser())
                user = null
            }
            dispatch(setLoading(false))
        } else {
            // token is expired and the user doesn't want to be remembered
            user = null
            dispatch(setError(''))
            dispatch(removeUser())
            dispatch(setLoading(false))
        }
        return user
    }
}

export const logout = async (dispatch) => {
    dispatch(setUser(null))
    return true
    console.log('logging out')
    let loggedOut = false
    dispatch(setLoading(true))
    await localStorage.removeItem(USER_KEY)
    await localStorage.removeItem(MEMORY_KEY)
    await axios.post(SERVER_URL + 'api/v1/logout').then(res => {
        loggedOut = true
        dispatch(setError(''))
        dispatch(removeUser())
        dispatch(setLoading(false))
    }).catch(e => {
        console.log('error message', e.message)
        dispatch(setError(e.message || 'Error logging out'))
        dispatch(setLoading(false))
        loggedOut = false
    })
    return loggedOut
}

export const updateUser = async (dispatch, user) => {
    return true
    console.log('updating user')
    dispatch(setLoading(true))
    await axios.post(SERVER_URL + 'api/v1/update-profile', user).then(res => {
        user = res.data
        dispatch(setError(''))
        dispatch(setUser(user))
        dispatch(setLoading(false))
    }).catch(e => {
        console.log('error message', e.message)
        dispatch(setError(e.message || 'Error updating user'))
        dispatch(setLoading(false))
    })
    return user
}