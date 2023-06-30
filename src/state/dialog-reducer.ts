import { CompanionType, MessageType } from '../types/types'
import { InferActionsTypes } from './redux-store'

const initialState = {
    companions: [
        { id: 1, name: 'DDD' },
        { id: 2, name: 'AAA' },
        { id: 3, name: 'WWW' }
    ] as Array<CompanionType>,
    messages: [
        { id: 11, message: 'Some', sender: '' },
        { id: 21, message: 'Soe', sender: '' },
        { id: 31, message: 'Yo', sender: '' }
    ] as Array<MessageType>,
    newMsgText: '' as string | null
}

export type InitialStateType = typeof initialState

export default function dialogsReducer( state = initialState, action: ActionType ): InitialStateType {
    switch ( action.type ) {
        case '/dialog/SEND-MESSAGE':
            const msgData = {
                id: Date.now(),
                message: state.newMsgText,
                sender: ''
            }
            return {
                ...state,
                newMsgText: '',
                messages: [ ...state.messages, msgData ],
            }

        case '/dialog/UPDATE-NEW-MSG-TEXT':
            return {
                ...state,
                newMsgText: action.newMsgText
            }

        default:
            return state
    }
}

type ActionType = InferActionsTypes<typeof actions>

export const actions = {
    sendMessageCreator: () => {
        return { type: '/dialog/SEND-MESSAGE' } as const
    },
    updateNewMessageTextCreator: ( text: string ) => {
        return { type: '/dialog/UPDATE-NEW-MSG-TEXT', newMsgText: text } as const
    }
}