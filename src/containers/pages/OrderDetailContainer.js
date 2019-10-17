import {connect} from 'react-redux'
import OrderDetailPage from 'components/pages/OrderDetailPage'
import {
    orderDetail,
    uploadPicture,
    addEvent,
    addItem,
    deleteTag,
    addQuestion,
    markReadOrder,
} from 'actions/orderAction'

const mapStateToProps = (state) => {
    return {
        fulfilmentOrder: state.order.fulfilmentOrder,
        fulfilmentOrders: state.order.fulfilmentOrders,
        userRole: state.user.userRole,
        user: state.user,
        loading: state.order.loading,
        searchType: state.order.searchType,
        sort: state.order.sort,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderDetail: (qrcode) => {
            dispatch(orderDetail(qrcode))
        },
        uploadPicture: (id, photo, type) => {
            dispatch(uploadPicture(id, photo, type))
        },
        addEvent: (fulfilmentOrderId, eventName) => {
            dispatch(addEvent(fulfilmentOrderId, eventName))
        },
        addQuestion: (fulfilmentOrderId, questionTitle) => {
            dispatch(addQuestion(fulfilmentOrderId, questionTitle))
        },
        markReadOrder: (fulfilmentOrderId) => {
            dispatch(markReadOrder(fulfilmentOrderId))
        },
        addItem: (fulfilmentOrderId, itemType, itemName, itemDescription) => {
            dispatch(addItem(fulfilmentOrderId, itemType, itemName, itemDescription))
        },
        deleteTag: (fulfilmentOrderId, tagId) => {
            dispatch(deleteTag(fulfilmentOrderId, tagId))
        },
    }
}

const CreateOrderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetailPage)

export default CreateOrderContainer
