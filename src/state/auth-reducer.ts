import {authAPI, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = '/auth/SET-USER-DATA'
const ERROR_MESSAGE = '/auth/ERROR-MESSAGE'
const GET_CAPTCHA_URL = '/auth/GET-CAPTCHA-URL'

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean | null,
    error: null as string | null,
    captcha: null as string | null
}

type InitialStateType = typeof initialState

export default function authReducer(state = initialState, action: ActionType):InitialStateType {
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
                error: action.error,
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
type ActionType = SetAuthUserDataACType | ReceivedErrMessageACType | GetCaptchaSuccessACType

type PayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}
type SetAuthUserDataACType = {
    type: typeof SET_USER_DATA
    payload: PayloadType
}
export function setAuthUserData(userId:number|null, email:string|null, login:string|null, isAuth:boolean):SetAuthUserDataACType {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}}
}

type ReceivedErrMessageACType = {
    type: typeof ERROR_MESSAGE
    error: string
}
export function receivedErrMessage (error:string):ReceivedErrMessageACType {
    return {type: ERROR_MESSAGE, error}
}

type GetCaptchaSuccessACType = {
    type: typeof GET_CAPTCHA_URL
    captchaUrl: string
}
export function getCaptchaSuccess(captchaUrl: string):GetCaptchaSuccessACType {
    return {type: GET_CAPTCHA_URL, captchaUrl}
}

// THUNK
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export function getAuthUserData():ThunkType {
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

export function login(email:string, password:string, rememberMe:boolean,captchaInput:string):ThunkType {
    return async (dispatch) => {
        try {
            // todo: Resolve this thunk problem!!!
            //@ts-ignore
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

export function logout():ThunkType {
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

export function getCaptchaUrl():ThunkType {
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