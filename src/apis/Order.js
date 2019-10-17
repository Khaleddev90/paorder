import axios from 'axios'
import { store } from '../store'
const address = process.env.REACT_APP_API_ENDPOINT
const addressSupplier = process.env.REACT_APP_API_ENDPOINT_SUPPLIER

export const doPartnerLoad = () => {
    return new Promise(function (resolve, reject) {

        axios.get(address + '/load', {})
            .then((response) => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })

}

export const doSupplierLoad = (type) => {
    return new Promise(function (resolve, reject) {

        const query = type === undefined ? '' : '?filterFulfilmentOrdersByQuestions=' + type
        axios.get(addressSupplier + '/load' + query, {})
            .then((response) => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })

}

export const doPartnerOrderEvent = (orderId, event) => {
    return new Promise(function (resolve, reject) {

        axios.post(address + '/repairOrder/event', {
            orderId: orderId,
            event  : event,
        }).then((response) => {
            resolve(response.data.repairOrder)
        })
            .catch(error => {
                reject(error)
            })
    })

}

export const doOrder = (model) => {
    return new Promise(function (resolve, reject) {

        axios.post(addressSupplier + '/fulfilmentOrder/create', model).then((response) => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            })
    })

}

export const doLoadOrderByQrcode = (qrcode) => {
    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address

        axios.get(url + '/fulfilmentOrder/' + qrcode + '/load').then((response) => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            })
    })

}

export const doUploadPicture = (id, photo, type) => {

    return new Promise(function (resolve, reject) {

        const formPayload = new FormData()

        formPayload.append('file', photo)
        formPayload.append('fulfilmentOrderId', id)
        formPayload.append('pictureType', type)

        const url = address + '/fulfilmentOrder/uploadPicture'

        axios.put(url, formPayload).then((response) => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            })
    })
}

export const doAddEvent = (fulfilmentOrderId, eventName) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.post(url + '/fulfilmentOrder/event', {
            fulfilmentOrderId: fulfilmentOrderId,
            event               : eventName,
        }).then((response) => {
            resolve(response.data.repairOrder)
        })
            .catch(error => {
                reject(error)
            })
    })
}

export const doAddItem = (fulfilmentOrderId, itemType, itemName, itemReference, itemDescription) => {

    return new Promise(function (resolve, reject) {

        axios.post(address + '/fulfilmentOrder/item', {
            fulfilmentOrderId: fulfilmentOrderId,
            itemType            : itemType,
            name                : itemName,
            reference           : itemReference,
            description         : itemDescription,
        }).then((response) => {
            resolve(response.data.itemId)
        }).catch(error => {
            reject(error)
        })
    })
}

export const doAddBooking = (itemId, bookingTypeId, price, amount, amountUnit, description) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.post(url + '/fulfilmentOrder/item/booking', {
            itemId          : itemId,
            bookingTypeId: bookingTypeId,
            price           : Number(price),
            quantity        : Number(amount),
            unit            : amountUnit,
            description     : description,
        }).then((response) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export const doAddQuestion = (fulfilmentOrderId, questionTitle) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.post(url + '/fulfilmentOrder/addDialogQuestion', {
            fulfilmentOrderId: fulfilmentOrderId,
            question            : questionTitle,
        }).then((response) => {
            resolve(response.data.itemId)
        }).catch(error => {
            reject(error)
        })
    })
}

export const doAddTag = (fulfilmentOrderId, name) => {

    return new Promise(function (resolve, reject) {

        axios.post(address + '/fulfilmentOrders/' + fulfilmentOrderId + '/tags', {
            name,
        }).then((response) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export const doGetTags = () => {

    return new Promise(function (resolve, reject) {

        const fulfilmentPartnerId = store.getState().user.userRole.fulfilmentPartnerId
        axios.get(address + '/fulfilmentPartners/' + fulfilmentPartnerId + '/tags', {})
            .then((response) => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export const doDeleteTag = (fulfilmentOrderId, tagId) => {

    return new Promise(function (resolve, reject) {

        axios.delete(address + '/fulfilmentOrders/' + fulfilmentOrderId + '/tags/' + tagId, {
        }).then((response) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export const doUpdateTagById = (tagId, tagName) => {
    return new Promise(function (resolve, reject) {

        axios.patch(address + '/tags/' + tagId, {
            name: tagName,
        }).then((response) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export const doDeleteTagById = (currentTagId, mergeTagId) => {
    return new Promise(function (resolve, reject) {

        axios.delete(address + '/tags/' + currentTagId, {
            mergeIntoTagId: mergeTagId,
        }).then((response) => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export const doAddAnswer = (questionId, content) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.post(url + '/fulfilmentOrder/addDialogAnswer', {
            questionId: questionId,
            answer      : content,
        }).then((response) => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            })
    })
}

export const doMarkReadOrder = (fulfilmentOrderId) => {

    return new Promise(function (resolve, reject) {

        axios.post(address + '/fulfilmentOrder/' + fulfilmentOrderId + '/flag/read', {

        }).then((response) => {
            resolve(response.data)
        })
            .catch(error => {
                reject(error)
            })
    })
}

export const doAddTrackingNumber = (fulfilmentOrderId, trackingNumber, routeTag, carrier) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.post(url + '/fulfilmentOrder/trackingNumber', {
            fulfilmentOrderId: fulfilmentOrderId,
            trackingNumber      : trackingNumber,
            routeTag            : routeTag,
            carrier             : carrier,
        }).then((response) => {
            resolve(response.data.itemId)
        })
            .catch(error => {
                reject(error)
            })
    })
}

export const doDeleteBookingItem = (fulfilmentOrderId, bookingId) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.delete(url + '/fulfilmentOrders/' + fulfilmentOrderId + '/bookings/' + bookingId, {}).then((response) => {
            resolve(response.data.itemId)
        })
            .catch(error => {
                reject(error)
            })
    })
}

export const doUpdateDeliveryAddress = (fulfilmentOrderId, shippingInfo) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.patch(url + '/fulfilmentOrders/' + fulfilmentOrderId + '/deliveryAddress/', shippingInfo).then((response) => {
            resolve(response.data.itemId)
        })
            .catch(error => {
                reject(error)
            })
    })
}

export const doDeleteItem = (fulfilmentOrderId, itemId) => {

    return new Promise(function (resolve, reject) {

        const userRole = store.getState().user.userRole
        const url = userRole.supplierId !== null ? addressSupplier : address
        axios.delete(url + '/fulfilmentOrders/' + fulfilmentOrderId + '/items/' + itemId, {}).then((response) => {
            resolve(response.data.itemId)
        })
            .catch(error => {
                reject(error)
            })
    })
}
