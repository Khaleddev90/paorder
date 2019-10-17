import axios from 'axios'

const address = process.env.REACT_APP_AUTH_ENDPOINT

export const doAuth = (email, password) => {
    return new Promise(function(resolve, reject) {
        axios.post(address + '/login', {
            email: email,
            password: password,
        })
            .then(response => {
                resolve(response.data) 

            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const doRefreshToken = (refreshToken) => {
    return new Promise(function(resolve, reject) {
        axios.post(address + '/refresh-token', {
            refreshToken,
        })
            .then(response => {
                resolve(response.data) 

            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const doConfirmEmail = (token, password, displayName) => {
    return new Promise(function(resolve, reject) {
        axios.post(address + '/api/confirm-email/' + token, {
            password: password,
            displayName: displayName,
        })
            .then(response => {
                resolve(response.data) 

            })
            .catch(error => {
                reject(error)
            })
    })
    
}
