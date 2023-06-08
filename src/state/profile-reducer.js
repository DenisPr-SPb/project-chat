import {profileAPI} from "../api/api";

const ADD_POST = '/profile/ADD-POST'
const UPDATE_NEW_POST_TEXT = '/profile/UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE ='/profile/SET-USER-PROFILE'
const SET_STATUS = '/profile/SET-STATUS'
const DELETE_POST = '/profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = '/profile/SAVE-PHOTO-SUCCESS'

const initialState = {
    posts: [
        {id: 12, post: 'Hey', date: '', likes: 1},
        {id: 22, post: 'Some', date: '', likes: 1},
        {id: 32, post: 'Data', date: '', likes: 1},
        {id: 42, post: 'new Data', date: '', likes: 6}
    ],
    newPostText: '',
    profile: null,
    status: ''
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
                newPostText: action.text
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }
}

export function addPostActionCreator() {return {type: ADD_POST}}

export function updateNewPostTextActionCreator(text) {return {type: UPDATE_NEW_POST_TEXT, text}}

export function setUserProfile(profile) {return {type: SET_USER_PROFILE, profile}}

export function setStatus(status) {return { type: SET_STATUS, status}}

export function deletePost(postId) {return {type: DELETE_POST, postId}}

export function savePhotoSuccess(photos) {return {type: SAVE_PHOTO_SUCCESS, photos}}

//THUNK

export function getUserProfile(userId) {
    return async (dispatch) => {
        const res = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(res.data))
    }
}

export function getStatus(userId) {
    return async (dispatch) => {
        const res = await profileAPI.getStatus(userId)
        dispatch(setStatus(res.data))
    }
}

export function updateStatus(status) {
    return async (dispatch) => {
        const res = await profileAPI.updateStatus(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}
export function savePhoto(file) {
    return async (dispatch) => {
        const res = await profileAPI.savePhoto(file)
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos))
        }
    }
}