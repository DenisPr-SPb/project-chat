import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../state/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


class MyPostContainer extends React.Component {
    render() {
        return (
            <MyPosts
                addPost={this.props.addPost}
                newPostText={this.props.newPostText}
                postsData={this.props.postsData}
                updateNewPostText={this.props.updateNewPostText}/>
        )
    }
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
            dispatch(updateNewPostTextActionCreator(text))
        },
        addPost: () => {
           dispatch(addPostActionCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPostContainer)