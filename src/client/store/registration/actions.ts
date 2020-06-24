import axios from 'axios';

export const userPostFetch = user => {
    return dispatch => {
        return axios.post("http://localhost:3000/auth/signUp", {user})
            .then((result) => {
                const data = result.data as boolean
                if (data) {
                    alert('Пользователь успешно зарегестрировался')
                } else {
                    console.log(result.statusText)
                }
            })
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})