import React, {useEffect, useState} from 'react';
import './Profile.css';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const activateEditMode = () => {setEditMode(true)}
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {setStatus(e.currentTarget.value)};
    return (
        <div>
            {!editMode &&
        <div>
            <span onDoubleClick={activateEditMode}>{props.status || '-------------'}</span>
        </div>}
            {editMode &&
            <div>
                <input className='profileDataBlock__textarea' onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
            </div>}
        </div>
    )
}

export default ProfileStatus;