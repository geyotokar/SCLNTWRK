import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType, InferActionsType} from "./redux-store";

let initialState = {
    initialized: false
};
export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}
//ACTION CREATORS
type ActionsType = InferActionsType<typeof actions>
export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}
//THUNKS CREATORS
export const initializeApp = (): BaseThunkType<ActionsType> => async (dispatch) => {
    await dispatch(getAuthUserData());
            dispatch(actions.initializedSuccess());
}

export default appReducer