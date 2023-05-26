const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

const initialState = {
    users: [],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        default:
            return state
    }
}

export function follow(userId) {return {type: FOLLOW, userId}}

export function unfollow(userId) {return {type: UNFOLLOW, userId}}

export function setUsers(users) {return {type: SET_USERS, users}}

export function setCurrentPage(currentPage) {return {type: SET_CURRENT_PAGE, currentPage}}

export function setTotalUsersCount(totalCount) {return {type: SET_TOTAL_USERS_COUNT, totalCount}}

export function toggleIsFetching(isFetching){return {type: TOGGLE_IS_FETCHING, isFetching}}

