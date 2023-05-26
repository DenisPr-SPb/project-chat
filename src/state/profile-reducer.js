const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE ='SET-USER-PROFILE'

const initialState = {
    posts: [
        {id: 12, post: 'Hey', date: '', likes: 1},
        {id: 22, post: 'Some', date: '', likes: 1},
        {id: 32, post: 'Data', date: '', likes: 1},
        {id: 42, post: 'new Data', date: '', likes: 6}
    ],
    newPostText: '',
    profile: null
}
/**
 * @param {Object} state
 * @param {string} action
 * @returns {Object}
 */
export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            const postInfo = {
                id: Date.now(),
                post: state.newPostText,
                date: new Date(),
                likes: Math.floor(Math.random() * 100)
            }
            return {
                ...state,
                newPostText: '',
                posts: [postInfo, ...state.posts]
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}

export function addPostActionCreator() {return {type: ADD_POST}}

export function updateNewPostTextActionCreator(text) {return {type: UPDATE_NEW_POST_TEXT, newText: text}}

export function setUserProfile(profile) {return {type: SET_USER_PROFILE, profile}}
