import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = '/auth/SET-USER-DATA'
const ERROR_MESSAGE = '/auth/ERROR-MESSAGE'
const GET_CAPTCHA_URL = '/auth/GET-CAPTCHA-URL'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: '',
    captcha: null
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
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captcha: action.captchaUrl
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

export function getCaptchaSuccess(captchaUrl) {
    return {
        type: GET_CAPTCHA_URL,
        captchaUrl
    }
}

// THUNK

export function getAuthUserData() {
    return async (dispatch) => {
        try {
            const res = await authAPI.authMe()
            if (res.resultCode === 0) {
                const {id, email, login} = res.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        } catch (e) {
            console.error(`getAuthUserData, error: ${e}`)
        }
    }
}

export function login(email, password, rememberMe,captchaInput) {
    return async (dispatch) => {
        try {
            const res = await authAPI.login(email, password, rememberMe, captchaInput)
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                if (res.data.resultCode === 10) {
                    dispatch(getCaptchaUrl())
                }

                dispatch(receivedErrMessage(res.data.messages[0]))
            }
        } catch (e) {
            console.error(`login, error: ${e}`)
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        } catch (e) {
            console.error(`logout, error: ${e}`)
        }
    }
}

export function getCaptchaUrl() {
    return async (dispatch) => {
        try {
            const res = await securityAPI.getCaptchaUrl()
            const captchaUrl = res.data.url
            dispatch(getCaptchaSuccess(captchaUrl))
        } catch (e) {
            console.error(`getCaptchaUrl, error: ${e}`)
        }
    }
}