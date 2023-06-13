import RoundedButton from "../../../common/buttons/rounded-btn/RoundedButton";
import style from "./ProfileData.module.css"

function Contacts ({contactKey, contactValue}) {
    return (
        <div>{contactKey}: {contactValue}</div>
    )
}

export default function ProfileData({profile, isOwner, goToEditMode }) {

    return (
        <div className={style.info__description__container}>
            <div className={style.info__name}>Name: {profile.fullName}</div>
            <div className={style.info__about}>About me: {profile.aboutMe}</div>
            <div className={style.job__wrapper}>
                <div className={style.job__looking}>Looking for a job: {profile.lookingForAJob ? 'YES' : 'NO'}</div>
                {profile.lookingForAJob &&
                    <div className={style.job__looking}>My skills: {profile.lookingForAJobDescription}</div>
                }
            </div>
            <div className={style.contact__wrapper}>
                Contacts: {Object.keys(profile.contacts).map((key) => {
                return <Contacts key={key} contactKey={key} contactValue={profile.contacts[key]}/>
            })
            }
            </div>
            { isOwner && <RoundedButton logo={'edit'} action={goToEditMode}/>}
        </div>
    )
}