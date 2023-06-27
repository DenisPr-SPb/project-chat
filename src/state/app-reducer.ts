import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = '/app/INITIALIZED-SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

export default function appReducer(state = initialState, action: any): InitialStateType {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializedSuccessACType ={
    type: typeof INITIALIZED_SUCCESS
}
export function initializedSuccess():InitializedSuccessACType { return {type: INITIALIZED_SUCCESS}}

export function initializeApp() {
    return (dispatch: any) => {
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