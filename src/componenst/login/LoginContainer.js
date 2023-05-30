import React from "react";
import Login from "./Login";
import {connect} from "react-redux";


class LoginContainer extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <Login/>
        )
    }
}

function mapStateToProps(state) {
    return {
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


export default connect(mapStateToProps, {})(LoginContainer)