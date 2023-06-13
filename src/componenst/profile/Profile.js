import {ProfileInfo} from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";
import style from "./Profile.module.css"

export function Profile({props, isOwner, savePhoto, saveProfileData}) {
    return (
        <div className={style.profile__wrapper}>
            <ProfileInfo props={props} isOwner={isOwner} savePhoto={savePhoto} saveProfileData={saveProfileData}/>
            <MyPostsContainer/>
        </div>
    )
}