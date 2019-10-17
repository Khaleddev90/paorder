import {
    PARTNER_LOAD_REQUEST,
    SUPPLIER_LOAD_REQUEST,
    PARTNER_ORDER_EVENT_REQUEST,
    CREATE_ORDER_REQUEST,
    LOAD_ORDER_BY_QRCODE_REQUEST,
    UPLOAD_PICTURE_REQUEST,
    ADD_EVENT_REQUEST,
    ADD_ITEM_REQUEST,
    ADD_BOOKING_REQUEST,
    ADD_QUESTION_REQUEST,
    ADD_ANSWER_REQUEST,
    MARK_AS_READ_ORDER_REQUEST,
    ADD_TRACKING_NUMBER_REQUEST,
    DELETE_ITEM_REQUEST,
    DELETE_BOOKING_ITEM_REQUEST,
    HIDE_LOADING,
    ADD_TAG_REQUEST,
    GET_TAGS_REQUEST,
    DELETE_TAG_REQUEST,
    DELETE_TAGBYID_REQUEST,
    UPDATE_TAGBYID_REQUEST,
    UPDATE_DELIVERY_ADDRESS_REQUEST,
} from '../conf/actions'

const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE'
const SET_SORT_TYPE = 'SET_SORT_TYPE'
const SET_CURRENTLY_EDIT = 'SET_CURRENTLY_EDIT'

export function hideLoading() {
    return {
        type: HIDE_LOADING,
        payload: {},
    }
}

export function partnerLoad() {
    return {
        type: PARTNER_LOAD_REQUEST,
        payload: {},
    }
}

export function supplierLoad(type) {
    return {
        type: SUPPLIER_LOAD_REQUEST,
        payload: { type },
    }
}

export function partnerOrderEvent(orderId, event) {
    return {
        type: PARTNER_ORDER_EVENT_REQUEST,
        payload: { orderId, event },
    }
}

export function updateTagbyId(tagId, tagName) {
    return {
        type: UPDATE_TAGBYID_REQUEST,
        payload: { tagId, tagName },
    }
}

export function deleteTagbyId(tagId, tagName) {
    return {
        type: DELETE_TAGBYID_REQUEST,
        payload: { tagId, tagName },
    }
}

export function createOrder(model) {
    return {
        type: CREATE_ORDER_REQUEST,
        payload: { model },
    }
}

export function orderDetail(qrcode) {
    return {
        type: LOAD_ORDER_BY_QRCODE_REQUEST,
        payload: { qrcode },
    }
}

export function uploadPicture(id, photo, type) {
    return {
        type: UPLOAD_PICTURE_REQUEST,
        payload: { id, photo, type },
    }
}

export function addEvent(fulfilmentOrderId, eventName, qrcode) {
    return {
        type: ADD_EVENT_REQUEST,
        payload: { fulfilmentOrderId, eventName, qrcode },
    }
}

export function addItem( item ) {
    return {
        type: ADD_ITEM_REQUEST,
        payload: { item },
    }
}

export function addTrackingNumbner(fulfilmentOrderId, trackingNumber, routeTag, carrier) {
    return {
        type: ADD_TRACKING_NUMBER_REQUEST,
        payload: { fulfilmentOrderId, trackingNumber, routeTag, carrier },
    }
}

export function addBooking(itemId, bookingTypeId, price, amount, amountUnit, description) {
    return {
        type: ADD_BOOKING_REQUEST,
        payload: { itemId, bookingTypeId, price, amount, amountUnit, description },
    }
}

export function addQuestion(fulfilmentOrderId, questionTitle) {
    return {
        type: ADD_QUESTION_REQUEST,
        payload: { fulfilmentOrderId, questionTitle },
    }
}

export function addAnswer(questionId, content , qrcode) {
    return {
        type: ADD_ANSWER_REQUEST,
        payload: { questionId, content, qrcode },
    }
}

export function markReadOrder(fulfilmentOrderId) {
    return {
        type: MARK_AS_READ_ORDER_REQUEST,
        payload: { fulfilmentOrderId },
    }
}

export function addTrackingNumber(fulfilmentOrderId, trackingNumber, routeTag, carrier) {
    return {
        type: ADD_TRACKING_NUMBER_REQUEST,
        payload: { fulfilmentOrderId, trackingNumber, routeTag, carrier },
    }
}

export function deleteItem(fulfilmentOrder, itemId) {
    return {
        type: DELETE_ITEM_REQUEST,
        payload: { fulfilmentOrder, itemId },
    }
}

export function deleteBookItem(fulfilmentOrder, bookingId) {
    return {
        type: DELETE_BOOKING_ITEM_REQUEST,
        payload: { fulfilmentOrder, bookingId },
    }
}

export function addTag(fulfilmentOrderId, name) {
    return {
        type: ADD_TAG_REQUEST,
        payload: { fulfilmentOrderId, name },
    }
}

export function getTags() {
    return {
        type: GET_TAGS_REQUEST,
        payload: {},
    }
}

export function deleteTag(fulfilmentOrder, tagId, mergeTagId) {
    return {
        type: DELETE_TAG_REQUEST,
        payload: { fulfilmentOrder, tagId, mergeTagId },
    }
}

export function updateDeliveryAddress(fulfilmentOrder, shippingInfo) {
    return {
        type: UPDATE_DELIVERY_ADDRESS_REQUEST,
        payload: { fulfilmentOrder, shippingInfo },
    }
}

export function setSearchType(type) {
    return {
        type: SET_SEARCH_TYPE,
        payload: { type },
    }
}

export function setSortType(sort) {
    return {
        type: SET_SORT_TYPE,
        payload: { sort },
    }
}

export function setCurrentlyEdit(edit) {
    return {
        type: SET_CURRENTLY_EDIT,
        payload: { edit },
    }
}
