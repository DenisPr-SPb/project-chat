import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../state/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


/**
 * @param {Object} state
 * @returns {Object}
 */
function mapStateToProps(state) {
    return {
        newPostText: state.profilePage.newPostText,
        postsData: state.profilePage.posts
    }
}


/**
 * @param {Function} dispatch
 * @returns {Object}
 */
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

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer