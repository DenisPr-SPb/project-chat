import UserItem from "./UserItem"
import React from "react"
import Paginator from "../common/Paginator"
import style from "./Users.module.css"

export default function Users({
                                  totalUsersCount,
                                  pageSize,
                                  currentPage,
                                  onPageChanged,
                                  users,
                                  follow,
                                  unfollow,
                                  followingInProgress,
                              }) {

    return (
        <div className={style.users__wrapper}>

            <div className={style.users__paginator}>
                <Paginator pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount}/>
            </div>

            <div className={style.users__list__wrapper}>

                <div className={style.users__list}>
                    {users.map(user => <UserItem
                        key={user.id}
                        user={user}
                        follow={follow}
                        unfollow={unfollow}
                        followingInProgress={followingInProgress}/>)}
                </div>
            </div>
        </div>
    )
}