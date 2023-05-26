import {NavLink} from "react-router-dom";

export function DialogItem({name, pathId}) {
    return (
        <div className="dialog__name">
            <NavLink to={`/dialogs/${pathId}`}>{name}</NavLink>
        </div>
    )
}