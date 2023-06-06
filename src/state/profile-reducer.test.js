import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";

const state = {
    posts: [
        {id: 1, post: 'Hey', date: '', likes: 1},
        {id: 2, post: 'Some', date: '', likes: 1},
        {id: 3, post: 'Data', date: '', likes: 1},
        {id: 4, post: 'new Data', date: '', likes: 6}
    ]
}
it ('new post should be added', () => {
    //1 test data
    const action = addPostActionCreator('Some new text')
    //2 action
    const newState = profileReducer(state,action)
    //3 expectation
    expect(newState.posts.length).toBe(5)
})

it ('after deleting post messages length should be decrement', () => {
    //1 test data
    const action = deletePost(1)
    //2 action
    const newState = profileReducer(state,action)
    //3 expectation
    expect(newState.posts.length).toBe(3)
})

