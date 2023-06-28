import {connect} from "react-redux"
import {requestUsers, follow, unfollow} from "../../state/users-reducer"
import React from "react"
import Users from "./Users"
import Preloader from "../common/Preloader"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersList
} from "../../state/users-selector"
import {UserType} from "../../types/types";
import {AppStateType} from "../../state/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
    users: Array<UserType>
}
type MapDispatchPropsType = {
    requestUsers: (currentP:number, sizeP:number)=>void
    follow: (userId:number)=>void
    unfollow: (userId:number)=>void
}

type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
type StateType = {}

class UsersContainer extends React.Component<PropsType, StateType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber:number) => {
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

function mapStateToProps(state:AppStateType):MapStatePropsType {
    return {
        users: getUsersList(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    requestUsers
})(UsersContainer)