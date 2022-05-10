import {InferActionsType} from "./redux-store";

export type InitialStateType = typeof initialState;
export type DialogType = {
    id: number
    name: string
    isOnline: boolean
}
export type MessageType = {
    id: number
    message: string
}
let initialState = {
    dialogs: [
        {id: 1, name: 'Андрей Гончаров', isOnline: true},
        {id: 2, name: 'Саша Кузнецова', isOnline: false},
        {id: 3, name: 'Дмитрий Ткачев', isOnline: false},
        {id: 4, name: 'Анна Столярова', isOnline: true},
        {id: 5, name: 'Виктор Бондарь', isOnline: false},
        {id: 6, name: 'Валерия Мельникова', isOnline: false}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Привет'},
        {id: 2, message: 'Завтра как обычно?'},
        {id: 3, message: 'Я захвачу кофе'},
    ] as Array<MessageType>,
    newMessageBody: '' as string
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}]
            };
        default:
            return state;
    }
}
//ACTION CREATORS
type ActionsType = InferActionsType<typeof actions>
export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody} as const)
}


export default dialogsReducer