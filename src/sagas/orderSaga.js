import { call, put, all } from 'redux-saga/effects'
import { store } from '../store'
import history from '../history'
import { NotificationManager } from 'react-notifications'
import i18n from 'i18next'
import {
    PARTNER_LOAD_SUCCESS,
    PARTNER_LOAD_FAILURE,
    SUPPLIER_LOAD_SUCCESS,
    SUPPLIER_LOAD_FAILURE,
    PARTNER_ORDER_EVENT_SUCCESS,
    PARTNER_ORDER_EVENT_FAILURE,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_SUCCESS,
    LOAD_ORDER_BY_QRCODE_SUCCESS,
    LOAD_ORDER_BY_QRCODE_FAILURE,
    UPLOAD_PICTURE_SUCCESS,
    UPLOAD_PICTURE_FAILURE,
    ADD_EVENT_SUCCESS,
    ADD_EVENT_FAILURE,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILURE,
    ADD_ANSWER_SUCCESS,
    ADD_ANSWER_FAILURE,
    MARK_AS_READ_ORDER_SUCCESS,
    GET_TAGS_REQUEST,
    MARK_AS_READ_ORDER_FAILURE,
    ADD_TRACKING_NUMBER_SUCCESS,
    ADD_TRACKING_NUMBER_FAILURE,
    ADD_BOOKING_FAILURE,
    PARTNER_LOAD_REQUEST,
    SUPPLIER_LOAD_REQUEST,
    LOAD_ORDER_BY_QRCODE_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE,
    DELETE_BOOKING_ITEM_SUCCESS,
    DELETE_BOOKING_ITEM_FAILURE,
    ADD_TAG_FAILURE,
    ADD_TAG_SUCCESS,
    GET_TAGS_FAILURE,
    GET_TAGS_SUCCESS,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAILURE,
    DELETE_TAGBYID_SUCCESS,
    DELETE_TAGBYID_FAILURE,
    UPDATE_TAGBYID_SUCCESS,
    UPDATE_TAGBYID_FAILURE,
    UPDATE_DELIVERY_ADDRESS_SUCCESS,
    UPDATE_DELIVERY_ADDRESS_FAILURE,
} from 'conf/actions'

import {
    doPartnerLoad,
    doPartnerOrderEvent,
    doOrder,
    doLoadOrderByQrcode,
    doUploadPicture,
    doAddEvent,
    doAddItem,
    doAddQuestion,
    doAddAnswer,
    doMarkReadOrder,
    doSupplierLoad,
    doAddBooking,
    doAddTrackingNumber,
    doDeleteItem,
    doDeleteBookingItem,
    doAddTag,
    doDeleteTag,
    doGetTags,
    doDeleteTagById,
    doUpdateTagById,
    doUpdateDeliveryAddress,
} from 'apis/Order'

export function* partnerLoadSaga() {
    try {
        const data = yield call(doPartnerLoad)
        yield all([
            yield put({ type: PARTNER_LOAD_SUCCESS, payload: { data } }),

        ])

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: PARTNER_LOAD_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: PARTNER_LOAD_FAILURE, payload: message })
        }

    }
}

export function* supplierLoadSaga({ payload: { type } }) {
    try {
        const data = yield call(doSupplierLoad, type)
        yield all([
            yield put({ type: SUPPLIER_LOAD_SUCCESS, payload: { data } }),

        ])

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put({ type: SUPPLIER_LOAD_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: SUPPLIER_LOAD_FAILURE, payload: message })
        }

    }
}

export function* partnerOrderEventSaga({ payload: { orderId, event } }) {
    try {
        const data = yield call(doPartnerOrderEvent, orderId, event)
        yield all([
            yield put({ type: PARTNER_ORDER_EVENT_SUCCESS, payload: { data } }),

        ])

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: PARTNER_ORDER_EVENT_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: PARTNER_ORDER_EVENT_FAILURE, payload: message })
        }

    }
}

export function* loadOrderByQrcodeSaga({ payload: { qrcode } }) {
    try {
        const data = yield call(doLoadOrderByQrcode, qrcode)
        yield all([
            yield put({ type: LOAD_ORDER_BY_QRCODE_SUCCESS, payload: { data } }),

        ])

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: LOAD_ORDER_BY_QRCODE_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: LOAD_ORDER_BY_QRCODE_FAILURE, payload: message })
        }

    }
}

