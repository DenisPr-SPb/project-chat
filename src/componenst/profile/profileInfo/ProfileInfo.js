import Preloader from "../../common/Preloader";
import avaPlug from "../../../assets/images/ava.jpg"
import ProfileStatus from "./ProfileStatus";
import {useState} from "react";
import ProfileData from "./profileData/ProfileData";
import ProfileDataForm from "./profileData/ProfileDataForm";
import style from "./ProfileInfo.module.css"

export function ProfileInfo({props, isOwner, savePhoto, saveProfileData}){
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    function onUpdateProfileData(formData){
        saveProfileData(formData)
        setEditMode(false)
    }

    return (
        <div className={style.info__wrapper}>
            <div className={style.avatar__container}>
                <div className={style.info__avatar}>
                    <img src={props.profile.photos.small ? props.profile.photos.small : avaPlug} alt=""/>
                </div>

            </div>

            <div className={style.description__container}>
                <ProfileStatus props={props}/>

                {editMode
                    ? <ProfileDataForm profile={props.profile} updateProfileData={onUpdateProfileData} savePhoto={savePhoto}/>
                    : <ProfileData profile={props.profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
            </div>
        </div>
    )
}