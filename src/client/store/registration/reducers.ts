import {
} from "./actions";
import {CreateAccountDto} from "../../../common/dto/auth/create-account.dto";
import {RegistrationActionTypes} from "./types";

const initialState: CreateAccountDto = {
    email: '',
    password: '',
    fio: '',
    phone: ''
}

export function registrationReducer (
    state = initialState,
    action: RegistrationActionTypes
): any {
    switch (action.type) {
        case "SIGNUP_USER":
            return {...state, state: action.payload}
        default:
            return state;
    }
}