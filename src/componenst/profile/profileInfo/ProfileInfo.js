import Preloader from "../../common/Preloader";
import avaPlug from "../../../assets/images/ava.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useState} from "react";
import RoundedButton from "../../common/buttons/rounded-btn/RoundedButton";
import ProfileDataForm from "./ProfileDataForm";

export function ProfileInfo({props, isOwner, savePhoto, saveProfileData}){
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    function onAvatarPhotoSelected(e) {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    function onUpdateProfileData(formData){
        saveProfileData(formData)
        setEditMode(false)
    }

    return (
        <div className="info__wrapper">
            <div className="info__avatar">
                <img src={props.profile.photos.small ? props.profile.photos.small : avaPlug} alt=""/>
                { isOwner && <input type={'file'} onChange={onAvatarPhotoSelected}/> }
            </div>
            <ProfileStatusWithHooks props={props}/>

            {editMode
                ? <ProfileDataForm profile={props.profile} updateProfileData={onUpdateProfileData}/>
                : <ProfileData profile={props.profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}

        </div>
    )
}

function ProfileData({profile, isOwner, goToEditMode}) {
    return (
        <div className="info__description">
            { isOwner && <RoundedButton logo={'edit'} action={goToEditMode}/> }
            <div className="info__name">Full name: {profile.fullName}</div>
            <div className="info__about">About me: {profile.aboutMe}</div>
            <div className="job__wrapper">
                <div className="job__looking">Looking for a job: {profile.lookingForAJob ? 'YES' : 'NO'}</div>
                {profile.lookingForAJob &&
                    <div className="job__looking">My skills: {profile.lookingForAJobDescription}</div>
                }
            </div>
            <div className="contact__wrapper">
                Contacts: {Object.keys(profile.contacts).map((key) => {
                return <Contacts key={key} contactKey={key} contactValue={profile.contacts[key]}/>
            })
            }
            </div>
        </div>
    )
}

function Contacts ({contactKey, contactValue}) {
    return (
        <div>{contactKey}: {contactValue}</div>
    )
}