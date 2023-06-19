import {NavLink} from "react-router-dom";
import style from "./Dialogs.module.css"

export function DialogItem({name, pathId}) {
    return (
        <div className={style.dialog__name}>
            <NavLink to={`/dialogs/${pathId}`}>{name}</NavLink>
        </div>
    )
}