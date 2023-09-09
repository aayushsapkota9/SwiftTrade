import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger'
import users from '../reducerSlice/userSlice'
import bills from '../reducerSlice/billSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users']

}

const reducer = combineReducers({
    users,
    bills,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [logger]
})

export const persistor = persistStore(store)