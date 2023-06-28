import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const INITIALIZED_SUCCESS = '/app/INITIALIZED-SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

export default function appReducer(state = initialState, action: InitializedSuccessACType): InitialStateType {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

type InitializedSuccessACType ={
    type: typeof INITIALIZED_SUCCESS
}
export function initializedSuccess():InitializedSuccessACType { return {type: INITIALIZED_SUCCESS}}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializedSuccessACType>

export function initializeApp():ThunkType {
    return async(dispatch) => {
        try {
            const authUserPromise = dispatch(getAuthUserData())
            Promise.all([authUserPromise]).then(() => {
                dispatch(initializedSuccess())
            })
        } catch (e) {
            console.error(`initializeApp, error: ${e}`)
        }
    }
}