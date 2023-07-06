import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import loginFormSchema from '../formValidation/LoginFormSchema'
import { useNavigate } from 'react-router-dom'
import RoundedButton from '../common/buttons/rounded-btn/RoundedButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../state/redux-store'
import { login } from '../../state/auth-reducer'

export default function Login() {
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
        captchaInput: ''
    }

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captcha)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const error = useSelector ((state: AppStateType) => state.auth.error)

    const dispatch = useDispatch()

    const logging = (email:string, password:string, rememberMe:boolean, captchaInput:string) => {
        dispatch(login(email, password, rememberMe, captchaInput))
    }

    if ( isAuth ) {
        setTimeout( () => navigate( '/profile' ) )
        return <></>
    }

    return (
        <div className="login__wrapper">
            <div className="login__title">
                <h1>Login</h1>
            </div>
            <div className="login__form__wrapper">
                <Formik initialValues={ initialValues }
                        validate={ values => {
                            const errors = {}
                            if ( !values.email ) {
                                errors.email = 'Required'
                            }
                            return errors
                        } }
                        onSubmit={ ( values ) => {
                            const { email, password, rememberMe, captchaInput } = values
                            logging( email, password, rememberMe, captchaInput )
                        } }
                        validationSchema={ loginFormSchema }>
                    { () => (
                        <Form className="form__wrapper">
                            <div className="form__item">
                                <Field type={ 'text' } name={ 'email' } placeholder={ 'email' }/>
                            </div>
                            <ErrorMessage name="email" component="div"/>

                            <div className="form__item">
                                <Field type={ 'password' } name={ 'password' } placeholder={ 'password' }/>
                            </div>
                            <ErrorMessage name="password" component="div"/>

                            <div className="form__item">
                                <Field type={ 'checkbox' } name={ 'rememberMe' }/>
                                <label htmlFor={ 'rememberMe' }> remember me </label>
                            </div>

                            <div className="form__item">
                                <RoundedButton logo={ 'Log in' } type={ 'submit' }/>
                                { error && <div style={ { color: 'red' } }>{ error }</div> }
                            </div>

                            { captchaUrl && <img src={ captchaUrl } alt={ 'captcha' }/> }
                            { captchaUrl && <div className="form__item">
                                <Field type={ 'text' } name={ 'captchaInput' }
                                       placeholder={ 'enter symbols from the picture' }/>
                                <RoundedButton logo={ 'Submit' } type={ 'submit' }/>
                            </div> }
                        </Form>
                    ) }
                </Formik>
            </div>
        </div>
    )
}