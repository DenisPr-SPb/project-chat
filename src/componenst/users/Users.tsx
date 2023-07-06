import UserItem from './UserItem'
import React, { useEffect } from 'react'
import Paginator from '../common/Paginator'
import style from './Users.module.css'
import UserSearchForm from './UserSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../state/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import {
    getTotalUsersCount,
    getCurrentPage,
    getPageSize,
    getFilter,
    getUsersList,
    getFollowingInProgress
} from '../../state/users-selector'

// type UsersType = {
//     requestUsers: ( currentP: number, sizeP: number, filter: FilterType ) => void
// }

export default function Users({}) {
    const users = useSelector( getUsersList )
    const totalUsersCount = useSelector( getTotalUsersCount )
    const currentPage = useSelector( getCurrentPage )
    const pageSize = useSelector( getPageSize )
    const filter = useSelector( getFilter )
    const followingInProgress = useSelector(getFollowingInProgress)

    const diispatch = useDispatch()

    useEffect(() => {
        //@ts-ignore
        diispatch(requestUsers( currentPage, pageSize, filter ))
    }, [])

    const onPageChanged = ( pageNumber: number ) => {
        //@ts-ignore
        diispatch( requestUsers( pageNumber, pageSize, filter ) )
    }

    const onFilterChanged = ( filter: FilterType ) => {
        //@ts-ignore
        diispatch( requestUsers( 1, pageSize, filter ) )
    }

    const foll = ( userId: number ) => {
        //@ts-ignore
        diispatch(follow(userId))
    }
    const unfoll = ( userId: number ) => {
        //@ts-ignore
        diispatch(unfollow(userId))
    }
    return (
        <div className={ style.users__wrapper }>

            <UserSearchForm onFilterChanged={ onFilterChanged }/>

            <div className={ style.users__paginator }>
                <Paginator pageSize={ pageSize } currentPage={ currentPage } onPageChanged={ onPageChanged }
                           totalItemsCount={ totalUsersCount }/>
            </div>

            <div className={ style.users__list__wrapper }>

                <div className={ style.users__list }>
                    { users.map( user => <UserItem
                        key={ user.id }
                        user={ user }
                        follow={ foll }
                        unfollow={ unfoll }
                        followingInProgress={ followingInProgress }/> ) }
                </div>
            </div>
        </div>
    )
}