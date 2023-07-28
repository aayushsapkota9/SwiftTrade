import { combineReducers, configureStore } from '@reduxjs/toolkit'

import users from '../reducerSlice/userSlice'
const reducer = combineReducers({
    users,
})
const store = configureStore({
    reducer,
})

export default store;