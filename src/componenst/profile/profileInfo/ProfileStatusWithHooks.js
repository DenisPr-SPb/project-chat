import React from "react";
import {useState} from "react";

export default function ProfileStatusWithHooks({props}) {
    console.log(props)
    const [status, setStatus] = useState(props.status)
    const [editMode, setEditMode] = useState(false)

    function activateEditMode () {
        return setEditMode(true)
    }

    function deactivateEditMOde () {
        setEditMode(false)
        props.updateStatus(status)
    }

    function onStatusChange(e) {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className="profile__status__wrapper">
            <div className="profile__status">
                {!editMode &&
                    <div onClick={activateEditMode} className="status__text">
                        {status || '----'}
                    </div>}

                {editMode &&
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMOde}
                        className="status__input"
                        value={status}/>}
            </div>
        </div>
    )
}