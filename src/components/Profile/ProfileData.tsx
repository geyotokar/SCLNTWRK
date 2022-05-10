import React, {useState} from 'react';
import './Profile.css';
import ProfileStatusWithHooks from "./ProfileStatus";
import editIcon from "../../assets/images/pencil.jpeg";
import {ContactsType, ProfileType} from "../../REDUX/profile-reducer";
import {Contact} from "./Contact";

type ProfileDataPropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    goToEditMode: () => void
    updateStatus: (status: string) => void
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, status, isOwner, updateStatus, goToEditMode}) => {
    return <div className='profileDataBlock'>
        <div className='profileDataBlock__aboutMe'><ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
        <div className='profileContactBlock'>{
            //todo: contacts
            Object
                .keys(profile.contacts)
                .map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            <div className='profileEditor'>{isOwner && <div onClick={goToEditMode}>
                <img className='profileEditorUploaderIcon uploaderIcon' src={editIcon} alt='edit profile information'/>
            </div>}
            </div>
        </div>
        <Job isOwner={isOwner}
             lookingForAJob={profile.lookingForAJob}
             lookingForAJobDescription={profile.lookingForAJobDescription}/>
    </div>
}

type ProfileDataFormType = {
    updateStatus: (status: string) => void
    onSubmit: (formData: ProfileType) => void
}

export const ProfileDataForm: React.FC<ProfileDataFormType> = ({updateStatus}) => { //FORMIK for edit profile data here
    return (<div className='profileDataBlock profileDataBlock__aboutMe'>Что-то пошло не так...<br/>Настройки временно
        недоступны,<br/>чтобы вернуться - обновите страницу
        <button>{updateStatus}</button>
    </div>)
}

type JobPropsType = {
    isOwner: boolean
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
}

const Job: React.FC<JobPropsType> = (props) => {
    let [job, setJob] = useState(props.lookingForAJob)
    //todo: 1. bug - showing not actual job information
    //      2. make reusable skill-block and parse Description
    //      3. set-button for owner
    return <div>{job ?
        <button className='profileJobToggle lookingForAJob'>АКТИВНО ИЩЕТ РАБОТУ</button>
        : <button className='profileJobToggle'>НЕ В ПОИСКЕ РАБОТЫ</button>}
        <div>{job &&
        <div className='profileSkills'>s k i l l s
            {!props.lookingForAJobDescription ?
                <div>навыки не добавлены</div> : props.lookingForAJobDescription}</div>}
        </div>
    </div>
}