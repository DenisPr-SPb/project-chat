import Preloader from "../../common/Preloader";
import avaPlug from "../../../assets/images/ava.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export function ProfileInfo({props, isOwner, savePhoto}){
    if (!props.profile) {
        return <Preloader/>
    }

    function onAvatarPhotoSelected(e) {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className="info__wrapper">
            <div className="info__avatar">
                <img src={props.profile.photos.small ? props.profile.photos.small : avaPlug} alt=""/>
                { isOwner && <input type={'file'} onChange={onAvatarPhotoSelected}/> }
            </div>
            <ProfileStatusWithHooks props={props}/>
            <div className="info__description">
                <div className="info__name">{props.profile.fullName}</div>
                <div className="info__about">{props.profile.aboutMe}</div>
                <div className="job__wrapper">
                    <div className="job__looking">JOB: {props.profile.lookingForAJob ? 'YES' : 'NO'}</div>
                    <div className="job__looking">{props.profile.lookingForAJobDescription}</div>
                </div>
                <div className="contact__wrapper">
                    {Object.values(props.profile.contacts).map((contact, index) => {return <div key={index}>{contact}</div>})}
                </div>
            </div>
        </div>
    )
}