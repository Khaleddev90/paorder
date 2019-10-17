import { 
    USER_LOGOUT_REQUEST, 
    AUTH_REQUEST, 
    INIT_LOGIN, 
    RESET_APP_REQUEST, 
    REFRESH_TOKEN, 
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILURE, 
    CONFIRM_EMAIL_REQUEST,
} from '../conf/actions'

export function authorizeAction(email, password, from) {
    return {
        type: AUTH_REQUEST,
        payload: {email, password, from},
    }
}

export function confirmEmail(token, password, displayName) {
    return {
        type: CONFIRM_EMAIL_REQUEST,
        payload: {token, password, displayName},
    }
}

export function logout() {
    return {
        type: USER_LOGOUT_REQUEST,
    }
}

export function initLogin() {
    return {
        type: INIT_LOGIN,
    }
}

export function resetApp() {
    return {
        type: RESET_APP_REQUEST,
    }
}

export function userTokenRefreshRequest(refreshToken) {
    return {
        type: REFRESH_TOKEN,
        payload: {r_token: refreshToken},
    }
}

export function userTokenRefreshSuccess() {
    return {
        type: REFRESH_TOKEN_SUCCESS,
        payload: {},
    }
}

export function userTokenRefreshFailure() {
    return {
        type: REFRESH_TOKEN_FAILURE,
        payload: {},
    }
}