export function* createOrderSaga({ payload: { model } }) {
    try {
        const data = yield call(doOrder, model)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: CREATE_ORDER_SUCCESS, payload: { data } }),
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } }),
            ])
        } else {
            yield all([
                yield put({ type: CREATE_ORDER_SUCCESS, payload: { data } }),
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
            ])
        }

    } catch (error) {
        let message = ''
        switch (error.response.status) {
            case 500: message = 'Internal Server Error'
                break
            case 400: message = 'not valid'
                break
            case 422: {
                const errors = error.response.data.errors

                Object.keys(errors).forEach(key => {

                    if (key === 'externalReference') {
                        message = message + 'External Reference: ' + errors[key].msg + ', '
                    }

                    if (key === 'dueDate') {
                        message = message + 'DueDate: ' + errors[key].msg + ', '
                    }

                    if (key === 'device.serialnumber') {
                        message = message + 'Device serialnumber: ' + errors[key].msg + ', '
                    }
                    if (key === 'device.label') {
                        message = message + 'Device Label: ' + errors[key].msg + ', '
                    }
                    if (key === 'delivery.zip') {
                        message = message + 'Delivery Zip: ' + errors[key].msg + ', '
                    }
                    if (key === 'damage.incidentDate') {
                        message = message + 'Damage IncidentDate: ' + errors[key].msg + ', '
                    }
                    if (key === 'damage.description') {
                        message = message + 'Damage Description: ' + errors[key].msg + ', '
                    }
                    if (key === 'customer.email') {
                        message = message + 'Customer Email:' + errors[key].msg + ', '
                    }
                    if (key === 'address.zip') {
                        message = message + 'Address Zip' + errors[key].msg + ', '
                    }
                })
            }
                break
            default:
                message = 'Something went wrong'
        }

        if (error.response && error.response.status === 401) {
            yield put({ type: CREATE_ORDER_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: CREATE_ORDER_FAILURE, payload: { message } })
        }

    }
}

export function* uploadPictureSaga({ payload: { id, photo, type } }) {
    try {
        const data = yield call(doUploadPicture, id, photo, type)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: UPLOAD_PICTURE_SUCCESS, payload: { data } }),
                NotificationManager.success(i18n.t('order.upload_picture_success')),
            ])
        } else {
            yield all([
                yield put({ type: UPLOAD_PICTURE_SUCCESS, payload: { data } }),
                NotificationManager.success(i18n.t('order.upload_picture_success')),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put({ type: UPLOAD_PICTURE_FAILURE, payload: { code: 401 } })
        } else {
            yield all([
                yield put({ type: UPLOAD_PICTURE_FAILURE, payload: message }),
                NotificationManager.error(i18n.t('order.upload_picture_failed')),
            ])
        }
    }
}

export function* addEventSaga({ payload: { fulfilmentOrderId, eventName, qrcode } }) {
    try {
        let data = yield call(doAddEvent, fulfilmentOrderId, eventName)

        yield put({ type: ADD_EVENT_SUCCESS, payload: { data } })

        if (eventName === 'FULFILLED_COMPLETED') {
            data = yield call(doAddEvent, fulfilmentOrderId, 'READY_FOR_SHIPMENT')
            history.push('/processing-complete/' + qrcode)
        }

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } })
        } else {
            yield put({ type: PARTNER_LOAD_REQUEST, payload: {} })
        }

    } catch (error) {
        const message = 'Something went wrong'
        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: {} }),
                yield put({ type: ADD_EVENT_FAILURE, payload: message }),
            ])

        } else {
            yield all([
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
                yield put({ type: ADD_EVENT_FAILURE, payload: message }),
            ])
        }
    }
}

export function* addItemSaga({ payload: { item } }) {
    try {
        const { fulfilmentOrderId, itemType, itemName, itemReference, itemDescription, itemPrice, itemQuantity, qrcode } = item
        const newItemId = yield call(doAddItem, fulfilmentOrderId, itemType, itemName, itemReference, itemDescription)

        yield call(doAddBooking, newItemId, 1, itemPrice, itemQuantity, 'hours', 'description')

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { newItemId } }),
                yield put(history.replace(`/orderitemlist/${qrcode}`)),
            ])
        } else {
            yield all([
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
                yield put(history.replace(`/orderitemlist/${qrcode}`)),
            ])
        }

    } catch (error) {
        return
    }

}

