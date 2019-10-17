/* eslint-disable no-shadow */
import { takeEvery, race, take, put, all } from 'redux-saga/effects'
import { store } from '../store'

import {
    userTokenRefreshRequest,
    userTokenRefreshSuccess,
    userTokenRefreshFailure,
    logout,
} from 'actions/authAction'

import {
    partnerLoadSaga,
    partnerOrderEventSaga,
    createOrderSaga,
    loadOrderByQrcodeSaga,
    uploadPictureSaga,
    addEventSaga,
    addItemSaga,
    addQuestionSaga,
    addAnswerSaga,
    markReadOrderSaga,
    supplierLoadSaga,
    addBookingSaga,
    addTrackingNumberSaga,
    deleteItemSaga,
    deleteBookingItemSaga,
    addTagSaga,
    deleteTagSaga,
    getTagsSaga,
    updateTagbyIdSaga,
    deleteTagbyIdSaga,
    updateDeliveryAddressSaga,
} from './orderSaga'

import {
    getUserListSaga,
    inviteNewUserSaga,
    changePermissionSaga,
    resetPasswordSaga,
    deactivateUserSaga,
    resetPasswordConfirmSaga,
    newRegisterationLinkSaga,
} from './userSaga'

import {
    authorizeUser,
    refreshToken,
    confirmEmail,
} from './authSaga'

import {
    AUTH_REQUEST,
    PARTNER_LOAD_REQUEST,
    PARTNER_ORDER_EVENT_REQUEST,
    CREATE_ORDER_REQUEST,
    LOAD_ORDER_BY_QRCODE_REQUEST,
    UPLOAD_PICTURE_REQUEST,
    ADD_EVENT_REQUEST,
    ADD_ITEM_REQUEST,
    ADD_QUESTION_REQUEST,
    ADD_ANSWER_REQUEST,
    ADD_BOOKING_REQUEST,
    MARK_AS_READ_ORDER_REQUEST,
    SUPPLIER_LOAD_REQUEST,
    ADD_TRACKING_NUMBER_REQUEST,
    DELETE_ITEM_REQUEST,
    DELETE_BOOKING_ITEM_REQUEST,
    GET_USER_LIST_REQUEST,
    INVITE_NEW_USER_REQUEST,
    CHANGE_PERMISSION_REQUEST,
    RESET_PASSWORD_REQUEST,
    DEACTIVATE_USER_REQUEST,
    REFRESH_TOKEN,
    LOADING_FINISH,
    LOADING_START,
    CONFIRM_EMAIL_REQUEST,
    RESET_PASSWORD_CONFIRM_REQUEST,
    ADD_TAG_REQUEST,
    DELETE_TAG_REQUEST,
    GET_TAGS_REQUEST,
    DELETE_TAGBYID_REQUEST,
    UPDATE_TAGBYID_REQUEST,
    NEW_REGISTRATION_LINK_REQUEST,
    UPDATE_DELIVERY_ADDRESS_REQUEST,
} from 'conf/actions'

const ignoreActionTypes = ['REFRESH_TOKEN', 'AUTH_REQUEST', LOADING_FINISH, CONFIRM_EMAIL_REQUEST]

function monitorableAction(action) {
    return action.type
        .includes('REQUEST') && ignoreActionTypes
        .every(fragment => !action.type.includes(fragment))
}

function identifyAction(action) {
    return action.type.split('_').slice(0, -1).join('_')
}

function getSuccessType(action) {
    return `${identifyAction(action)}_SUCCESS`
}

function getFailType(action) {
    return `${identifyAction(action)}_FAILURE`
}

