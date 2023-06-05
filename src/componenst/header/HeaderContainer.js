import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {logout} from "../../state/auth-reducer";

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header props={this.props}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer)