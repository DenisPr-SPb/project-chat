import React from "react";
import {actions} from "../../../state/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


function MyPostContainer(props) {
    return (
        <MyPosts
            props={props}
        />
    )
}

function mapStateToProps(state) {
    return {
        newPostText: state.profilePage.newPostText,
        postsData: state.profilePage.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateNewPostText: (text) => {
            dispatch(actions.updateNewPostTextActionCreator(text))
        },
        addPost: () => {
           dispatch(actions.addPostActionCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MyPostContainer))