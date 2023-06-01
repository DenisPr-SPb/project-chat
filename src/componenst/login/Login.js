import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import loginFormSchema from "../formValidation/LoginFormSchema";

export default function Login () {

    const initialValues = {
        name: '',
        password: '',
        rememberMe: false
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
                            if (!values.name) {
                                errors.name = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        validationSchema={loginFormSchema}>
                    {() => (
                        <Form className="form__wrapper">
                            <div className="form__item">
                                <Field type={'text'} name={'name'} placeholder={'name'}/>
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
                                <button type={'submit'}>Log in</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}