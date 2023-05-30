import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {getUserProfile} from "../../state/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId

        if (!userId) {
            userId = 28980
        }
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) {
            return <Navigate to={'/login'}/>
        }
        return (
            <Profile props={this.props} profile={this.props.profile}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
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

const WithURLDataContainerComponent = withRouter(ProfileContainer)


export default connect(mapStateToProps, {getUserProfile})(WithURLDataContainerComponent)