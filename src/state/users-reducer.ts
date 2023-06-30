import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../componenst/helpers/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {InferActionsTypes, AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>// Array of users Id
}

const initialState: InitialStateType = {
    users: [],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export default function usersReducer(state = initialState, action:ActionType):InitialStateType {
    switch (action.type) {
        case "/users/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case "/users/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case "/users/SET-USERS":
            return {
                ...state,
                users: [...action.users]
            }
        case "/users/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "/users/SET-TOTAL-USERS-COUNT":
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case "/users/TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "/users/TOGGLE-FOLLOWING-IN-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

export type ActionType = InferActionsTypes<typeof actions>

export const actions = {
    acceptFollow:(userId:number)=> {return {type: '/users/FOLLOW', userId} as const},
    acceptUnfollow:(userId:number)=> {return {type: '/users/UNFOLLOW', userId} as const},
    setUsers:(users:Array<UserType>)=> {return {type: '/users/SET-USERS', users} as const},
    setCurrentPage:(currentPage:number)=> {return {type: '/users/SET-CURRENT-PAGE', currentPage} as const},
    setTotalUsersCount:(totalCount:number)=> {return {type: '/users/SET-TOTAL-USERS-COUNT', totalCount} as const},
    toggleIsFetching:(isFetching:boolean)=> {return {type: '/users/TOGGLE-IS-FETCHING', isFetching} as const},
    toggleFollowingProgress:(isFetching:boolean, userId:number)=> {return {type: '/users/TOGGLE-FOLLOWING-IN-PROGRESS', isFetching, userId} as const}
}
// THUNK - запросы

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export function requestUsers(requestedPage:number, pageSize:number): ThunkType {
    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true))
        try {
            const res = await usersAPI.getUsers(requestedPage, pageSize)
            dispatch(actions.toggleIsFetching(false))
            dispatch(actions.setCurrentPage(requestedPage))
            dispatch(actions.setUsers(res.items))
            dispatch(actions.setTotalUsersCount(res.totalCount))
        } catch (e) {
            console.error(`requestUsers, error: ${e}`)
        }
    }
}

async function _followUnfollowFlow(
    userId:number,
    dispatch: Dispatch<ActionType>,
    apiMethod:any,
    actionCreator:(userId:number)=>ActionType)
{
    dispatch(actions.toggleFollowingProgress(true, userId))
    const res = await apiMethod(userId)
    if (res.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))

}

export function follow(userId:number):ThunkType {
    return async (dispatch) => {
        try {
            await _followUnfollowFlow(userId, dispatch, usersAPI.setFollow.bind(usersAPI), actions.acceptFollow)
        } catch (e) {
            console.error(`follow, error: ${e}`)
        }
    }
}

export function unfollow(userId:number):ThunkType {
    return async (dispatch) => {
       try {
           await _followUnfollowFlow(userId, dispatch, usersAPI.setUnfollow.bind(usersAPI), actions.acceptUnfollow)
       } catch (e) {
           console.error(`unfollow, error: ${e}`)
       }
    }
}

