import { call, put, all } from 'redux-saga/effects'
import { NotificationManager} from 'react-notifications'
import i18n from 'i18next'

import { 
    AUTH_SUCCESS, 
    AUTH_FAILURE,
    PARTNER_LOAD_REQUEST,
    SUPPLIER_LOAD_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    RESET_APP_REQUEST,
    CONFIRM_EMAIL_SUCCESS,
    CONFIRM_EMAIL_FAILURE,
} from 'conf/actions'

import { 
    doAuth,
    doRefreshToken,
    doConfirmEmail,
} from 'apis/Auth'

import history from '../history'

export function* authorizeUser({ payload: { email, password, from} } ) {
    try {
        const { accessToken, refreshToken, userRole, userId, displayName } = yield call(doAuth, email, password)

        if ( userRole.supplierId !== null ) {
            yield all ([
                yield put( {type: AUTH_SUCCESS, payload:{email, accessToken, refreshToken, userRole, userId, displayName}}),
                yield put( {type: SUPPLIER_LOAD_REQUEST, payload:{}}),
                history.replace(from),
            ])    
        } else if (userRole.fulfilmentPartnerId !== null) {
            yield all ([
                yield put( {type: AUTH_SUCCESS, payload:{email, accessToken, refreshToken, userRole, userId, displayName}}),
                yield put( {type: PARTNER_LOAD_REQUEST, payload:{ }}),
                history.replace(from),
            ])
            
        }

    } catch (error) {
        const message = 'Something went wrong'
        yield put( {type: AUTH_FAILURE, payload: message})
    }
}

export function* refreshToken({ payload: { r_token } } ) {
    try {
        // eslint-disable-next-line no-shadow
        const { accessToken, refreshToken } = yield call(doRefreshToken, r_token)

        yield all ([
            yield put( {type: REFRESH_TOKEN_SUCCESS, payload:{ accessToken, refreshToken }}),
        ])

    } catch (error) {
        yield all ([
            yield put( {type: RESET_APP_REQUEST, payload:{}}),
        ])
    }
}

export function* confirmEmail({ payload: { token, password, displayName } } ) {
    try {
        const { data } = yield call(doConfirmEmail, token, password, displayName)

        yield all ([
            yield put( {type: CONFIRM_EMAIL_SUCCESS, payload:{ data }}),
            yield put( {type: SUPPLIER_LOAD_REQUEST, payload:{}}),
            NotificationManager.success(i18n.t('login.confirmEmailSuccess')),
            history.replace('/login'),
        ])

    } catch (error) {
        const message = 'Something went wrong'
        yield all ([
            yield put( {type: CONFIRM_EMAIL_FAILURE, payload:message}),
        ])
    }
}
