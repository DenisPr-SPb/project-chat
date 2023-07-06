import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import { Navbar } from './componenst/navbar/Navbar'
import HeaderContainer from './componenst/header/HeaderContainer'
import React, { Component, Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './state/app-reducer'
import Preloader from './componenst/common/Preloader'
import UsersPage from './componenst/users/UsersPage'

const LoginContainer = lazy( () => import ('./componenst/login/LoginContainer') )
const ProfileContainer = lazy( () => import ('./componenst/profile/ProfileContainer') )
const DialogsContainer = lazy( () => import ('./componenst/dialogs/DialogsContainer') )

class App extends Component {

    catchAllUnhandledErros = ( reason, promise ) => {
        console.log( reason, promise )
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener( 'unhandledrejection', this.catchAllUnhandledErros )
    }

    componentWillUnmount() {
        window.removeEventListener( 'unhandledrejection', this.catchAllUnhandledErros )
    }

    render() {
        if ( !this.props.initializeApp ) {
            return <Preloader/>
        }
        return (
            <div className="app__wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="main__wrapper">
                    <Suspense fallback={ <Preloader/> }>
                        <Routes>
                            <Route exact path="/" element={ <ProfileContainer/> }/>
                            <Route path="/profile/:userId?" element={ <ProfileContainer/> }/>
                            <Route path="/dialogs" element={ <DialogsContainer/> }/>
                            <Route path="/users" element={ <UsersPage/> }/>
                            <Route path="/login" element={ <LoginContainer/> }/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        initialized: state.app.initialized
    }
}

function withRouter( Component ) {
    function ComponentWithRouterProp( props ) {
        let location = useLocation()
        let navigate = useNavigate()
        let params = useParams()
        return (
            <Component
                { ...props }
                router={ { location, navigate, params } }
            />
        )
    }

    return ComponentWithRouterProp
}


export default compose(
    withRouter,
    connect( mapStateToProps, { initializeApp } )
)( App )