import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../state/auth-reducer";
import {compose} from "redux";


class LoginContainer extends React.Component {

    render() {
        return (
            <Login
                login={this.props.login}
                isAuth={this.props.isAuth}
                error={this.props.error}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth,
        error: state.auth.error
    }
}

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation()
//         let navigate = useNavigate()
//         let params = useParams()
//         return (
//             <Component
//                 {...props}
//                 router={{location, navigate, params}}
//             />
//         );
//     }
//
//     return ComponentWithRouterProp
// }
//
// const WithURLDataContainerComponent = withRouter(ProfileContainer)


export default compose(
    connect(mapStateToProps, {login})
)(LoginContainer)