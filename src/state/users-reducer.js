import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../componenst/helpers/object-helpers";

const FOLLOW = '/users/FOLLOW'
const UNFOLLOW = '/users/UNFOLLOW'
const SET_USERS = '/users/SET-USERS'
const SET_CURRENT_PAGE = '/users/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = '/users/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = '/users/TOGGLE-IS-FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = '/users/TOGGLE-FOLLOWING-IN-PROGRESS'

const initialState = {
    users: [],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

/**
 * @param {Object} state
 * @param {string} action
 * @returns {Object}
 */
export default function usersReducer(state = initialState, action) {
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

export function acceptFollow(userId) {
    return {type: FOLLOW, userId}
}

export function acceptUnfollow(userId) {
    return {type: UNFOLLOW, userId}
}

export function setUsers(users) {
    return {type: SET_USERS, users}
}

export function setCurrentPage(currentPage) {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export function setTotalUsersCount(totalCount) {
    return {type: SET_TOTAL_USERS_COUNT, totalCount}
}

export function toggleIsFetching(isFetching) {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export function toggleFollowingProgress(isFetching, userId) {
    return {type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId}
}

// THUNK - запросы

export function requestUsers(requestedPage, pageSize) {
    return async (dispatch) => {
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

async function followUnfollowFlow(userId, dispatch, apiMethod, actionCreator){
    dispatch(toggleFollowingProgress(true, userId))
    const res = await apiMethod(userId)
    if (res.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))

}

export function follow(userId) {
    return async (dispatch) => {
        try {
            await followUnfollowFlow(userId, dispatch, usersAPI.setFollow.bind(usersAPI), acceptFollow)
        } catch (e) {
            console.error(`follow, error: ${e}`)
        }
    }
}

export function unfollow(userId) {
    return async (dispatch) => {
       try {
           await followUnfollowFlow(userId, dispatch, usersAPI.setUnfollow.bind(usersAPI), acceptUnfollow)
       } catch (e) {
           console.error(`unfollow, error: ${e}`)
       }
    }
}

