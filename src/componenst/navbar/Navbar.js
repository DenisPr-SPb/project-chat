import {NavLink} from "react-router-dom";

export function Navbar() {
    return (
        <nav className='nav__wrapper'>
            <div className='nav__link'><NavLink to='/profile'>Profile</NavLink></div>
            <div className='nav__link'><NavLink to='/dialogs'>Dialogs</NavLink></div>
            <div className='nav__link'><NavLink to='/users'>Users</NavLink></div>
        </nav>
    )
}