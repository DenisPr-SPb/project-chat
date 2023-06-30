import React from 'react'
import Login from './Login'
import { connect } from 'react-redux'
import { login } from '../../state/auth-reducer'
import { compose } from 'redux'


class LoginContainer extends React.Component {

    render() {
        return (
            <Login
                login={ this.props.login }
                isAuth={ this.props.isAuth }
                error={ this.props.error }
                captchaUrl={ this.props.captchaUrl }
            />
        )
    }
}

function mapStateToProps( state ) {
    return {
        captchaUrl: state.auth.captcha,
        isAuth: state.auth.isAuth,
        error: state.auth.error
    }
}

export default compose(
    connect( mapStateToProps, { login } )
)( LoginContainer )