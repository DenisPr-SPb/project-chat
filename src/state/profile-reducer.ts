import {profileAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {File} from "buffer";

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
        case "/profile/ADD-POST":
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
        case "/profile/UPDATE-NEW-POST-TEXT":
            return {
                ...state,
                newPostText: action.text
            }
        case "/profile/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "/profile/SET-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "/profile/DELETE-POST":
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case "/profile/SAVE-PHOTO-SUCCESS":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}

type ActionType = InferActionsTypes<typeof actions>

export const actions = {
    addPostActionCreator:()=> {return {type: '/profile/ADD-POST'} as const},
    updateNewPostTextActionCreator:(text:string)=> {return {type: '/profile/UPDATE-NEW-POST-TEXT', text} as const},
    setUserProfile:(profile:ProfileType)=> {return {type: '/profile/SET-USER-PROFILE', profile} as const},
    setStatus:(status:string)=> {return { type: '/profile/SET-STATUS', status} as const},
    deletePost:(postId:number)=> {return {type: '/profile/DELETE-POST', postId} as const},
    savePhotoSuccess:(photos: PhotosType)=> {return {type: '/profile/SAVE-PHOTO-SUCCESS', photos} as const}
}
//THUNK

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export function getUserProfile(userId: number | null):ThunkType {
    return async (dispatch) => {
        try {
            const res = await profileAPI.getProfile(userId)
            dispatch(actions.setUserProfile(res.data))
        } catch (e) {
            console.error(`getUserProfile ${userId}, error: ${e}`)
        }
    }
}

export function getStatus(userId: number):ThunkType {
    return async (dispatch) => {
        try {
            const res = await profileAPI.getStatus(userId)
            dispatch(actions.setStatus(res.data))
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
                dispatch(actions.setStatus(status))
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
                dispatch(actions.savePhotoSuccess(res.data.data.photos))
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