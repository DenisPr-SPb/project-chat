import RoundedButton from "../../../common/buttons/rounded-btn/RoundedButton";
import {Field, Form, Formik} from "formik";
import React from "react";
import style from "./ProfileData.module.css";

export default function ProfileDataForm({profile, updateProfileData,savePhoto}) {
    function addNewProfileData(values) {
        updateProfileData(values)
    }

    const initialValues = profile
    !profile.aboutMe ? initialValues.aboutMe = '' : initialValues.aboutMe = profile.aboutMe

    function jobLookingStatus(e) {
        initialValues.lookingForAJob = e.target.value !== 'true';
    }

    function onAvatarPhotoSelected(e) {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className="profile__form">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, {resetForm}) => {
                    addNewProfileData( values )
                    resetForm( {values: ''} )}}>
                {() => (
                    <Form>
                        <div className="form__fields">
                            {Object.keys(initialValues)
                                .filter(key => {
                                    return (key !== 'lookingForAJob'
                                        && key !== 'lookingForAJobDescription'
                                        && key !== 'contacts'
                                        && key !== 'photos'
                                        && key !== 'userId')
                                } ).map(value => {
                               return <div key={value}><span>{value}</span> <Field className="field" key={value} name={value} placeholder={value}/></div>
                            })}

                            <label>
                                Looking for a job:
                                <Field type={'checkbox'} name={'lookingForAJob'} onClick={jobLookingStatus}/>
                            </label>
                            {initialValues.lookingForAJob && <div>
                                <span>About my skills:</span>
                                <Field
                                    name={'lookingForAJobDescription'}
                                    placeholder={'what about job?'}/>
                            </div>}

                            <div className="form__contacts">
                                <span>CONTACTS:</span>
                                {Object.keys(initialValues.contacts)
                                    .map(key => {
                                        if (initialValues.contacts[key] === null) {
                                           initialValues.contacts[key] = ''
                                        }
                                        return (
                                            <div key={`div-${key}`}>
                                                <span key={`span-${key}`}>{key}</span>
                                                <Field className="field" key={key} name={`contacts.${key}`} placeholder={key}/>
                                            </div>
                                        )
                                    } )}
                            </div>
                        </div>

                        <div className="">
                            <RoundedButton logo={'Send'} type={'submit'}/>
                        </div>
                    </Form>
                )}
            </Formik>

            <div>
                <label> Change avatar:</label>
                <input className={style.input} type={'file'} onChange={onAvatarPhotoSelected}/>
            </div>
        </div>
    )
}