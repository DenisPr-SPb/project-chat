import React, {ChangeEvent} from "react";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../state/redux-store'
import { updateStatus } from '../../../state/profile-reducer'


export default function ProfileStatus({}) {
    const dispatch = useDispatch()

    const propsStatus = useSelector((state: AppStateType) => state.profilePage.status)
    const updateStatusDispatch = (status: string) => {
        //@ts-ignore
        dispatch(updateStatus(status))
    }

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
        updateStatusDispatch(status)
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