import {profileAPI, ResultCodesEnum} from "../API/api";
import {BaseThunkType, InferActionsType} from "./redux-store";

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | undefined
    large: string | undefined
}
export type ProfileType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type PostType = {
    id: number
    name: string
    message: string
    likeCounter: number
}
let initialState = {
    posts: [
        {id: 1, name: 'Ангелина Токарь', message: 'Это мой первый пост', likeCounter: 1},
        {id: 2, name: 'Ангелина Токарь', message: 'Все мы - не одинаково полезные йогурты', likeCounter: 2},
        {id: 3, name: 'Ангелина Токарь', message: 'Скоро будут классные новости. Волнуюсь - не передать словами. Держите кулачки)', likeCounter: 3}
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST': {
            let newPost = {
                id: 4, name: 'Ангелина Токарь', message: action.newPostText, likeCounter: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default:
            return state;
    }
}
//ACTION CREATORS
type ActionsType = InferActionsType<typeof actions>

export const actions = {
    addPost: (newPostText: string) => ({type: 'SN/PROFILE/ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}
//THUNKS CREATORS
export const getUserProfile = (userId: number): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status));
    }
}
export const savePhoto = (file: File): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): BaseThunkType<ActionsType> =>
    async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            await dispatch(getUserProfile(userId));
        } else {
            throw new Error('userId can`t be null')
        }
    } else {
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer