import {connect} from "react-redux";
import {
    toggleIsFetching,
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unfollow,
    toggleFollowingProgress
} from "../../state/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {usersAPI} from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(200) // слишком много записей (response.data.totalCount - для всего списка)
                }
            )
    }

    onPageChanged = (pageNUmber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNUmber)

        usersAPI.getUsers(pageNUmber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            }
        )
    }

    render() {
        return (
            <>
                {
                    this.props.isFetching ?
                    <Preloader/> :
                    <Users totalUsersCount={this.props.totalUsersCount}
                           currentPage={this.props.currentPage}
                           pageSize={this.props.pageSize}
                           onPageChanged={this.onPageChanged}
                           users={this.props.users}
                           follow={this.props.follow}
                           unfollow={this.props.unfollow}
                           toggleFollowingProgress={this.props.toggleFollowingProgress}
                           followingInProgress={this.props.followingInProgress}
                    />
                }
            </>
        )
    }
}

/**
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress
})(UsersContainer)