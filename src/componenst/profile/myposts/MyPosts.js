import {Post} from "./posts/Post";
import React from "react";



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
            <div>My post</div>
            <div className="post__wrapper">
                <div className="new__post__wrapper">
                    <div className="text__area__wrapper">
                        <textarea name="" id="" cols="30" rows="1"
                                  ref={newPostEl}
                                  onChange={onPostChange}
                                  value={newPostText}/>
                    </div>
                    <div className="new__post__btn__wrapper">
                        <button className="new__post__btn" onClick={ onAddNewPost }>Add post</button>
                    </div>
                </div>

                <div>
                    {postsData.map(el => <Post key={el.id} post={el.post} like={el.likes} id={el.id}/>)}
                </div>
            </div>
        </div>
    )
}
