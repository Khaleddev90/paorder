import { handleActions } from 'redux-actions'

const defaultState = {
    authorized: false,
    load: false,
    email: null,
    token: null,
    refreshToken: null,
    error: null,
    userRole: null,
    userId: null,
    displayName: '',
    users: [],
    confirmEmailToken: '',
}

export default handleActions({

    HIDE_LOADING: (state) => ({
        ...state,
        loading: false,
        error: null,
    }),
    
    RESET_APP_REQUEST: (state) => ({
        defaultState,
    }),

    INIT_LOGIN: (state) => ({
        ...state,
        loading: false,
        error: null,
    }),

    AUTH_REQUEST: (state) => ({
        ...state,
        loading: true,
        error: null,

    }),

    AUTH_SUCCESS: (state, { payload: { email, accessToken, refreshToken, userRole, userId, displayName }}) => ({
        ...state,
        token: accessToken,
        refreshToken: refreshToken,
        email: email,
        userRole: userRole,
        authorized: true,
        displayName: displayName,
        loading: false,
        error: null,
        userId: userId,
    }),

    INVITE_NEW_USER_SUCCESS: (state, { payload: { confirmEmailToken } }) => ({
        ...state,
        confirmEmailToken: confirmEmailToken,
    }),

    REFRESH_TOKEN_SUCCESS : (state, { payload: { accessToken, refreshToken } } ) => ({
        ...state,
        token: accessToken,
        refreshToken: refreshToken,
        
    }),

    REFRESH_TOKEN_FAILURE : (state) => ({
        defaultState,
        
    }),

    AUTH_FAILURE: (state, {payload: error}) => ({
        ...state,
        error,
        authorized: false,
        email: null,
        userRole: null,
        token: null,
        loading: false,
        userId: null,

    }),

    CONFIRM_EMAIL_FAILURE : (state, { payload: error } ) => ({
        ...state,
        error,
    }),

    CONFIRM_EMAIL_SUCCESS : (state) => ({
        ...state,
        error: null,
        
    }),

    RESET_PASSWORD_CONFIRM_FAILURE : (state, { payload: error } ) => ({
        ...state,
        error,        
    }),
    
    RESET_PASSWORD_CONFIRM_REQUEST : (state) => ({
        ...state,
        error: null,
        
    }),
    
    USER_LOGOUT_REQUEST: (state) => ({
        ...state,
        authorized: false,
        email: null,
        userRole: null,
        token: null,
        userId: null,

    }),

}, defaultState)
