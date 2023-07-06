import { createSelector } from '@reduxjs/toolkit'
import { AppStateType } from './redux-store'

function getUsersSelector( state: AppStateType ) {
    return state.usersPage.users
}

export const getUsersList = createSelector( getUsersSelector, ( users ) => {
    return users.filter( () => true )
} )

export function getPageSize( state: AppStateType ) {
    return state.usersPage.pageSize
}

export function getTotalUsersCount( state: AppStateType ) {
    return state.usersPage.totalUsersCount
}

export function getCurrentPage( state: AppStateType ) {
    return state.usersPage.currentPage
}

export function getIsFetching( state: AppStateType ) {
    return state.usersPage.isFetching
}

export function getFollowingInProgress( state: AppStateType ) {
    return state.usersPage.followingInProgress
}

export function getFilter( state: AppStateType){
    return state.usersPage.filter
}

