import {SIGNIN_USER, AuthorizationActionTypes} from "./types";
import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";

const initialState = {
    currentUser: {

    }
}

export function authReducer (
    state = initialState,
    action: AuthorizationActionTypes): any {
    switch (action.type) {
        case 'SIGNIN_USER':
            return {...state, currentUser: action.payload };
        case 'SIGNOUT_USER':
            return {...state, currentUser: {}}
        default:
            return state;
    }
}