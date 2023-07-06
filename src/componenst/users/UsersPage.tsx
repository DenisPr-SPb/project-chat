import { useSelector } from 'react-redux'
import React from 'react'
import Users from './Users'
import Preloader from '../common/Preloader'
import { getIsFetching } from '../../state/users-selector'

type UserPagePropsType = {}

export default function UsersPage( {}: UserPagePropsType ) {
    const isFetching = useSelector( getIsFetching )

    return (
        <>
            { isFetching ? <Preloader/> : null }
            <Users/>
        </>
    )
}