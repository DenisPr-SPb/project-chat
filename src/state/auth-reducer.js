import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA'
const ERROR_MESSAGE = 'ERROR-MESSAGE'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: ''
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                error: ''
            }
        case ERROR_MESSAGE:
            return  {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export function setAuthUserData(userId, email, login, isAuth) {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

export function receivedErrMessage (error) {
    return {type: ERROR_MESSAGE, error}
}

// THUNK

export function getAuthUserData () {
    return (dispatch) => {
        return authAPI.authMe().then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}

export function login (email, password, rememberMe) {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    dispatch(receivedErrMessage(res.data.messages[0]))
                }
            } )
    }
}

export function logout () {
    return (dispatch) => {
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            } )
    }
}