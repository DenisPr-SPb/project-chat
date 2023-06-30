import profileReducer, {actions} from "../state/profile-reducer";
import React from "react";

const state = {
    posts: [
        {id: 1, post: 'Hey', date: '', likes: 1},
        {id: 2, post: 'Some', date: '', likes: 1},
        {id: 3, post: 'Data', date: '', likes: 1},
        {id: 4, post: 'new Data', date: '', likes: 6}
    ]
}
const profile = {
    aboutMe: 'test',
    userId: 777,
    lookingForAJob: true,
    lookingForAJobDescription: 'test',
    fullName: 'Test',
    contacts: {
        github: 'test',
        vk: 'test',
        facebook: 'test',
        instagram: 'test',
        twitter: 'test',
        website: 'test',
        youtube: 'test',
        mainLink: 'test',
    },
    photos: {
        small: 'test',
        large: 'test'
    }
}
it('#TEST - New post text should be updated', () => {
    //1 test data
    const action = actions.updateNewPostTextActionCreator('word')
    //2 action
    const newState = profileReducer(state, action)
    //3 expectation
    expect(newState.newPostText).toBe('word')
})

it('#TEST - New post should be added', () => {
    //1 test data
    const action = actions.addPostActionCreator('Some new text')
    //2 action
    const newState = profileReducer(state, action)
    //3 expectation
    expect(newState.posts.length).toBe(5)
})

it('#TEST - After deleting post messages length should be decrement', () => {
    //1 test data
    const action = actions.deletePost(1)
    //2 action
    const newState = profileReducer(state, action)
    //3 expectation
    expect(newState.posts.length).toBe(3)
})

it('#TEST - Set user profile is OK', () => {
    //1 test data
    const action = actions.setUserProfile(profile)
    //2 action
    const newState = profileReducer(state, action)
    //3 expectation
    expect(newState.profile.userId).toBe(777)
})

it('#TEST - Set user status is OK', () => {
    //1 test data
    const action = actions.setStatus('test')
    //2 action
    const newState = profileReducer(state, action)
    //3 expectation
    expect(newState.status).toBe('test')
})

it('#TEST - Should add profile photo',  () => {
    //1 test data
    const action = actions.savePhotoSuccess(profile.photos)
    //2 action
    const newState = profileReducer(state, action)
    //3 expectation
    expect(newState.profile.photos).toBe(profile.photos)

})
