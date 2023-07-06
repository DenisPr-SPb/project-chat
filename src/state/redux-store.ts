import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialog-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware from 'redux-thunk'
import appReducer from './app-reducer'

const rootReducer = combineReducers( {
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
} )

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesType<T> = T extends { [ key: string ]: infer U } ? U : never

export type InferActionsTypes<T extends { [ key: string ]: ( ...args: any[] ) => any }> = ReturnType<PropertiesType<T>>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = legacy_createStore( rootReducer, composeEnhancers( applyMiddleware( thunkMiddleware ) ) )

// const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
//@ts-ignore
window.store = store