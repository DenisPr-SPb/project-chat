import { Post } from './posts/Post'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import RoundedButton from '../../common/buttons/rounded-btn/RoundedButton'


export function MyPosts( { props } ) {

    return (
        <div className="posts__wrapper">
            <div>
                <h3>My post</h3>
            </div>
            <div className="post__wrapper">
                <div className="new__post__wrapper">
                    <AddPostForm updateNewPostText={ props.updateNewPostText } addPost={ props.addPost }/>
                </div>
                <div>
                    { props.postsData.map( el => <Post key={ el.id } post={ el.post } like={ el.likes }
                                                       id={ el.id }/> ) }
                </div>
            </div>
        </div>
    )
}

function AddPostForm( { updateNewPostText, addPost } ) {
    const addNewPost = ( values ) => {
        updateNewPostText( values )
        addPost()
    }

    return (
        <Formik
            initialValues={ { newPostBody: '' } }
            onSubmit={ ( values, { resetForm } ) => {
                addNewPost( values.newPostBody )
                resetForm( { values: '' } )
            } }>
            { () => (
                <Form>
                    <div className="">
                        <Field
                            name={ 'newPostBody' }
                            as={ 'textarea' }
                            placeholder={ 'enter text' }/>
                    </div>

                    <div className="">
                        <RoundedButton logo={ 'Send' } type={ 'submit' }/>
                    </div>
                </Form>
            ) }
        </Formik>
    )
}
