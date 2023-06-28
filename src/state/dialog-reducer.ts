import {CompanionType, MessageType} from "../types/types";

const SEND_MESSAGE = '/dialog/SEND-MESSAGE'
const UPDATE_NEW_MSG_TEXT = '/dialog/UPDATE-NEW-MSG-TEXT'

const initialState = {
    companions: [
        {id: 1, name: 'DDD'},
        {id: 2, name: 'AAA'},
        {id: 3, name: 'WWW'}
    ] as Array<CompanionType>,
    messages: [
        {id: 11, message: 'Some', sender: ''},
        {id: 21, message: 'Soe', sender: ''},
        {id: 31, message: 'Yo', sender: ''}
    ] as Array<MessageType>,
    newMsgText: '' as string | null
}

export type InitialStateType = typeof initialState

export default function dialogsReducer (state = initialState, action: ActionType): InitialStateType {
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
                messages: [...state.messages, msgData],
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

type ActionType = SendMessageCreatorACType | UpdateNewMessageTextCreatorACType

type SendMessageCreatorACType = {
    type: typeof SEND_MESSAGE
}
export function sendMessageCreator():SendMessageCreatorACType {
    return {type: SEND_MESSAGE}
}

type UpdateNewMessageTextCreatorACType = {
    type: typeof UPDATE_NEW_MSG_TEXT
    newMsgText: string
}
export function updateNewMessageTextCreator (text:string):UpdateNewMessageTextCreatorACType {
    return {type: UPDATE_NEW_MSG_TEXT, newMsgText: text}
}