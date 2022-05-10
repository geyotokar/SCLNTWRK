import React from 'react';
import {NavLink} from "react-router-dom";
import './Dialogs.css'
import userPhoto from "../../assets/images/man.jpeg";

type PropsType = {
    id: number
    name: string
    isOnline: boolean
}

const Dialog = (props: PropsType) => {
    const online = (props.isOnline ? 'online' : '')

    return (<div className='dialog'>
        <div className={online}/>
        <NavLink to={`/dialogs/${props.id}`}><img src={userPhoto} alt='user' className='photoUserSmall'/>
            {props.name}</NavLink>
    </div>)
}

export default Dialog;
