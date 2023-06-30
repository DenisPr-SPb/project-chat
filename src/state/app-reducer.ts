import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {InferActionsTypes, AppStateType} from "./redux-store";

const initialState: { initialized: boolean } = {
    initialized: false
}

export default function appReducer(state = initialState, action: ActionType): {initialized: boolean } {
    switch (action.type) {
        case '/app/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

type ActionType = InferActionsTypes<typeof actions>

export const actions = {
    initializedSuccess:() => { return {type: '/app/INITIALIZED-SUCCESS'} as const}
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export function initializeApp():ThunkType {
    return async(dispatch) => {
        try {
            const authUserPromise = dispatch(getAuthUserData())
            Promise.all([authUserPromise]).then(() => {
                dispatch(actions.initializedSuccess())
            })
        } catch (e) {
            console.error(`initializeApp, error: ${e}`)
        }
    }
}