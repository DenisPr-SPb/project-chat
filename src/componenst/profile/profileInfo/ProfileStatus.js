import React from "react";

export default function ProfileStatus ({status}) {
    return (
        <div className="profile__status__wrapper">
            <div className="profile__status">
                <div className="status__text">{status}</div>
                <input type="text" className="status__input" placeholder='your status' value={status}/>
            </div>
        </div>
    )
}