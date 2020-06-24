import {SignInDto} from "../../../common/dto/auth/sign-in.dto";
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";

export const SIGNUP_USER = 'SIGNUP_USER'

interface SignUpAction {
    type: typeof SIGNUP_USER
    payload: CreateAccountDto
}

export type RegistrationActionTypes = SignUpAction