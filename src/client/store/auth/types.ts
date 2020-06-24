import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";

export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNOUT_USER = 'SIGNOUT_USER'

interface AuthAction {
    type: typeof SIGNIN_USER
    payload: IReadableAccount
}

interface SignOutAction {
    type: typeof SIGNOUT_USER
    payload: IReadableAccount
}


export type AuthorizationActionTypes = AuthAction | SignOutAction