function* monitor(monitoredAction) {

    yield put({ type: LOADING_START, payload: {} })

    const { fail } = yield race({
        success: take(getSuccessType(monitoredAction)),
        fail    : take(getFailType(monitoredAction)),
    })

    if (fail && fail.payload && fail.payload.code && fail.payload.code === 401) {

        const refreshToken = store.getState().user.refreshToken

        yield put(userTokenRefreshRequest(refreshToken))

        const { success } = yield race({
            success: take(userTokenRefreshSuccess().type),
            fail    : take(userTokenRefreshFailure().type),
        })

        if (success) {
            yield put(monitoredAction)
        } else {
            yield put(logout())
        }
    }
    yield put({ type: LOADING_FINISH, payload: {} })
}

function* rootSaga() {
    yield all([
        // monitor action
        takeEvery(monitorableAction, monitor),

        // Auth
        takeEvery(AUTH_REQUEST, authorizeUser),

        takeEvery(REFRESH_TOKEN, refreshToken),

        takeEvery(PARTNER_LOAD_REQUEST, partnerLoadSaga),

        // Supplier Load
        takeEvery(SUPPLIER_LOAD_REQUEST, supplierLoadSaga),

        takeEvery(PARTNER_ORDER_EVENT_REQUEST, partnerOrderEventSaga),

        //Create Fulfilment Order
        takeEvery(CREATE_ORDER_REQUEST, createOrderSaga),

        //Load fulfilment Order detail by qrcode
        takeEvery(LOAD_ORDER_BY_QRCODE_REQUEST, loadOrderByQrcodeSaga),

        // upload photo fullfilment order
        takeEvery(UPLOAD_PICTURE_REQUEST, uploadPictureSaga),

        // add event 
        takeEvery(ADD_EVENT_REQUEST, addEventSaga),

        // add Item fulfilment order
        takeEvery(ADD_ITEM_REQUEST, addItemSaga),

        // add question fulfilment order
        takeEvery(ADD_QUESTION_REQUEST, addQuestionSaga),

        // add answer fulfilment question
        takeEvery(ADD_ANSWER_REQUEST, addAnswerSaga),

        // add booking fulfilment item
        takeEvery(ADD_BOOKING_REQUEST, addBookingSaga),

        // Mark as Read fulfilment order
        takeEvery(MARK_AS_READ_ORDER_REQUEST, markReadOrderSaga),

        // add tracking number 
        takeEvery(ADD_TRACKING_NUMBER_REQUEST, addTrackingNumberSaga),

        // delete item
        takeEvery(DELETE_ITEM_REQUEST, deleteItemSaga),

        // delete booking item
        takeEvery(DELETE_BOOKING_ITEM_REQUEST, deleteBookingItemSaga),

        // get user list
        takeEvery(GET_USER_LIST_REQUEST, getUserListSaga),

        // invite user
        takeEvery(INVITE_NEW_USER_REQUEST, inviteNewUserSaga),

        // reset password
        takeEvery(RESET_PASSWORD_REQUEST, resetPasswordSaga),

        // change permission
        takeEvery(CHANGE_PERMISSION_REQUEST, changePermissionSaga),

        // deactivate User
        takeEvery(DEACTIVATE_USER_REQUEST, deactivateUserSaga),

        // confirm email 
        takeEvery(CONFIRM_EMAIL_REQUEST, confirmEmail),

        // add tag
        takeEvery(ADD_TAG_REQUEST, addTagSaga),

        // new registration link
        takeEvery(NEW_REGISTRATION_LINK_REQUEST, newRegisterationLinkSaga),

        // delete tag
        takeEvery(DELETE_TAG_REQUEST, deleteTagSaga),

        // delete tag by id
        takeEvery(DELETE_TAGBYID_REQUEST, deleteTagbyIdSaga),

        // update tag
        takeEvery(UPDATE_TAGBYID_REQUEST, updateTagbyIdSaga),

        // get tags
        takeEvery(GET_TAGS_REQUEST, getTagsSaga),

        // confirm reset password
        takeEvery(RESET_PASSWORD_CONFIRM_REQUEST, resetPasswordConfirmSaga),

        // update delivery address
        takeEvery(UPDATE_DELIVERY_ADDRESS_REQUEST, updateDeliveryAddressSaga),
        
    ])
}
export default rootSaga
