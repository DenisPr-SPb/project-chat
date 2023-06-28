import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../componenst/helpers/object-helpers";
import {UserType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = '/users/FOLLOW'
const UNFOLLOW = '/users/UNFOLLOW'
const SET_USERS = '/users/SET-USERS'
const SET_CURRENT_PAGE = '/users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = '/users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = '/users/TOGGLE-IS-FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = '/users/TOGGLE-FOLLOWING-IN-PROGRESS'

export type InitialStateType = {
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
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
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

type ActionType = AcceptFollowACType | AcceptUnfollowACType |SetUsersACType | SetCurrentPageACType | SetTotalUsersCountACType | ToggleIsFetchingACType | ToggleFollowingProgressACType

type AcceptFollowACType = {
    type: typeof FOLLOW
    userId: number
}
export function acceptFollow(userId:number):AcceptFollowACType {
    return {type: FOLLOW, userId}
}

type AcceptUnfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
export function acceptUnfollow(userId:number):AcceptUnfollowACType {
    return {type: UNFOLLOW, userId}
}

type SetUsersACType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export function setUsers(users:Array<UserType>):SetUsersACType {
    return {type: SET_USERS, users}
}

type SetCurrentPageACType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export function setCurrentPage(currentPage:number):SetCurrentPageACType {
    return {type: SET_CURRENT_PAGE, currentPage}
}

type SetTotalUsersCountACType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount:number
}
export function setTotalUsersCount(totalCount:number):SetTotalUsersCountACType {
    return {type: SET_TOTAL_USERS_COUNT, totalCount}
}

type ToggleIsFetchingACType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export function toggleIsFetching(isFetching:boolean):ToggleIsFetchingACType {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

type ToggleFollowingProgressACType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export function toggleFollowingProgress(isFetching:boolean, userId:number):ToggleFollowingProgressACType {
    return {type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId}
}

// THUNK - запросы

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export function requestUsers(requestedPage:number, pageSize:number): ThunkType {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        try {
            const res = await usersAPI.getUsers(requestedPage, pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(setCurrentPage(requestedPage))
            dispatch(setUsers(res.items))
            dispatch(setTotalUsersCount(res.totalCount))
        } catch (e) {
            console.error(`requestUsers, error: ${e}`)
        }
    }
}

async function _followUnfollowFlow(
    userId:number,
    dispatch: Dispatch<ActionType>,
    apiMethod:any,
    actionCreator:(userId:number)=>AcceptFollowACType | AcceptUnfollowACType)
{
    dispatch(toggleFollowingProgress(true, userId))
    const res = await apiMethod(userId)
    if (res.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))

}

export function follow(userId:number):ThunkType {
    return async (dispatch) => {
        try {
            await _followUnfollowFlow(userId, dispatch, usersAPI.setFollow.bind(usersAPI), acceptFollow)
        } catch (e) {
            console.error(`follow, error: ${e}`)
        }
    }
}

export function unfollow(userId:number):ThunkType {
    return async (dispatch) => {
       try {
           await _followUnfollowFlow(userId, dispatch, usersAPI.setUnfollow.bind(usersAPI), acceptUnfollow)
       } catch (e) {
           console.error(`unfollow, error: ${e}`)
       }
    }
}

