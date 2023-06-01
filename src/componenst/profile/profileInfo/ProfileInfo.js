import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus";
import avaPlug from "../../../assets/images/ava.jpg"

export function ProfileInfo({profile, status, updateStatus}){
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className="info__wrapper">
            <div className="info__avatar">
                <img src={profile.photos.small ? profile.photos.small : avaPlug} alt=""/>
            </div>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
            <div className="info__description">
                <div className="info__name">{profile.fullName}</div>
                <div className="info__about">{profile.aboutMe}</div>
                <div className="job__wrapper">
                    <div className="job__looking">JOB: {profile.lookingForAJob ? 'YES' : 'NO'}</div>
                    <div className="job__looking">{profile.lookingForAJobDescription}</div>
                </div>
                <div className="contact__wrapper">
                    {Object.values(profile.contacts).map((contact, index) => {return <div key={index}>{contact}</div>})}
                </div>
            </div>
        </div>
    )
}