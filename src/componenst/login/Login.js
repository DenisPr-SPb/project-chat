import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import loginFormSchema from "../formValidation/LoginFormSchema";
import {NavLink} from "react-router-dom";
import RoundedButton from "../common/buttons/rounded-btn/RoundedButton";

export default function Login ({login, isAuth, error}) {

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false
    }

    if (isAuth) {
        return <NavLink to='/profile'>Profile</NavLink>
    }

    return (
        <div className="login__wrapper">
            <div className="login__title">
                <h1>Login</h1>
            </div>
            <div className="login__form__wrapper">
                <Formik initialValues={initialValues}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            const {email, password, rememberMe} = values
                            login(email, password, rememberMe)
                        }}
                        validationSchema={loginFormSchema}>
                    {() => (
                        <Form className="form__wrapper">
                            <div className="form__item">
                                <Field type={'text'} name={'email'} placeholder={'email'}/>
                            </div>
                            <ErrorMessage name="email" component="div"/>

                            <div className="form__item">
                                <Field type={'password'} name={'password'} placeholder={'password'}/>
                            </div>
                            <ErrorMessage name="password" component="div"/>

                            <div className="form__item">
                                <Field type={'checkbox'} name={'rememberMe'}/>
                                <label htmlFor={'rememberMe'}> remember me </label>
                            </div>

                            <div className="form__item">
                                <RoundedButton logo={'Log in'} type={'submit'}/>
                                {error && <div style={{color: 'red'}}>{error}</div>}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}