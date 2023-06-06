import {connect} from "react-redux";
import {requestUsers, follow, unfollow} from "../../state/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../state/users-selector";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
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

function mapStateToProps(state) {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers
})(UsersContainer)