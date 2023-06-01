import {ProfileInfo} from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";

export function Profile({profile, status, updateStatus}) {

    return (
        <div className='profile__wrapper'>
            <div className='profile__img__wrapper'>
            </div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}