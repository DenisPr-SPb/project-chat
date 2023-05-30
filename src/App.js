import {Route, Routes} from "react-router-dom";
import './App.css';
import {Navbar} from "./componenst/navbar/Navbar";
import DialogsContainer from "./componenst/dialogs/DialogsContainer";
import UsersContainer from "./componenst/users/UsersContainer";
import ProfileContainer from "./componenst/profile/ProfileContainer";
import HeaderContainer from "./componenst/header/HeaderContainer";
import LoginContainer from "./componenst/login/LoginContainer";

export default function App() {
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
