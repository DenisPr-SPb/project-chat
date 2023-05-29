import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE-FOLLOWING-IN-PROGRESS'

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
                users: state.users.map(user => {
                    return user.id === action.userId ? {...user, followed: true} : user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userId ? {...user, followed: false} : user
                })
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

export function getUsers(currentPage, pageSize) {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                    dispatch(toggleIsFetching(false))
                    dispatch(setCurrentPage(currentPage))
                    dispatch(setUsers(data.items))
                    dispatch(setTotalUsersCount(200)) // (response.data.totalCount - для всего списка)
                }
            )
    }
}

export function follow(userId) {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.setFollow(userId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(acceptFollow(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export function unfollow(userId) {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.setUnfollow(userId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(acceptUnfollow(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

