import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET-USER-DATA'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

export function setAuthUserData(userId, email, login) {
    return {type: SET_USER_DATA, data: {userId, email, login}}
}

// THUNK

export function getAuthUserData () {
    return (dispatch) => {
        authAPI.authMe()
            .then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }

}