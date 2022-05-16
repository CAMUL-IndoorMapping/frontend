import axios from 'axios'
const URL = 'https://camul2022.pythonanywhere.com'

const userLogin = (email: string, password: string) => {
    axios({
        method: 'get',
        url: `${URL}/account/login`,
        data: {
            email: email,
            password: password
        }
    }).then(function (response) {
        console.log(response)
    })
}

const userSignUp = () => {

}

const userRecoverAccount = () => {

}

const userResetPassword = () => {

}

const userLogout = () => {

}

const userAccountDelete = () => {

}

export {
    userLogin,
    userSignUp,
    userRecoverAccount,
    userResetPassword,
    userLogout,
    userAccountDelete
}