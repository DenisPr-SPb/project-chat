import React, {ChangeEvent} from "react";
import {useState, useEffect} from "react";

type PropsType = {
    propsStatus: string
    updateStatus: (status:string)=>void
}
export default function ProfileStatus({propsStatus, updateStatus}:PropsType) {
    const [status, setStatus] = useState(propsStatus)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setStatus(propsStatus)
    }, [propsStatus])

    function activateEditMode () {
        return setEditMode(true)
    }

    function deactivateEditMOde () {
        setEditMode(false)
        updateStatus(status)
    }

    function onStatusChange(e: ChangeEvent<HTMLInputElement>) {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className="profile__status__wrapper">
            <div className="profile__status" style={{display:"flex"}}>
                <div>Status: </div>
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