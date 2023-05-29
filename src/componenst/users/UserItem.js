import userPhoto from '../../assets/images/ava.jpg'
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

export default function UserItem({
                                     user,
                                     follow,
                                     unfollow,
                                     followingInProgress,
                                     toggleFollowingProgress
                                 }) {

    function FollowBtn({followed}) {
        if (followed) {
            return <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                toggleFollowingProgress(true, user.id)
                usersAPI.setUnfollow(user.id)
                    .then(res => {
                        if (res.data.resultCode === 0) {
                            unfollow(user.id)
                        }
                        toggleFollowingProgress(false, user.id)
                    })

            }} className="unfollow__btn">unfollow</button>
        }
        return <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
            toggleFollowingProgress(true, user.id)
            usersAPI.setFollow(user.id)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        follow(user.id)
                    }
                    toggleFollowingProgress(false, user.id)
                })

        }} className="follow__btn">follow</button>
    }

    return (
        <div className='user__item__wrapper'>
            <div className="user__avatar__wrapper">
                <div className="user__avatar">
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt="avatar"/>
                    </NavLink>
                </div>
                <div className="user__follow__btn">
                    <FollowBtn followed={user.followed}/>
                </div>
            </div>
            <div className="user__main__wrapper">
                <div className="user__name">{user.name}</div>
                <div className="user__status">{user.status}</div>
                <div className="user__location">
                    <div className="user__country">Country</div>
                    <div className="user__city">City</div>
                </div>
            </div>
        </div>
    )
}