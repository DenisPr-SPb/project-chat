import {profileAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {File} from "buffer";

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
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

export default function profileReducer(state = initialState, action: ActionType):InitialStateType {
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
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

type ActionType = AddPostActionCreatorACType | UpdateNewPostTextActionCreatorACType | SetUserProfileACType | SetStatusACType | DeletePostACType | SavePhotoSuccessACType

type AddPostActionCreatorACType = {
    type: typeof ADD_POST
}
export function addPostActionCreator():AddPostActionCreatorACType {return {type: ADD_POST}}

type UpdateNewPostTextActionCreatorACType = {
    type: typeof UPDATE_NEW_POST_TEXT
    text: string
}
export function updateNewPostTextActionCreator(text:string): UpdateNewPostTextActionCreatorACType {return {type: UPDATE_NEW_POST_TEXT, text}}

type SetUserProfileACType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export function setUserProfile(profile:ProfileType):SetUserProfileACType {return {type: SET_USER_PROFILE, profile}}

type SetStatusACType = {
    type: typeof SET_STATUS
    status: string
}
export function setStatus(status:string):SetStatusACType {return { type: SET_STATUS, status}}

type DeletePostACType = {
    type: typeof DELETE_POST
    postId: number
}
export function deletePost(postId:number):DeletePostACType {return {type: DELETE_POST, postId}}

type SavePhotoSuccessACType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export function savePhotoSuccess(photos: PhotosType):SavePhotoSuccessACType {return {type: SAVE_PHOTO_SUCCESS, photos}}



//THUNK

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export function getUserProfile(userId: number | null):ThunkType {
    return async (dispatch) => {
        try {
            const res = await profileAPI.getProfile(userId)
            dispatch(setUserProfile(res.data))
        } catch (e) {
            console.error(`getUserProfile ${userId}, error: ${e}`)
        }
    }
}

export function getStatus(userId: number):ThunkType {
    return async (dispatch) => {
        try {
            const res = await profileAPI.getStatus(userId)
            dispatch(setStatus(res.data))
        } catch (e) {
            console.error(`getStatus userId: ${userId} error: ${e}`)
        }
    }
}

export function updateStatus(status:string):ThunkType {
    return async (dispatch) => {
        try {
            const res = await profileAPI.updateStatus(status)
            if (res.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (e) {
            console.error(`updateStatus ${status}, error: ${e}`)
        }
    }
}
export function savePhoto(file: File):ThunkType {
    return async (dispatch) => {
        try {
            const res = await profileAPI.savePhoto(file)
            if (res.data.resultCode === 0) {
                dispatch(savePhotoSuccess(res.data.data.photos))
            }
        } catch (e) {
            console.error(`savePhoto ${file}, error: ${e}`)
        }
    }
}
export function saveProfileData(profile:ProfileType):ThunkType {
    return async (dispatch, getState) => {
        try {
            const res = await profileAPI.saveProfileData(profile)
            if (res.data.resultCode === 0) {
                await dispatch(getUserProfile(getState().auth.userId))
            }
        } catch (e) {
            console.error(`saveProfileData ${profile}, error: ${e}`)
        }
    }
}