import axios from 'axios';
import {PhotosType, ProfileType} from "../REDUX/profile-reducer";
import {UserType} from "../REDUX/users-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "0af7338a-79a1-4b60-b9f2-2077612a7ef0"}
})
export enum ResultCodesEnum {
    Success = 0,
    Error= 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type ResponseType< D = {}, RC = ResultCodesEnum > = {
    data: D
    messages: Array<string>
    resultCode: RC
}

//USERS API
type GetUsersItems = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 12, term: string = '', friend: null | boolean = null) {
        return instance.get<GetUsersItems>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
            + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    follow (userId: number){
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data) //URI parameters from API-documentation
    },
    unfollow (userId: number){
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },
}

//PROFILE API
type SavePhotoResponseDataType = {
    photos: PhotosType
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/`+userId).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {
            status: status
        }).then(res => res.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {headers:{'Content-Type': 'multipart/form-data'}})
            .then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile).then(res => res.data)
    }
}

//AUTH API
type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseDataType = {
    userId: number
}
export const authAPI = {
    me() {return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)},
    login(email: string, password: string, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>
        (`auth/login`, {email, password, captcha}).then(res => res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

//SECURITY API
type GetCaptchaUrlResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}