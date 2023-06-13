import {NavLink} from "react-router-dom";
import headerLogo from "../../assets/header/header-logo.jpg"
import RoundedButton from "../common/buttons/rounded-btn/RoundedButton"
import style from './Header.module.css'

export function Header({props}) {
    return (
        <header className={style.header__wrapper}>
            <div className={style.header__img__wrapper}>
                <img src={headerLogo} alt="Some"/>
                <div className={style.header__logo}>
                    <h1 className={style.header__title}>
                        Peace Among World!
                    </h1>
                </div>
            </div>
            <div className={style.header__login__wrapper}>
                {props.isAuth ? <div><RoundedButton logo={"LOGOUT"} action={props.logout}/> </div> : <NavLink to='/login'>Login</NavLink>}
            </div>
        </header>
    )
}