export function* addBookingSaga({ payload: { itemId, bookingTypeId, price, amount, amountUnit, description } }) {
    try {
        const data = yield call(doAddBooking, itemId, bookingTypeId, price, amount, amountUnit, description)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } }),
            ])
        } else {
            yield all([
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'

        yield put({ type: ADD_BOOKING_FAILURE, payload: message })
    }
}

export function* deleteItemSaga({ payload: { fulfilmentOrder, itemId } }) {
    try {
        const newItemId = yield call(doDeleteItem, fulfilmentOrder.id, itemId)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: DELETE_ITEM_SUCCESS, payload: { newItemId } }),
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { newItemId } }),

            ])
        } else {
            yield all([
                yield put({ type: DELETE_ITEM_SUCCESS, payload: { newItemId } }),
                yield put({ type: LOAD_ORDER_BY_QRCODE_REQUEST, payload: {qrcode: fulfilmentOrder.qrcode} }),

            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: DELETE_ITEM_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: DELETE_ITEM_FAILURE, payload: message })
        }

    }

}

export function* deleteBookingItemSaga({ payload: { fulfilmentOrder, bookingId } }) {
    try {
        const newItemId = yield call(doDeleteBookingItem, fulfilmentOrder.id, bookingId)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: DELETE_BOOKING_ITEM_SUCCESS, payload: { newItemId } }),

            ])
        } else {
            yield all([
                yield put({ type: DELETE_BOOKING_ITEM_SUCCESS, payload: { newItemId } }),

            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: DELETE_BOOKING_ITEM_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: DELETE_BOOKING_ITEM_FAILURE, payload: message })
        }
    }

}

export function* addQuestionSaga({ payload: { fulfilmentOrderId, questionTitle } }) {
    try {
        const data = yield call(doAddQuestion, fulfilmentOrderId, questionTitle)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: ADD_QUESTION_SUCCESS, payload: { data } }),
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } }),
                yield put(history.goBack()),
            ])
        } else {
            yield all([
                yield put({ type: ADD_QUESTION_SUCCESS, payload: { data } }),
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
                yield put(history.goBack()),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: ADD_QUESTION_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: ADD_QUESTION_FAILURE, payload: message })
        }

    }
}

export function* updateDeliveryAddressSaga({ payload: { fulfilmentOrder, shippingInfo } }) {
    try {
        const data = yield call(doUpdateDeliveryAddress, fulfilmentOrder.id, shippingInfo)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: UPDATE_DELIVERY_ADDRESS_SUCCESS, payload: { data } }),
                yield put({ type: LOAD_ORDER_BY_QRCODE_REQUEST, payload: { qrcode: fulfilmentOrder.qrcode } }),
            ])
        } else {
            yield all([
                yield put({ type: UPDATE_DELIVERY_ADDRESS_SUCCESS, payload: { data } }),
                yield put({ type: LOAD_ORDER_BY_QRCODE_REQUEST, payload: {qrcode: fulfilmentOrder.qrcode} }),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: UPDATE_DELIVERY_ADDRESS_FAILURE, payload: { code: 401 } })
        } else {
            if (error.response.data.errors.zip) {
                yield put({ type: UPDATE_DELIVERY_ADDRESS_FAILURE, error: error.response.data.errors.zip.msg })
            } else {
                yield put({ type: UPDATE_DELIVERY_ADDRESS_FAILURE, error: message})
            }
            
        }

    }
}

export function* addAnswerSaga({ payload: { questionId, content, qrcode } }) {
    try {
        const data = yield call(doAddAnswer, questionId, content)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: ADD_ANSWER_SUCCESS, payload: { data } }),
                yield put({ type: LOAD_ORDER_BY_QRCODE_REQUEST, payload: { qrcode } }),
            ])
        } else {
            yield all([
                yield put({ type: ADD_ANSWER_SUCCESS, payload: { data } }),
                yield put({ type: LOAD_ORDER_BY_QRCODE_REQUEST, payload: { qrcode } }),
            ])
        }

    } catch (error) {

        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put({ type: ADD_ANSWER_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: ADD_ANSWER_FAILURE, payload: message })
        }

    }
}

export function* markReadOrderSaga({ payload: { fulfilmentOrderId } }) {
    try {
        const data = yield call(doMarkReadOrder, fulfilmentOrderId)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: MARK_AS_READ_ORDER_SUCCESS, payload: { data } }),
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } }),
            ])
        } else {
            yield all([
                yield put({ type: MARK_AS_READ_ORDER_SUCCESS, payload: { data } }),
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: MARK_AS_READ_ORDER_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: MARK_AS_READ_ORDER_FAILURE, payload: message })
        }
    }
}

export function* addTagSaga({ payload: { fulfilmentOrderId, name } }) {
    try {
        const data = yield call(doAddTag, fulfilmentOrderId, name)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: ADD_TAG_SUCCESS, payload: { data } }),
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } }),
                yield put(history.goBack()),
            ])
        } else {
            yield all([
                yield put({ type: ADD_TAG_SUCCESS, payload: { data } }),
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
                yield put(history.goBack()),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: ADD_TAG_FAILURE, payload: { code: 401 } })
        } else if (error.response && error.response.status === 409) {
            yield all([
                yield put({ type: ADD_TAG_FAILURE, payload: message }),
                NotificationManager.error(i18n.t('order.already_added_tag')),
            ])
        } else {
            yield put({ type: ADD_TAG_FAILURE, payload: message })

        }
    }
}

