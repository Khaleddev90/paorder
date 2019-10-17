import { handleActions } from 'redux-actions'

const defaultState = {
    loading: false,
    users: [],
    error: null,
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
    
    GET_USER_LIST_SUCCESS: (state, {payload: {data}}) => ({
        ...state,
        users: data,
    }),

    GET_USER_LIST_FAILURE: (state, {payload: error}) => ({
        ...state,
        error,
    }),

    RESET_PASSWORD_REQUEST: (state) => ({
        ...state,
        error: null,

    }),

    RESET_PASSWORD_SUCCESS: (state, {payload: {data}}) => ({
        ...state,
        error: null,
    }),

    RESET_PASSWORD_FAILURE: (state, {payload: error}) => ({
        ...state,
        error,
    }),

    LOADING_FINISH: (state) => ({
        ...state,
        loading: false,
    }),

    LOADING_START: (state) => ({
        ...state,
        loading: true,
    }),
}, defaultState)
