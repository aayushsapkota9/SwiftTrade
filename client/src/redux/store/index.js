import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger'
import users from '../reducerSlice/userSlice'
import bills from '../reducerSlice/billSlice'
import tasks from '../reducerSlice/todoSlice'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users', 'todos']

}

const reducer = combineReducers({
    users,
    bills,
    tasks,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [logger]
})

export const persistor = persistStore(store)