export function* deleteTagSaga({ payload: { fulfilmentOrder, tagId } }) {
    try {
        const data = yield call(doDeleteTag, fulfilmentOrder.id, tagId)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: DELETE_TAG_SUCCESS, payload: { data } }),
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } }),
            ])
        } else {
            yield all([
                yield put({ type: DELETE_TAG_SUCCESS, payload: { data } }),
                yield put({ type: LOAD_ORDER_BY_QRCODE_REQUEST, payload: {qrcode: fulfilmentOrder.qrcode} }),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: DELETE_TAG_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: DELETE_TAG_FAILURE, payload: message })
        }
    }
}

export function* deleteTagbyIdSaga({ payload: { tagId, mergeTagId } }) {
    try {
        const data = yield call(doDeleteTagById, tagId, mergeTagId)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: DELETE_TAGBYID_SUCCESS, payload: { data } }),
                yield put({ type: GET_TAGS_REQUEST, payload: {} }),
                yield put(history.goBack()),
            ])
        } else {
            yield all([
                yield put({ type: DELETE_TAGBYID_SUCCESS, payload: { data } }),
                yield put({ type: GET_TAGS_REQUEST, payload: {} }),
                yield put(history.goBack()),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: DELETE_TAGBYID_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: DELETE_TAGBYID_FAILURE, payload: message })
        }
    }
}

export function* updateTagbyIdSaga({ payload: { tagId, tagName } }) {
    try {
        const data = yield call(doUpdateTagById, tagId, tagName)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: UPDATE_TAGBYID_SUCCESS, payload: { data } }),
                yield put({ type: GET_TAGS_REQUEST, payload: {} }),
                yield put(history.goBack()),
            ])
        } else {
            yield all([
                yield put({ type: UPDATE_TAGBYID_SUCCESS, payload: { data } }),
                yield put({ type: GET_TAGS_REQUEST, payload: {} }),
                yield put(history.goBack()),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: UPDATE_TAGBYID_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: UPDATE_TAGBYID_FAILURE, payload: message })
        }
    }
}

export function* getTagsSaga() {
    try {
        const data = yield call(doGetTags)

        const tags = []

        for (let i = 0; i < data.length; i++) {
            tags[i] = { value: data[i].id, label: data[i].name }
        }
        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: GET_TAGS_SUCCESS, payload: { tags, data } }),
            ])
        } else {
            yield all([
                yield put({ type: GET_TAGS_SUCCESS, payload: { tags, data } }),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'
        if (error.response && error.response.status === 401) {
            yield put({ type: GET_TAGS_FAILURE, payload: { code: 401 } })
        } else {
            yield put({ type: GET_TAGS_FAILURE, payload: message })
        }
    }
}

export function* addTrackingNumberSaga({ payload: { fulfilmentOrderId, trackingNumber, routeTag, carrier } }) {
    try {
        const data = yield call(doAddTrackingNumber, fulfilmentOrderId, trackingNumber, routeTag, carrier)

        const userRole = store.getState().user.userRole
        if (userRole.supplierId !== null) {
            yield all([
                yield put({ type: ADD_TRACKING_NUMBER_SUCCESS, payload: { data } }),
                yield call(doAddEvent, fulfilmentOrderId, 'CLOSED'),
                yield put({ type: SUPPLIER_LOAD_REQUEST, payload: { data } }),
                history.push('/order-complete/' + fulfilmentOrderId),
            ])
        } else {
            yield all([
                yield put({ type: ADD_TRACKING_NUMBER_SUCCESS, payload: { data } }),
                yield call(doAddEvent, fulfilmentOrderId, 'CLOSED'),
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
                history.push('/order-complete/' + fulfilmentOrderId),
            ])
        }

    } catch (error) {
        const message = 'Something went wrong'

        if (error.response && error.response.status === 401) {
            yield put({ type: ADD_TRACKING_NUMBER_FAILURE, payload: { code: 401 } })
        } else {
            yield all([
                yield put({ type: ADD_TRACKING_NUMBER_FAILURE, payload: message }),
                yield call(doAddEvent, fulfilmentOrderId, 'CLOSED'),
                yield put({ type: PARTNER_LOAD_REQUEST, payload: {} }),
                history.push('/order-complete/' + fulfilmentOrderId),
            ])

        }

    }
}
