import {SET_USER, SET_AUTH_LOADING, SET_AUTH_ERROR} from '../actionTypes/authActionTypes'

const AuthReducer = (state = {
    user: null,
    loading: false,
    error: null,
}, action) => {
    switch (action.type){
        case SET_USER:
            return {...state, user: action.user}
        case SET_AUTH_LOADING:
            return {...state, loading: action.loading}
        case SET_AUTH_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

export default AuthReducer