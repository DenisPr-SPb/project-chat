import style from './Users.module.css'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { FilterType } from '../../state/users-reducer'

const usersSearchFormValidate = ( values: any ) => {
    const errors = {}
    return errors
}

type PropsType = {
    onFilterChanged: (filter:FilterType)=>void
}
type FormType = {
    term: string
    friend: string | null
}

export default function UserSearchForm({onFilterChanged}:PropsType) {

    const submit = ( values: FormType, { setSubmitting }: { setSubmitting: ( isSubmitting: boolean ) => void } ) => {

        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        onFilterChanged(filter)
        
    }


    return (
        <div className={ style.user__form }>
            <Formik
                initialValues={ { term: '', friend: 'null' } }
                validate={ usersSearchFormValidate }
                onSubmit={ submit }>
                { ( { isSubmitting } ) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="term" as='select'>
                            <option value='null'>All</option>
                            <option value='true'>Only followed</option>
                            <option value='false'>Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={ isSubmitting }>Find</button>
                    </Form>
                ) }
            </Formik>
        </div>
    )
}