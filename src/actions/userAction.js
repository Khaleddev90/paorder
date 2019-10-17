import { 
    GET_USER_LIST_REQUEST, 
    INVITE_NEW_USER_REQUEST, 
    CHANGE_PERMISSION_REQUEST, 
    RESET_PASSWORD_REQUEST,
    DEACTIVATE_USER_REQUEST,
    RESET_PASSWORD_CONFIRM_REQUEST,
    NEW_REGISTRATION_LINK_REQUEST,
} from '../conf/actions'

export function getUserList () {
    return {
        type: GET_USER_LIST_REQUEST,
        payload: {},
    }
}

export function inviteNewUser (email, manager) {
    return {
        type: INVITE_NEW_USER_REQUEST,
        payload: {email, manager},
    }
}

export function deactivateUser (userId, activate) {
    return {
        type: DEACTIVATE_USER_REQUEST,
        payload: {userId, activate},
    }
}

export function changePermission (userId, admin) {
    return {
        type: CHANGE_PERMISSION_REQUEST,
        payload: {userId, admin},
    }
}

export function resetPassword (email) {
    return {
        type: RESET_PASSWORD_REQUEST,
        payload: {email},
    }
}

export function resetPasswordConfirm(userId, jwtToken, password) {
    return {
        type: RESET_PASSWORD_CONFIRM_REQUEST,
        payload: {userId, jwtToken, password},
    }
}

export function newRegisterationLink(userId) {
    return {
        type: NEW_REGISTRATION_LINK_REQUEST,
        payload: {userId},
    }
}
