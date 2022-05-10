import React from 'react';
import './Dialogs.css'
import Dialog from "./Dialog";
import Message from "./Message";
import {actions} from "../../REDUX/dialogs-reducer";
import AddMessageForm from "./AddMessageForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../REDUX/redux-store";

const Dialogs: React.FC = () => {
    const dialogs = useSelector((state: AppStateType) => state.dialogsPage.dialogs)
    const messages = useSelector((state: AppStateType) => state.dialogsPage.messages)
    const dispatch = useDispatch()
    const sendMessageCB = (body: string) => {
        dispatch(actions.sendMessage(body))
    }
    let dialogElements =
        dialogs.map(d => <Dialog name={d.name} id={d.id} isOnline={d.isOnline} key={d.id}/>)
    let messageElements =
        messages.map(m => <Message message={m.message} id={m.id} key={m.id}/>)
    return (
        <div className='dialogsContainer'>
            <div className='dialogs'>
                {dialogElements}
            </div>
            <div className='messages'>
                <div>{messageElements}</div>
            </div>
            <AddMessageForm sendMessage={sendMessageCB}/>
        </div>
    )
};

export default Dialogs;
