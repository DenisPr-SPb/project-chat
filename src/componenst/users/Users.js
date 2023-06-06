import UserItem from "./UserItem";
import React from "react";
import Paginator from "../common/Paginator";

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
        <div className='users__wrapper'>

            <Paginator pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount}/>

            <div className="users__list__wrapper">

                <div className="users__list">
                    {users.map(user => <UserItem
                        key={user.id}
                        user={user}
                        follow={follow}
                        unfollow={unfollow}
                        followingInProgress={followingInProgress}/>)}
                </div>
            </div>
            <div className="users__btn__wrapper">some btn</div>
        </div>
    )
}