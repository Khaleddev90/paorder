import axios from 'axios'
// import {store} from '../store';
const address = process.env.REACT_APP_API_ENDPOINT
const baseUrl = process.env.REACT_APP_AUTH_ENDPOINT

export const doUserList = (fulfilmentPartnerId) => {
    return new Promise(function(resolve, reject) {

        axios.get(address + '/fulfilmentPartners/' + fulfilmentPartnerId + '/users', {})
            .then((response) => {
                resolve(response.data) 
            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const doInviteNewUser = (fulfilmentPartnerId, email, manager) => {
    return new Promise(function(resolve, reject) {

        axios.post(address + '/fulfilmentPartners/' + fulfilmentPartnerId + '/users', {
            email: email,
            manager: manager,
        })
            .then((response) => {
                resolve(response.data) 
            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const doDeactivateUser = (fulfilmentPartnerId, userId, activate) => {
    return new Promise(function(resolve, reject) {

        axios.patch(address + '/fulfilmentPartners/' + fulfilmentPartnerId + '/users/' + userId , {
            isActive: activate,
        })
            .then((response) => {
                resolve(response.data) 
            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const doChangePermissionUser = (fulfilmentPartnerId, userId, admin) => {
    return new Promise(function(resolve, reject) {

        axios.patch(address + '/fulfilmentPartners/' + fulfilmentPartnerId + '/users/' + userId , {
            manager: admin,
        })
            .then((response) => {
                resolve(response.data) 
            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const doSendResetPasswordToken = (email) => {
    return new Promise(function(resolve, reject) {

        axios.post(baseUrl + '/send-reset-password-token', {
            email: email,
        })
            .then((response) => {
                resolve(response.data) 
            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const doResetPasswordConfirm = (userId, jwtToken, password) => {
    return new Promise(function(resolve, reject) {

        axios.post(address + '/users/' + userId + '/reset-password/' + jwtToken, {
            password: password,
        })
            .then((response) => {
                resolve(response.data) 
            })
            .catch(error => {
                reject(error)
            })
    })
    
}

///fulfilmentPartner/api/v1/users/:userId/confirmEmailToken
export const doNewRegisterationLink = (userId) => {
    return new Promise(function(resolve, reject) {

        axios.put(`${address}/users/${userId}/confirmEmailToken`, {
        })
            .then((response) => {
                resolve(response.data) 
            })
            .catch(error => {
                reject(error)
            })
    })
    
}
