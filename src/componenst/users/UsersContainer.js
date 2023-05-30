import {connect} from "react-redux";
import {getUsers, follow, unfollow} from "../../state/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        console.log(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
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
    getUsers
})(UsersContainer)