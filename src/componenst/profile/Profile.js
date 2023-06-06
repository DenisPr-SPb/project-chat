import {ProfileInfo} from "./profileInfo/ProfileInfo";
import MyPostsContainer from "./myposts/MyPostsContainer";

export function Profile({props}) {

    return (
        <div className='profile__wrapper'>
            <div className='profile__img__wrapper'>
            </div>
            <ProfileInfo props={props}/>
            <MyPostsContainer/>
        </div>
    )
}