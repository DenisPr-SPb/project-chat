import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {getStatus, getUserProfile, savePhoto, saveProfileData, updateStatus} from "../../state/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../hocs/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    profileRefresh() {
        let userId = this.props.router.params.userId

        if (!userId) {
            userId = this.props.loggedUserId.toString()
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.profileRefresh()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.profileRefresh()
        }
    }

    render() {
        return (
            <Profile
                isOwner={!this.props.router.params.userId}
                props={this.props}
                savePhoto={this.props.savePhoto}
                saveProfileData={this.props.saveProfileData}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        loggedUserId: state.auth.userId,
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfileData}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)