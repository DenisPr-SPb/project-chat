import {Route, Routes, useLocation, useNavigate, useParams} from "react-router-dom";
import './App.css';
import {Navbar} from "./componenst/navbar/Navbar";
import DialogsContainer from "./componenst/dialogs/DialogsContainer";
import UsersContainer from "./componenst/users/UsersContainer";
import ProfileContainer from "./componenst/profile/ProfileContainer";
import HeaderContainer from "./componenst/header/HeaderContainer";
import LoginContainer from "./componenst/login/LoginContainer";
import React, {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./state/app-reducer";
import Preloader from "./componenst/common/Preloader";

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className="app__wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="main__wrapper">
                    <Routes>
                        <Route path='/profile/:userId?'
                               Component={() => <ProfileContainer/>}/>
                        <Route path='/dialogs'
                               Component={() => <DialogsContainer/>}/>
                        <Route path='/users'
                               Component={() => <UsersContainer/>}/>
                        <Route path='/login'
                               Component={() => <LoginContainer/>}/>
                    </Routes>

                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        initialized: state.app.initialized
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
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App)