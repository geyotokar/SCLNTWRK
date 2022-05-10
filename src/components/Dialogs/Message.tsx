import React from 'react';
import './Dialogs.css'

export type PropsType = {
    message: string
    id: number
}

const Message: React.FC<PropsType> = (props) => {
    return (<div className='message'>
        {props.message}
    </div>)
}

export default Message;
