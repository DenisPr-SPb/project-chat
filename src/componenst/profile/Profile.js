import {ProfileInfo} from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";

export function Profile({props, profile}) {
    return (
        <div className='profile__wrapper'>
            <div className='img__wrapper'>
            </div>
            <ProfileInfo profile={profile}/>
            <MyPostsContainer/>
        </div>
    )
}