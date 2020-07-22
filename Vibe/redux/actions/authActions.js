import {SET_USER, SET_AUTH_LOADING, SET_AUTH_ERROR} from '../actionTypes/authActionTypes'

export const setUser = (user) => ({
    type: SET_USER,
    user: user
})

export const setLoading = (loading) => ({
    type: SET_AUTH_LOADING,
    loading: loading
})

export const setError = (error) => ({
    type: SET_AUTH_ERROR,
    error: error
})