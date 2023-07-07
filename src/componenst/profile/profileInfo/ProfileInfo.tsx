import Preloader from '../../common/Preloader'
import avaPlug from '../../../assets/images/ava.jpg'
import ProfileStatus from './ProfileStatus'
import { useState } from 'react'
import ProfileData from './profileData/ProfileData'
import ProfileDataForm from './profileData/ProfileDataForm'
import style from './ProfileInfo.module.css'
import { ProfileType } from '../../../types/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../../state/redux-store'
import { saveProfileData } from '../../../state/profile-reducer'


type PropsType = {
    isOwner: boolean
}

export function ProfileInfo({ isOwner }: PropsType){
    const [editMode, setEditMode] = useState(false)
    const profile = useSelector((state:AppStateType) => state.profilePage.profile)
    const dispatch = useDispatch()
    const saveProfileDataDispatch = (formData: {formData: ProfileType}) => {
        //@ts-ignore
        dispatch(saveProfileData(formData))
    }

    if (!profile) {
        return <Preloader/>
    }

    function onUpdateProfileData(formData: {formData: ProfileType}){
        saveProfileDataDispatch(formData)
        setEditMode(false)
    }

    return (
        <div className={style.info__wrapper}>
            <div className={style.avatar__container}>
                <div className={style.info__avatar}>
                    <img src={profile.photos.small ? profile.photos.small : avaPlug} alt=""/>
                </div>

            </div>

            <div className={style.description__container}>
                <ProfileStatus/>

                {editMode
                    ? <ProfileDataForm profile={profile} updateProfileData={onUpdateProfileData}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
            </div>
        </div>
    )
}