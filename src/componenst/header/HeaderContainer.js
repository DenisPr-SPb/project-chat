import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {setAuthUserData} from "../../state/auth-reducer";
import {loginAPI} from "../../api/api";

class HeaderContainer extends React.Component{

    componentDidMount() {
        loginAPI.setAuth().then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data
                this.props.setAuthUserData(id, email, login)
            }
        })
    }

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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)