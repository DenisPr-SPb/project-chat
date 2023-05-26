import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import axios from "axios";
import {setUserProfile} from "../../state/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.router.params.userId

        if (!userId) {
            userId = 2
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(res => {
            this.props.setUserProfile(res.data)
        })
    }

    render() {
        return (
           <Profile props={this.props} profile={this.props.profile}/>
        )
    }


}

function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile
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
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp
}

const WithURLDataContainerComponent = withRouter(ProfileContainer)


export default connect(mapStateToProps, {setUserProfile})(WithURLDataContainerComponent)