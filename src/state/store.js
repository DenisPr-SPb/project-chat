import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialog-reducer";

const store = {
    _state : {
        dialogPage: {
            companions: [
                {id: 1, name: 'DDD'},
                {id: 2, name: 'AAA'},
                {id: 3, name: 'WWW'}
            ],
            messages: [
                {id: 11, message: 'Some', sender: ''},
                {id: 21, message: 'Soe', sender: ''},
                {id: 31, message: 'Yo', sender: ''}
            ],
            newMsgText: ''
        },
        profilePage:{
            posts: [
                {id: 12, post: 'Hey', date: '', likes: 1},
                {id: 22, post: 'Some', date: '', likes: 1},
                {id: 32, post: 'Data', date: '', likes: 1},
                {id: 42, post: 'new Data', date: '', likes: 6}
            ],
            newPostText: ''
        },
        sideBar: []
    },
    _callSubscriber () {
        console.log('State changed')
    },

    getState () {
        return this._state
    },
    subscribe (observer) {
        this._callSubscriber = observer
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)

        return this._callSubscriber(this._state)
    }

}

window.store = store

export default store