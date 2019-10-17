import { call, put, all } from 'redux-saga/effects'
import {store} from '../store'
import history from '../history'
import { NotificationManager} from 'react-notifications'
import i18n from 'i18next'
import { 
    GET_USER_LIST_SUCCESS,
    GET_USER_LIST_FAILURE,
    INVITE_NEW_USER_SUCCESS,
    INVITE_NEW_USER_FAILURE,
    DEACTIVATE_USER_SUCCESS,
    DEACTIVATE_USER_FAILURE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAILURE,
    CHANGE_PERMISSION_SUCCESS,
    CHANGE_PERMISSION_FAILURE,
    NEW_REGISTRATION_LINK_SUCCESS,
    NEW_REGISTRATION_LINK_FAILURE,
} from 'conf/actions'

import { 
    doUserList,
    doInviteNewUser,
    doDeactivateUser,
    doSendResetPasswordToken,
    doChangePermissionUser,
    doResetPasswordConfirm,
    doNewRegisterationLink,
} from 'apis/User'

export function* getUserListSaga() {
    try {
        const fulfilmentPartnerId = store.getState().user.userRole.fulfilmentPartnerId
        const data = yield call(doUserList, fulfilmentPartnerId)
        
        yield put( {type: GET_USER_LIST_SUCCESS, payload:{data}})
        
    } catch (error) {

        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put( {type: GET_USER_LIST_FAILURE, payload: {code: 401}})
        } else {
            yield put( {type: GET_USER_LIST_FAILURE, payload: message})
        }
        
    }
}

export function* inviteNewUserSaga({ payload: { email, manager } }) {
    try {
        const fulfilmentPartnerId = store.getState().user.userRole.fulfilmentPartnerId
        const data = yield call(doInviteNewUser, fulfilmentPartnerId, email, manager)
        
        const data1 = yield call(doUserList, fulfilmentPartnerId)

        const newUserData = data1.filter(item => item.confirmEmailToken === data.confirmEmailToken)

        yield all ([
            yield put( {type: INVITE_NEW_USER_SUCCESS, payload:{confirmEmailToken: data.confirmEmailToken}}),
            NotificationManager.success(i18n.t('order.invite_new_user_success')),
            history.replace({
                pathname: '/user-overview',
                state: { user: newUserData[0] },
            }),
        ])

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put( {type: INVITE_NEW_USER_FAILURE, payload: {code: 401}})
        } else {
            yield all ([
                yield put( {type: INVITE_NEW_USER_FAILURE, payload: message}),
                NotificationManager.error(i18n.t('order.invite_new_user_failed')),
            ])
        }
        
    }
}

export function* resetPasswordSaga({ payload: { email } }) {
    try {
        const data = yield call(doSendResetPasswordToken, email)
        
        yield all ([
            yield put( {type: RESET_PASSWORD_SUCCESS, payload:{data}}),
            NotificationManager.success(i18n.t('order.reset_password_success')),
            history.push('/reset-password/sent'),
        ])

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put( {type: RESET_PASSWORD_FAILURE, payload: {code: 401}})
        } else {
            yield all ([
                yield put( {type: RESET_PASSWORD_FAILURE, payload: message}),
                NotificationManager.error(i18n.t('order.reset_password_failed')),
            ])
        }
    }
}

export function* changePermissionSaga({ payload: { userId, admin } }) {
    try {
        const fulfilmentPartnerId = store.getState().user.userRole.fulfilmentPartnerId
        const data = yield call(doChangePermissionUser, fulfilmentPartnerId, userId, admin)
        yield all ([
            yield put( {type: CHANGE_PERMISSION_SUCCESS, payload:{data}}),
            NotificationManager.success(i18n.t('order.change_permission_success')),
            history.push('/user-management'),
        ])

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put( {type: CHANGE_PERMISSION_FAILURE, payload: {code: 401}})
        } else {
            yield all ([
                yield put( {type: CHANGE_PERMISSION_FAILURE, payload: message}),
                NotificationManager.error(i18n.t('order.change_permission_failed')),
            ])
        }
    }
}

export function* deactivateUserSaga({ payload: { userId, activate } }) {

    const successMessage = (activate ? i18n.t('order.reactivate_user_success'): i18n.t('order.deactivate_user_success'))
    const failureMessage = (activate ? i18n.t('order.reactivate_user_failed'): i18n.t('order.deactivate_user_success'))
    try {
        const fulfilmentPartnerId = store.getState().user.userRole.fulfilmentPartnerId
        const data = yield call(doDeactivateUser, fulfilmentPartnerId, userId, activate)
        yield all ([
            yield put( {type: DEACTIVATE_USER_SUCCESS, payload:{data}}),
            NotificationManager.success(successMessage),
            history.push('/user-management'),
        ])

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put( {type: DEACTIVATE_USER_FAILURE, payload: {code: 401}})
        } else {
            yield all ([
                yield put( {type: DEACTIVATE_USER_FAILURE, payload: message}),
                NotificationManager.error(failureMessage),
            ])
        }
    }
}

export function* resetPasswordConfirmSaga({ payload: { userId, jwtToken, password } }) {
    try {
        const data = yield call(doResetPasswordConfirm, userId, jwtToken, password)
        
        yield all ([
            yield put( {type: RESET_PASSWORD_CONFIRM_SUCCESS, payload:{data}}),
            history.goBack(),
        ])

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put( {type: RESET_PASSWORD_CONFIRM_FAILURE, payload: {code: 401}})
        } else {
            yield put( {type: RESET_PASSWORD_CONFIRM_FAILURE, payload: message})
        }
    }
}

export function* newRegisterationLinkSaga({ payload: { userId } }) {
    try {
        const data = yield call(doNewRegisterationLink, userId)
        
        yield all ([
            yield put( {type: NEW_REGISTRATION_LINK_SUCCESS, payload:{data}}),
            history.goBack(),
        ])

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put( {type: NEW_REGISTRATION_LINK_FAILURE, payload: {code: 401}})
        } else {
            yield put( {type: NEW_REGISTRATION_LINK_FAILURE, payload: message})
        }
    }
}
