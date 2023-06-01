import {Post} from "./posts/Post";
import React from "react";
import {Field, Form, Formik} from "formik";



export function MyPosts({ postsData, updateNewPostText, addPost, newPostText }) {
    const newPostEl = React.createRef()

    function onAddNewPost () {
        addPost()
    }

    function onPostChange () {
        const text = newPostEl.current.value
        updateNewPostText(text)
    }

    return (
        <div className="posts__wrapper">
            <div>
                <h3>My post</h3>
            </div>
            <div className="post__wrapper">
                <div className="new__post__wrapper">
                    <AddPostForm updateNewPostText={updateNewPostText} addPost={addPost}/>
                </div>
                <div>
                    {postsData.map(el => <Post key={el.id} post={el.post} like={el.likes} id={el.id}/>)}
                </div>
            </div>
        </div>
    )
}

function AddPostForm ({updateNewPostText, addPost}) {
    const addNewPost = (values) => {
        updateNewPostText( values )
        addPost()
    }

    return (
        <Formik
            initialValues={{ newPostBody: "" }}
            onSubmit={(values, {resetForm}) => {
                addNewPost( values.newPostBody )
                resetForm( {values: ''} )}}>
            {() => (
                <Form>
                    <div className="">
                        <Field
                            name={'newPostBody'}
                            as={'textarea'}
                            placeholder={'enter text'}/>
                    </div>

                    <div className="">
                        <button type={'submit'}>Send</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
