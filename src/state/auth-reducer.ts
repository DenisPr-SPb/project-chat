import {authAPI, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

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
        case "/auth/SET-USER-DATA":
            return {
                ...state,
                ...action.payload,
                error: ''
            }
        case '/auth/ERROR-MESSAGE':
            return  {
                ...state,
                error: action.error,
            }
        case "/auth/GET-CAPTCHA-URL":
            return {
                ...state,
                captcha: action.captchaUrl
            }
        default:
            return state
    }
}
type ActionType = InferActionsTypes<typeof actions>
export const actions = {
    setAuthUserData:(userId:number|null, email:string|null, login:string|null, isAuth:boolean)=> {return {type: '/auth/SET-USER-DATA', payload: {userId, email, login, isAuth}} as const},
    receivedErrMessage:(error:string)=> {return {type:'/auth/ERROR-MESSAGE' , error} as const},
    getCaptchaSuccess:(captchaUrl: string)=> {return {type: '/auth/GET-CAPTCHA-URL', captchaUrl} as const}

}

// THUNK
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export function getAuthUserData():ThunkType {
    return async (dispatch) => {
        try {
            const res = await authAPI.authMe()
            if (res.resultCode === 0) {
                const {id, email, login} = res.data
                dispatch(actions.setAuthUserData(id, email, login, true))
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

                dispatch(actions.receivedErrMessage(res.data.messages[0]))
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
                dispatch(actions.setAuthUserData(null, null, null, false))
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
            dispatch(actions.getCaptchaSuccess(captchaUrl))
        } catch (e) {
            console.error(`getCaptchaUrl, error: ${e}`)
        }
    }
}