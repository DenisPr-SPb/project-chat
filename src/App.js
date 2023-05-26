import './App.css';
import {Header} from "./componenst/header/Header";
import {Navbar} from "./componenst/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import DialogsContainer from "./componenst/dialogs/DialogsContainer";
import UsersContainer from "./componenst/users/UsersContainer";
import ProfileContainer from "./componenst/profile/ProfileContainer";

export default function App() {
    return (
        <div className="app__wrapper">
            <Header/>
            <Navbar/>
            <div className="main__wrapper">
                <Routes>
                    <Route path='/profile/:userId?'
                           Component={() => <ProfileContainer/>}
                    />
                    <Route path='/dialogs'
                           Component={() => <DialogsContainer/>
                           }/>
                    <Route path='/users'
                           Component={() => <UsersContainer/>}/>
                </Routes>

            </div>
        </div>
    );
}
