import {IReadableAccount} from "../../../common/readable/account/IReadableAccount";
import axios from 'axios';

export const userLoginFetch = user => {
    return dispatch => {
        return axios.post("http://localhost:3000/auth/signIn", {user})
            .then(result  => {
                const body = result.data as IReadableAccount
                if (body === undefined || body === null) {
                    alert('Something wrong, ' + result.statusText)
                } else {
                    localStorage.setItem("accessToken", body.accessToken)
                    dispatch(loginUser(body))
                }
            })
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})