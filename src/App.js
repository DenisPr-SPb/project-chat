import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import { Navbar } from './componenst/navbar/Navbar'
import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './state/app-reducer'
import Preloader from './componenst/common/Preloader'
import UsersPage from './componenst/users/UsersPage'
import Login from './componenst/login/Login'
import { Header } from './componenst/header/Header'

const ProfileContainer = lazy( () => import ('./componenst/profile/ProfileContainer') )
const DialogsPage = lazy( () => import ('./componenst/dialogs/DialogsPage') )

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
                <Header/>
                <Navbar/>
                <div className="main__wrapper">
                    <Suspense fallback={ <Preloader/> }>
                        <Routes>
                            <Route exact path="/" element={ <ProfileContainer/> }/>
                            <Route path="/profile/:userId?" element={ <ProfileContainer/> }/>
                            <Route path="/dialogs" element={ <DialogsPage/> }/>
                            <Route path="/users" element={ <UsersPage/> }/>
                            <Route path="/login" element={ <Login/> }/>
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