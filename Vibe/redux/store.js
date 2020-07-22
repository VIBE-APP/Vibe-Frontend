import {combineReducers, createStore} from 'redux'
import AuthReducer from './reducers/authReducer'
const rootReducer = combineReducers({
    auth: AuthReducer,
})

const configureStore = () => createStore(rootReducer)

export default configureStore 