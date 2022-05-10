import {authAPI, ResultCodeForCaptchaEnum, ResultCodesEnum, securityAPI} from "../API/api";
import {BaseThunkType, InferActionsType} from "./redux-store";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaURL: null as string | null
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
//ACTION CREATORS
type ActionsType = InferActionsType<typeof actions>
export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USER_DATA', payload: {id, email, login, isAuth}
    } as const),
    getCaptchaURLSuccess: (captchaURL: string | null) => ({
        type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: {captchaURL}
    } as const)
}
//THUNKS CREATORS
export const getAuthUserData = (): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, captcha: string | null): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    let data = await authAPI.login(email, password, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        await dispatch(getAuthUserData()) //are we need to use 3 times await or first is enough?
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl());
        }
//        let message = data.messages.length > 0 ? data.messages[0] : "Login error";
//        dispatch(stopSubmit("login", {_error: message}));
    }
}
export const getCaptchaUrl = (): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaURL = data.url;
    dispatch(actions.getCaptchaURLSuccess(captchaURL));
}
export const logout = (): BaseThunkType<ActionsType> =>
    async (dispatch) => {
    let data = await authAPI.logout();
    if (data.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer