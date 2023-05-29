import {NavLink} from "react-router-dom";
import headerLogo from "../../assets/header/header-logo.jpg"

export function Header({props}) {
    return (
        <header className='header__wrapper'>
            <div className='header__img__wrapper'>
                <img src={headerLogo} alt="Some"/>
                <div className="header__logo__name">Peace Among World!</div>
            </div>
            <div className="header__login__wrapper">
                {props.isAuth ? props.login : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}