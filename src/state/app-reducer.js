import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = '/app/INITIALIZED-SUCCESS'

const initialState = {
    initialized: false
}

export default function appReducer(state = initialState, action) {
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

export function initializedSuccess() { return {type: INITIALIZED_SUCCESS}}

export function initializeApp() {
    return (dispatch) => {
        const authUserPromise = dispatch(getAuthUserData())
        Promise.all([authUserPromise]).then(() => {
            dispatch(initializedSuccess())
        })
    }
}