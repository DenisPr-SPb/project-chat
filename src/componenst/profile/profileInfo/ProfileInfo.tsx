import Preloader from "../../common/Preloader";
import avaPlug from "../../../assets/images/ava.jpg"
import ProfileStatus from "./ProfileStatus";
import {useState} from "react";
import ProfileData from "./profileData/ProfileData";
import ProfileDataForm from "./profileData/ProfileDataForm";
import style from "./ProfileInfo.module.css"
import {ProfileType} from "../../../types/types";

type PropsType = {
    propsStatus: string
    updateStatus:(status:string)=>void
    isOwner: boolean
    savePhoto: ()=>void
    saveProfileData: (formData: { formData: ProfileType })=>void
    propsProfile: ProfileType
}

export function ProfileInfo({propsStatus, updateStatus, isOwner, savePhoto, saveProfileData, propsProfile}: PropsType){
    const [editMode, setEditMode] = useState(false)

    if (!propsProfile) {
        return <Preloader/>
    }

    function onUpdateProfileData(formData: {formData: ProfileType}){
        saveProfileData(formData)
        setEditMode(false)
    }

    return (
        <div className={style.info__wrapper}>
            <div className={style.avatar__container}>
                <div className={style.info__avatar}>
                    <img src={propsProfile.photos.small ? propsProfile.photos.small : avaPlug} alt=""/>
                </div>

            </div>

            <div className={style.description__container}>
                <ProfileStatus propsStatus={propsStatus} updateStatus={updateStatus}/>

                {editMode
                    ? <ProfileDataForm profile={propsProfile} updateProfileData={onUpdateProfileData} savePhoto={savePhoto}/>
                    : <ProfileData profile={propsProfile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
            </div>
        </div>
    )
}