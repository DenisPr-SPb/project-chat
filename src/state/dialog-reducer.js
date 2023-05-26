const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MSG_TEXT = 'UPDATE-NEW-MSG-TEXT'

const initialState = {
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
}

/**
 * @param {Object} state
 * @param {string} action
 * @returns {Object}
 */
export default function dialogsReducer (state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            const msgData = {
                id: Date.now(),
                message: state.newMsgText,
                sender: ''
            }
            return {
                ...state,
                newMsgText: '',
                messages: [...state.messages, msgData]
            }

        case UPDATE_NEW_MSG_TEXT:
            return {
                ...state,
                newMsgText: action.newMsgText
            }

        default:
            return state
    }
}

export function sendMessageCreator () {
    return {
        type: SEND_MESSAGE
    }
}

export function updateNewMessageTextCreator (text) {
    return {
        type: UPDATE_NEW_MSG_TEXT,
        newMsgText: text
    }
}