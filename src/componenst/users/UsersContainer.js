import {connect} from "react-redux";
import {
    toggleIsFetching,
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unfollow
} from "../../state/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(50) // слишком много записей (response.data.totalCount - для всего списка)
                }
            )
    }

    onPageChanged = (pageNUmber) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNUmber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNUmber}&count=${this.props.pageSize}`)
            .then(response => {
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(response.data.items)
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
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching
})(UsersContainer)