import UserItem from "./UserItem";
import React from "react";

export default function Users ({
                                   totalUsersCount,
                                   pageSize,
                                   currentPage,
                                   onPageChanged,
                                   users,
                                   follow,
                                   unfollow,
                                   followingInProgress,
                                   toggleFollowingProgress}) {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className='users__wrapper'>
            <div className='page__selector'>
                {pages.map(p => {
                    return <span key={p} className={currentPage === p ? 'selectedPage' : ''}
                                 onClick={() => { onPageChanged(p) }}>{p}</span>
                })}
            </div>
            <div className="users__list__wrapper">
                <div className="users__list">
                    {users.map(user => <UserItem
                        key={user.id} user={user}
                        follow={follow}
                        unfollow={unfollow}
                        followingInProgress={followingInProgress}
                        toggleFollowingProgress={toggleFollowingProgress}/>)}
                </div>
            </div>
            <div className="users__btn__wrapper">some btn</div>
        </div>
    )
}