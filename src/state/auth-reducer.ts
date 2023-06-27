import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = '/auth/SET-USER-DATA'
const ERROR_MESSAGE = '/auth/ERROR-MESSAGE'
const GET_CAPTCHA_URL = '/auth/GET-CAPTCHA-URL'

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    error: null as string | null,
    captcha: null as string | null
}

type InitialStateType = typeof initialState

export default function authReducer(state = initialState, action: any):InitialStateType {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                error: '',
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

export function getAuthUserData() {
    return async (dispatch:any) => {
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

export function login(email:string, password:string, rememberMe:boolean,captchaInput:string) {
    return async (dispatch:any) => {
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

export function logout() {
    return async (dispatch:any) => {
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
    return async (dispatch:any) => {
        try {
            const res = await securityAPI.getCaptchaUrl()
            const captchaUrl = res.data.url
            dispatch(getCaptchaSuccess(captchaUrl))
        } catch (e) {
            console.error(`getCaptchaUrl, error: ${e}`)
        }
    }
}