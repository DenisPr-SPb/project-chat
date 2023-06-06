import {authAPI} from "../api/api";

const SET_USER_DATA = 'chat-network/auth/SET-USER-DATA'
const ERROR_MESSAGE = 'chat-network/auth/ERROR-MESSAGE'

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

export function getAuthUserData() {
    return async (dispatch) => {
        const res = await authAPI.authMe()
        if (res.resultCode === 0) {
            const {id, email, login} = res.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

export function login(email, password, rememberMe) {
    return async (dispatch) => {
        const res = await authAPI.login(email, password, rememberMe)
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            dispatch(receivedErrMessage(res.data.messages[0]))
        }
    }
}

export function logout() {
    return async (dispatch) => {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}