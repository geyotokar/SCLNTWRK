import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getStatus,
    getUserProfile,
    updateStatus,
    savePhoto,
    saveProfile,
    ProfileType
} from "../../REDUX/profile-reducer";
import {AppStateType} from "../../REDUX/redux-store";
import {useMatch, useNavigate} from "react-router-dom";
import Preloader from "../../assets/Preloader";
import userPhoto from "../../assets/images/man.jpeg";
import editIcon from "../../assets/images/pencil.jpeg";
import {ProfileData, ProfileDataForm} from "./ProfileData";

//21615
const Profile: React.FC = () => {
    const match = useMatch('/profile/:id')
    const id = Number(match?.params.id)
    const [editMode, setEditMode] = useState(false)
    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.id)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const isOwner: boolean = !!profile && profile.userId === authorizedUserId

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!!id) {
            dispatch(getUserProfile(id))
            dispatch(getStatus(id))
        } else if (isAuth){
            dispatch(getUserProfile(authorizedUserId as number))
            dispatch(getStatus(authorizedUserId as number))
        } else {
            navigate('/login')
        }
    }, [id])

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }
    const onSubmit = (formData: ProfileType) => {
            dispatch(saveProfile(formData))
            setEditMode(false)
    }
    const updateStatusCB = (status: string) => {
        dispatch(updateStatus(status))
    }
    if (!profile) {
        return <Preloader/>
    }
    return <div className='profileInfoBlock'>
        <img src={profile.photos.large || userPhoto} alt='profile' className='profilePhoto profileBlockPhoto'/>
        <div className='profileBlockPhotoUploader'>
            {isOwner && <><input type={"file"} onChange={onMainPhotoSelected} id='profileBlockPhotoUploader'/>
            <label htmlFor='profileBlockPhotoUploader'>
                <img className='profileBlockUploaderIcon uploaderIcon' src={editIcon} alt='choose file'/>
            </label></>}
        </div>
        <div className='profileInfoName'><h1>{profile.fullName}</h1></div>
        <div>{editMode
            ? <ProfileDataForm updateStatus={updateStatusCB} onSubmit={onSubmit}/>
            : <ProfileData profile={profile} status={status}
                           updateStatus={updateStatusCB} isOwner={isOwner}
                           goToEditMode={() => {setEditMode(true)}}
            />}</div>
    </div>
}

export default Profile