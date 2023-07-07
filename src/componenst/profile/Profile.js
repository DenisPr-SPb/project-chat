import { ProfileInfo } from './profileInfo/ProfileInfo'
import MyPostsContainer from './myposts/MyPostsContainer'
import style from './Profile.module.css'

export function Profile( { isOwner } ) {
    return (
        <div className={ style.profile__wrapper }>
            <ProfileInfo
                isOwner={ isOwner }/>
            <MyPostsContainer/>
        </div>
    )
}